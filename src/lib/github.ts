import { projects } from '@/data/projects';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
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
  const response = await fetch(`${api}${path}`, { headers, cache: 'force-cache' });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  return response.json() as Promise<T>;
}

function fallbackData(): GitHubData {
  const languageCounts = new Map<string, number>();
  projects.filter((project) => !project.fork).forEach((project) => {
    const language = project.technologies.find((technology) => ['TypeScript', 'Python', 'JavaScript', 'Swift', 'Java', 'C#'].includes(technology));
    if (language) languageCounts.set(language, (languageCounts.get(language) ?? 0) + 1);
  });
  return {
    source: 'fallback',
    publicRepos: 28,
    memberSince: '2022-03-05T03:53:30Z',
    lastProfileUpdate: '2026-09-05T01:15:35Z',
    languages: [...languageCounts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
    recentRepos: projects.filter((project) => !project.fork).slice(0, 6).map((project, index) => ({
      id: index,
      name: project.repoName,
      full_name: `5Gswatergod/${project.repoName}`,
      description: project.description,
      html_url: project.github,
      language: project.technologies[0] ?? null,
      updated_at: `${project.year}-01-01T00:00:00Z`,
      pushed_at: `${project.year}-01-01T00:00:00Z`,
      fork: false,
    })),
    eventDays: {},
  };
}

export async function getGitHubData(): Promise<GitHubData> {
  try {
    const [user, allRepos, events] = await Promise.all([
      githubFetch<GitHubUser>('/users/5Gswatergod'),
      githubFetch<GitHubRepo[]>('/users/5Gswatergod/repos?per_page=100&sort=pushed'),
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
    return fallbackData();
  }
}
