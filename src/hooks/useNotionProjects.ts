import { useQuery } from "@tanstack/react-query";

export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  photo: string | null;
  video: string | null;
}

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects");
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
}

export function useNotionProjects() {
  return useQuery({
    queryKey: ["notion-projects"],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: [],
  });
}
