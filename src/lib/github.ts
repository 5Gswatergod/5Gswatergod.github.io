import snapshot from '@/data/github-snapshot.json';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  pushed_at: string;
}

interface GitHubUser {
  public_repos: number;
  created_at: string;
  updated_at: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
}

export interface GitHubData {
  source: 'live' | 'fallback';
  publicRepos: number;
  memberSince: string;
  lastProfileUpdate: string;
  languages: Array<{ name: string; count: number }>;
  recentRepos: GitHubRepo[];
  eventDays: Record<string, number>;
}

const api = 'https://api.github.com';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'HungYuan-Portfolio' };

async function githubFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${api}${path}`, { headers, cache: 'no-store' });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getGitHubData(): Promise<GitHubData> {
  try {
    const [user, allRepos, events] = await Promise.all([
      githubFetch<GitHubUser>('/users/5Gswatergod'),
      githubFetch<Array<GitHubRepo & { fork: boolean }>>('/users/5Gswatergod/repos?per_page=100&sort=pushed'),
      githubFetch<GitHubEvent[]>('/users/5Gswatergod/events/public?per_page=100'),
    ]);
    const repos = allRepos.filter((repo) => !repo.fork);
    const languageCounts = new Map<string, number>();
    repos.forEach((repo) => {
      if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    });
    const eventDays: Record<string, number> = {};
    events.forEach((event) => {
      const day = event.created_at.slice(0, 10);
      eventDays[day] = (eventDays[day] ?? 0) + 1;
    });
    return {
      source: 'live',
      publicRepos: user.public_repos,
      memberSince: user.created_at,
      lastProfileUpdate: user.updated_at,
      languages: [...languageCounts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      recentRepos: repos.slice(0, 6),
      eventDays,
    };
  } catch {
    return { ...snapshot, source: 'fallback', eventDays: {} };
  }
}
