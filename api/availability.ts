import type { VercelRequest, VercelResponse } from "@vercel/node";

// Rate limiting — same pattern as api/instagram.ts
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT_MAX) return { allowed: false };
  record.count++;
  return { allowed: true };
}

interface AvailabilityResponse {
  commonRooms: string[];
  villa: string[];
  lastSynced: string;
}

// Format YYYY-MM-DD without timezone shifts (UTC components)
function toIsoDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Parses an iCal DATE / DATE-TIME value like "20260312" or "20260312T000000Z"
function parseIcalDate(raw: string): Date | null {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
}

// Extracts booked date strings from Airbnb iCal feed.
// Airbnb's DTEND is the day AFTER the last booked night (exclusive checkout day),
// so we iterate [DTSTART, DTEND) and return every date in between.
function parseBookedDates(ical: string): string[] {
  const booked = new Set<string>();
  const eventBlocks = ical.split(/BEGIN:VEVENT/i).slice(1);

  for (const block of eventBlocks) {
    const startMatch = block.match(/DTSTART[^:]*:([^\r\n]+)/i);
    const endMatch = block.match(/DTEND[^:]*:([^\r\n]+)/i);
    if (!startMatch || !endMatch) continue;

    const start = parseIcalDate(startMatch[1]);
    const end = parseIcalDate(endMatch[1]);
    if (!start || !end) continue;

    for (
      let cursor = new Date(start);
      cursor < end;
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    ) {
      booked.add(toIsoDate(cursor));
    }
  }

  return Array.from(booked).sort();
}

async function fetchIcal(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "ArtVillageNaggar/1.0 (+availability-sync)" },
  });
  if (!res.ok) {
    throw new Error(`iCal fetch failed with status ${res.status}`);
  }
  return res.text();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (!checkRateLimit(ip).allowed) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  const commonRoomsUrl = process.env.AIRBNB_ICAL_COMMON_ROOMS;
  const villaUrl = process.env.AIRBNB_ICAL_VILLA;

  if (!commonRoomsUrl || !villaUrl) {
    res.status(500).json({
      error:
        "Availability service not configured. Missing AIRBNB_ICAL_COMMON_ROOMS or AIRBNB_ICAL_VILLA.",
    });
    return;
  }

  try {
    const [commonRoomsIcal, villaIcal] = await Promise.all([
      fetchIcal(commonRoomsUrl),
      fetchIcal(villaUrl),
    ]);

    const payload: AvailabilityResponse = {
      commonRooms: parseBookedDates(commonRoomsIcal),
      villa: parseBookedDates(villaIcal),
      lastSynced: new Date().toISOString(),
    };

    // Cache at the edge for 15 min, allow stale for 1 hour while revalidating.
    // Airbnb iCal lag is up to a few hours anyway — heavy caching is safe.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=900, stale-while-revalidate=3600"
    );
    res.status(200).json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(502).json({ error: `Failed to fetch availability: ${message}` });
  }
}
