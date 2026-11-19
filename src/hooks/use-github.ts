import { useQuery } from "@tanstack/react-query";
import { fetchGitHubOverview, type GitHubOverview } from "@/lib/github";

const CACHE_KEY = "github-overview";
const CACHE_TTL = 1000 * 60 * 30;

type CachedOverview = { data: GitHubOverview; at: number };

function readCache(): GitHubOverview | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedOverview;
    if (Date.now() - cached.at > CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writeCache(data: GitHubOverview): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, at: Date.now() }));
  } catch {
    return;
  }
}

async function queryFn(): Promise<GitHubOverview> {
  const cached = readCache();
  if (cached) return cached;

  const data = await fetchGitHubOverview();
  writeCache(data);
  return data;
}

export function useGitHubOverview() {
  return useQuery({
    queryKey: ["github", "overview"],
    queryFn,
    staleTime: CACHE_TTL,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
