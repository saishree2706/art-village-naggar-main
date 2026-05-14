import { useQuery } from "@tanstack/react-query";

export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const response = await fetch("/api/instagram");
  if (!response.ok) {
    throw new Error("Failed to fetch Instagram posts");
  }
  return response.json();
}

export function useInstagramPosts() {
  return useQuery({
    queryKey: ["instagram-posts"],
    queryFn: fetchInstagramPosts,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}

export function formatInstagramDate(timestamp: string): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}
