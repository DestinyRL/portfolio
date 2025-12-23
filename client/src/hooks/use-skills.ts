import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: [api.github.repos.path, username],
    queryFn: async () => {
      const res = await fetch(`/api/github/repos/${username}`);
      if (!res.ok) return [];
      return api.github.repos.responses[200].parse(await res.json());
    },
  });
}
