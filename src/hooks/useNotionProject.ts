import { useQuery } from "@tanstack/react-query";

export interface ContentBlock {
  type: string;
  content: string;
  url?: string;
  caption?: string;
  language?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  tag: string;
  photo: string | null;
  video: string | null;
  content: ContentBlock[];
}

async function fetchProject(id: string): Promise<ProjectDetail> {
  const response = await fetch(`/api/project/${id}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("Project not found");
    throw new Error("Failed to fetch project");
  }
  return response.json();
}

export function useNotionProject(id: string | undefined) {
  return useQuery({
    queryKey: ["notion-project", id],
    queryFn: () => fetchProject(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
