import { Client } from "@notionhq/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID as string;

const ALLOWED_ORIGINS = [
  "https://artvillagenaggar.com",
  "https://www.artvillagenaggar.com",
  "https://art-village-naggar.vercel.app",
];

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
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
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count, resetIn: record.resetTime - now };
}

export interface NotionProject {
  id: string;
  title: string;
  description: string;
  tag: string;
  photo: string | null;
  video: string | null;
}

function getPropertyValue(property: any): string {
  if (!property) return "";

  switch (property.type) {
    case "title":
      return property.title?.[0]?.plain_text || "";
    case "rich_text":
      return property.rich_text?.map((t: any) => t.plain_text).join("") || "";
    case "select":
      return property.select?.name || "";
    case "url":
      return property.url || "";
    case "files":
      if (property.files?.[0]?.type === "external") return property.files[0].external.url;
      if (property.files?.[0]?.type === "file") return property.files[0].file.url;
      return "";
    default:
      return "";
  }
}

async function getProjects(): Promise<NotionProject[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: "Title", direction: "ascending" }],
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: getPropertyValue(props.Title),
      description: getPropertyValue(props.Description),
      tag: getPropertyValue(props.Tag) || "",
      photo:
        getPropertyValue(props.Photo) ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        null,
      video: getPropertyValue(props.Video) || null,
    };
  });
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

  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const projects = await getProjects();
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).json(projects);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching projects from Notion:", error);
    }
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
}
