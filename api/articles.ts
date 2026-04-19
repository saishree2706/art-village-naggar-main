import { Client } from "@notionhq/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID as string;

// Simple in-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 60; // requests per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

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

export interface NotionArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string | null;
  published: boolean;
}

function getPropertyValue(property: any): string {
  if (!property) return "";

  switch (property.type) {
    case "title":
      return property.title?.[0]?.plain_text || "";
    case "rich_text":
      return property.rich_text?.[0]?.plain_text || "";
    case "select":
      return property.select?.name || "";
    case "date":
      return property.date?.start || "";
    case "checkbox":
      return property.checkbox;
    case "url":
      return property.url || "";
    case "files":
      if (property.files?.[0]?.type === "external") {
        return property.files[0].external.url;
      }
      if (property.files?.[0]?.type === "file") {
        return property.files[0].file.url;
      }
      return "";
    default:
      return "";
  }
}

async function getArticles(): Promise<NotionArticle[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page: any) => {
    const properties = page.properties;

    return {
      id: page.id,
      slug: getPropertyValue(properties.Slug) || page.id,
      title: getPropertyValue(properties.Title),
      excerpt: getPropertyValue(properties.Excerpt),
      date: getPropertyValue(properties.Date),
      readTime: getPropertyValue(properties.ReadTime) || "5 min read",
      category: getPropertyValue(properties.Category) || "General",
      coverImage: getPropertyValue(properties.CoverImage) || page.cover?.external?.url || page.cover?.file?.url || null,
      published: getPropertyValue(properties.Published),
    };
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Get client IP for rate limiting
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] as string ||
    "unknown";

  // Check rate limit
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

  // Enable CORS - restricted to allowed origins only
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

  try {
    const articles = await getArticles();

    // Cache for 5 minutes
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

    return res.status(200).json(articles);
  } catch (error) {
    // Log error server-side only (not exposed to client)
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching articles from Notion:", error);
    }
    return res.status(500).json({ error: "Failed to fetch articles" });
  }
}
