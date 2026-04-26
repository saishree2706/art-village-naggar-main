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

interface ContentBlock {
  type: string;
  content: string;
  url?: string;
  caption?: string;
  language?: string;
}

interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  tag: string;
  photo: string | null;
  video: string | null;
  content: ContentBlock[];
}

function getPropertyValue(property: any): string {
  if (!property) return "";
  switch (property.type) {
    case "title":   return property.title?.[0]?.plain_text || "";
    case "rich_text": return property.rich_text?.map((t: any) => t.plain_text).join("") || "";
    case "select":  return property.select?.name || "";
    case "url":     return property.url || "";
    case "files":
      if (property.files?.[0]?.type === "external") return property.files[0].external.url;
      if (property.files?.[0]?.type === "file")     return property.files[0].file.url;
      return "";
    default: return "";
  }
}

function getRichText(richText: any[]): string {
  if (!richText) return "";
  return richText.map((t: any) => t.plain_text).join("");
}

function parseBlock(block: any): ContentBlock | null {
  switch (block.type) {
    case "paragraph": {
      const text = getRichText(block.paragraph?.rich_text);
      return text ? { type: "paragraph", content: text } : null;
    }
    case "heading_1":
      return { type: "heading_1", content: getRichText(block.heading_1?.rich_text) };
    case "heading_2":
      return { type: "heading_2", content: getRichText(block.heading_2?.rich_text) };
    case "heading_3":
      return { type: "heading_3", content: getRichText(block.heading_3?.rich_text) };
    case "bulleted_list_item":
      return { type: "bulleted_list_item", content: getRichText(block.bulleted_list_item?.rich_text) };
    case "numbered_list_item":
      return { type: "numbered_list_item", content: getRichText(block.numbered_list_item?.rich_text) };
    case "quote":
      return { type: "quote", content: getRichText(block.quote?.rich_text) };
    case "callout":
      return { type: "callout", content: getRichText(block.callout?.rich_text) };
    case "divider":
      return { type: "divider", content: "" };
    case "image": {
      const img = block.image;
      const url = img?.type === "external" ? img.external?.url : img?.file?.url;
      return { type: "image", content: "", url, caption: getRichText(img?.caption) };
    }
    case "code":
      return {
        type: "code",
        content: getRichText(block.code?.rich_text),
        language: block.code?.language || "plaintext",
      };
    default:
      return null;
  }
}

async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: { equals: slug },
    },
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as any;
  const props = page.properties;

  const blocksResponse = await notion.blocks.children.list({ block_id: page.id, page_size: 100 });
  const content = blocksResponse.results.map(parseBlock).filter(Boolean) as ContentBlock[];

  return {
    id: page.id,
    slug: getPropertyValue(props.Slug) || page.id,
    title: getPropertyValue(props.Title),
    description: getPropertyValue(props.description),
    tag: getPropertyValue(props.tag) || "",
    photo: getPropertyValue(props.photo) || page.cover?.external?.url || page.cover?.file?.url || null,
    video: getPropertyValue(props.video) || null,
    content,
  };
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
    return res.status(429).json({ error: "Too many requests", retryAfter: Math.ceil(rateLimit.resetIn / 1000) });
  }

  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { slug } = req.query;
  if (!slug || typeof slug !== "string") return res.status(400).json({ error: "Slug is required" });

  try {
    const project = await getProjectBySlug(slug);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const cacheHeader = process.env.VERCEL_ENV === "production"
      ? "s-maxage=300, stale-while-revalidate"
      : "no-store";
    res.setHeader("Cache-Control", cacheHeader);

    return res.status(200).json(project);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching project from Notion:", error);
    }
    return res.status(500).json({ error: "Failed to fetch project" });
  }
}
