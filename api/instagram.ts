import type { VercelRequest, VercelResponse } from "@vercel/node";

const USER_ID = process.env.INSTAGRAM_USER_ID as string;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN as string;

// Rate limiting — same pattern as api/articles.ts
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetIn: RATE_LIMIT_WINDOW };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - record.count,
    resetIn: record.resetTime - now,
  };
}

export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

interface IgRawPost {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink: string;
  timestamp: string;
}

async function fetchInstagramPosts(limit: number): Promise<InstagramPost[]> {
  const fields =
    "id,caption,media_url,thumbnail_url,media_type,permalink,timestamp";
  const url = `https://graph.instagram.com/v22.0/${encodeURIComponent(USER_ID)}/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Instagram API returned ${response.status}`);
  }

  const data = (await response.json()) as { data?: IgRawPost[] };
  const raw = data.data ?? [];

  return raw
    .map<InstagramPost>((p) => ({
      id: p.id,
      caption: p.caption ?? "",
      // VIDEO posts: prefer thumbnail_url so a poster image renders in the grid
      // IMAGE / CAROUSEL_ALBUM: use media_url (carousel returns the first frame)
      mediaUrl:
        p.media_type === "VIDEO"
          ? p.thumbnail_url ?? p.media_url ?? ""
          : p.media_url ?? "",
      permalink: p.permalink,
      mediaType: p.media_type,
      timestamp: p.timestamp,
    }))
    .filter((p) => p.mediaUrl);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const clientIp =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    (req.headers["x-real-ip"] as string) ||
    "unknown";

  const rateLimit = checkRateLimit(clientIp);
  res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX.toString());
  res.setHeader("X-RateLimit-Remaining", rateLimit.remaining.toString());
  res.setHeader("X-RateLimit-Reset", Math.ceil(rateLimit.resetIn / 1000).toString());

  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: "Too many requests",
      retryAfter: Math.ceil(rateLimit.resetIn / 1000),
    });
  }

  const allowedOrigins = [
    "https://artvillagenaggar.com",
    "https://www.artvillagenaggar.com",
    "https://art-village-naggar.vercel.app",
  ];
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!USER_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: "Instagram credentials not configured" });
  }

  try {
    const posts = await fetchInstagramPosts(9);

    const cacheHeader =
      process.env.VERCEL_ENV === "production"
        ? "s-maxage=3600, stale-while-revalidate=86400"
        : "no-store";
    res.setHeader("Cache-Control", cacheHeader);

    return res.status(200).json(posts);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching Instagram posts:", error);
    }
    return res.status(500).json({ error: "Failed to fetch Instagram posts" });
  }
}

// TODO (v2): Token refresh — IG long-lived tokens expire after 60 days unless refreshed.
// Add a /api/refresh-instagram-token route + Vercel cron (every 50 days) that calls:
//   GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=<current>
// then writes the new token back to the Vercel env via the Vercel REST API.
