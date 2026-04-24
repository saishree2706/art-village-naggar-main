import { useQuery } from "@tanstack/react-query";

export interface ContentBlock {
  type: string;
  content: string;
  items?: string[];
  url?: string;
  caption?: string;
  language?: string;
}

export interface ArticleContent {
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

async function fetchArticle(slug: string): Promise<ArticleContent> {
  const apiUrl = `/api/article/${slug}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Article not found");
    }
    throw new Error("Failed to fetch article");
  }

  return response.json();
}

export function useNotionArticle(slug: string | undefined) {
  return useQuery({
    queryKey: ["notion-article", slug],
    queryFn: () => fetchArticle(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Format date for display
export function formatArticleDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
