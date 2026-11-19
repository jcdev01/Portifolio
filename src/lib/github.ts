export const GITHUB_USER = "jcdev01";

const API_URL = "https://api.github.com";
const MAX_PAGES = 10;

export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string;
  html_url: string;
  blog: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  fork: boolean;
  archived: boolean;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
};

export type LanguageStat = {
  name: string;
  repos: number;
  bytes: number;
  share: number;
};

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalBytes: number;
  languages: LanguageStat[];
  languageCount: number;
  topLanguage: string | null;
  joinedYear: number;
  yearsActive: number;
};

export type GitHubOverview = {
  user: GitHubUser;
  repos: GitHubRepo[];
  stats: GitHubStats;
  fetchedAt: number;
};

async function githubFetch<T>(path: string): Promise<T> {
  return githubFetchUrl<T>(`${API_URL}${path}`);
}

async function githubFetchUrl<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API respondeu ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        results[index] = await fn(items[index]!);
      }
    }),
  );

  return results;
}

async function fetchRepoLanguages(repo: GitHubRepo): Promise<Record<string, number> | null> {
  try {
    return await githubFetchUrl<Record<string, number>>(repo.languages_url);
  } catch {
    return null;
  }
}

async function fetchAllRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await githubFetch<GitHubRepo[]>(
      `/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
    );
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  return repos;
}

async function buildStats(user: GitHubUser, repos: GitHubRepo[]): Promise<GitHubStats> {
  const languageData = await mapWithConcurrency(repos, 4, fetchRepoLanguages);
  const languages = new Map<string, { repos: number; bytes: number }>();

  repos.forEach((repo, index) => {
    const data = languageData[index];

    if (data && Object.keys(data).length > 0) {
      for (const [name, bytes] of Object.entries(data)) {
        const current = languages.get(name) ?? { repos: 0, bytes: 0 };
        languages.set(name, { repos: current.repos + 1, bytes: current.bytes + bytes });
      }
      return;
    }

    if (repo.language) {
      const current = languages.get(repo.language) ?? { repos: 0, bytes: 0 };
      languages.set(repo.language, { repos: current.repos + 1, bytes: current.bytes });
    }
  });

  const totalBytes = Array.from(languages.values()).reduce((sum, l) => sum + l.bytes, 0);
  const ranked = Array.from(languages, ([name, value]) => ({
    name,
    repos: value.repos,
    bytes: value.bytes,
    share: totalBytes ? Math.round((value.bytes / totalBytes) * 100) : 0,
  })).sort((a, b) => b.bytes - a.bytes || a.name.localeCompare(b.name));

  const joinedYear = new Date(user.created_at).getUTCFullYear();
  const yearsActive = Math.max(1, new Date().getUTCFullYear() - joinedYear + 1);

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
    totalBytes,
    languages: ranked,
    languageCount: ranked.length,
    topLanguage: ranked[0]?.name ?? null,
    joinedYear,
    yearsActive,
  };
}

export function getDemoUrl(repo: GitHubRepo): string | null {
  if (!repo.homepage) return null;
  const value = repo.homepage.trim();
  if (!value) return null;
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

export function formatRepoDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(
    new Date(date),
  );
}

export async function fetchGitHubOverview(): Promise<GitHubOverview> {
  const [user, allRepos] = await Promise.all([
    githubFetch<GitHubUser>(`/users/${GITHUB_USER}`),
    fetchAllRepos(),
  ]);

  const repos = allRepos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));

  return {
    user,
    repos,
    stats: await buildStats(user, repos),
    fetchedAt: Date.now(),
  };
}
