import { Client } from "@notionhq/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID as string;

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://artvillagenaggar.com",
  "https://www.artvillagenaggar.com",
  "https://art-village-naggar.vercel.app",
];

// Rate limiting configuration
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

interface ArticleContent {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string | null;
  video: string | null;
  content: ContentBlock[];
}

interface ContentBlock {
  type: string;
  content: string;
  items?: string[];
  url?: string;
  caption?: string;
  language?: string;
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

function getRichText(richText: any[]): string {
  if (!richText) return "";
  return richText.map((t: any) => t.plain_text).join("");
}

function parseBlock(block: any): ContentBlock | null {
  const blockType = block.type;

  switch (blockType) {
    case "paragraph":
      const paragraphText = getRichText((block as any).paragraph?.rich_text);
      if (!paragraphText) return null;
      return { type: "paragraph", content: paragraphText };

    case "heading_1":
      return { type: "heading_1", content: getRichText((block as any).heading_1?.rich_text) };

    case "heading_2":
      return { type: "heading_2", content: getRichText((block as any).heading_2?.rich_text) };

    case "heading_3":
      return { type: "heading_3", content: getRichText((block as any).heading_3?.rich_text) };

    case "bulleted_list_item":
      return { type: "bulleted_list_item", content: getRichText((block as any).bulleted_list_item?.rich_text) };

    case "numbered_list_item":
      return { type: "numbered_list_item", content: getRichText((block as any).numbered_list_item?.rich_text) };

    case "quote":
      return { type: "quote", content: getRichText((block as any).quote?.rich_text) };

    case "callout":
      return { type: "callout", content: getRichText((block as any).callout?.rich_text) };

    case "divider":
      return { type: "divider", content: "" };

    case "image":
      const imageBlock = (block as any).image;
      const imageUrl = imageBlock?.type === "external"
        ? imageBlock.external?.url
        : imageBlock?.file?.url;
      const caption = getRichText(imageBlock?.caption);
      return { type: "image", content: "", url: imageUrl, caption };

    case "code":
      const codeBlock = (block as any).code;
      return {
        type: "code",
        content: getRichText(codeBlock?.rich_text),
        language: codeBlock?.language || "plaintext"
      };

    default:
      return null;
  }
}

async function getArticleBySlug(slug: string): Promise<ArticleContent | null> {
  // Query database for article with matching slug
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (response.results.length === 0) {
    return null;
  }

  const page = response.results[0] as any;
  const properties = page.properties;

  // Fetch page blocks (content)
  const blocksResponse = await notion.blocks.children.list({
    block_id: page.id,
    page_size: 100,
  });

  const content: ContentBlock[] = [];

  for (const block of blocksResponse.results) {
    const parsed = parseBlock(block);
    if (parsed) {
      content.push(parsed);
    }
  }

  return {
    id: page.id,
    slug: getPropertyValue(properties.Slug) || page.id,
    title: getPropertyValue(properties.Title),
    excerpt: getPropertyValue(properties.Excerpt),
    date: getPropertyValue(properties.Date),
    readTime: getPropertyValue(properties.ReadTime) || "5 min read",
    category: getPropertyValue(properties.Category) || "General",
    coverImage: getPropertyValue(properties.CoverImage) || page.cover?.external?.url || page.cover?.file?.url || null,
    video: getPropertyValue(properties.Video) || null,
    content,
  };
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

  // Enable CORS - restricted to allowed origins
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
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

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Slug is required" });
  }

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const cacheHeader = process.env.VERCEL_ENV === "production"
      ? "s-maxage=300, stale-while-revalidate"
      : "no-store";
    res.setHeader("Cache-Control", cacheHeader);

    return res.status(200).json(article);
  } catch (error) {
    // Only log errors in non-production environments
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching article from Notion:", error);
    }
    return res.status(500).json({ error: "Failed to fetch article" });
  }
}
