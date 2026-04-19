import { useQuery } from "@tanstack/react-query";

export interface Article {
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

// Empty fallback for when Notion is unavailable
export const fallbackArticles: Article[] = [];

async function fetchArticles(): Promise<Article[]> {
  const apiUrl = "/api/articles";

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

export function useNotionArticles() {
  return useQuery({
    queryKey: ["notion-articles"],
    queryFn: fetchArticles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    // Use fallback data if fetch fails
    placeholderData: fallbackArticles,
  });
}

// Format date for display
export function formatArticleDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
