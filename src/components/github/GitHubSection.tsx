'use client';

import { useEffect, useMemo, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import type { GitHubData, GitHubRepo } from '@/lib/github';

const languageColors: Record<string, string> = {
  TypeScript: '#7ce7d7', Python: '#67c7ff', JavaScript: '#ffd36a', Swift: '#ff806f',
  Java: '#e79cff', 'C#': '#aeb9ff', HTML: '#f08a68', CSS: '#9a78ff', Shell: '#9ce9a8',
};

export function GitHubSection({ data }: { data: GitHubData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const days = useMemo(() => {
    const result: Array<{ date: string; count: number }> = [];
    const today = new Date();
    for (let index = 55; index >= 0; index -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      const key = date.toISOString().slice(0, 10);
      result.push({ date: key, count: data.eventDays[key] ?? 0 });
    }
    return result;
  }, [data.eventDays]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    root.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="github" ref={sectionRef} className="section github-section" aria-labelledby="github-title">
      <div className="section-inner">
        <header className="section-heading reveal">
          <p className="eyebrow">06 / PUBLIC ACTIVITY</p>
          <h2 id="github-title">Code, in the open.</h2>
          <p>A repository-first view of current work. Counts and recent pushes are refreshed from GitHub when the API is available.</p>
        </header>

        <div className="github-dashboard reveal">
          <div className="github-stat"><span>{String(data.publicRepos).padStart(2, '0')}</span><small>PUBLIC REPOSITORIES</small></div>
          <div className="github-stat"><span>{data.languages.length}</span><small>PRIMARY LANGUAGES</small></div>
          <div className="github-stat"><span>{new Date(data.memberSince).getFullYear()}</span><small>GITHUB MEMBER SINCE</small></div>
          <div className="github-source"><i className={data.source === 'live' ? 'live' : ''} />{data.source === 'live' ? 'LIVE API SNAPSHOT' : 'VERIFIED STATIC FALLBACK'}</div>
        </div>

        <div className="activity-panel reveal">
          <div className="activity-copy"><p className="eyebrow">PUBLIC EVENT PULSE / 56 DAYS</p><p>This is a pulse of public GitHub events, not a fabricated contribution count.</p></div>
          <div className="activity-grid" aria-label="Public GitHub event activity over the last 56 days">
            {days.map((day) => <span key={day.date} title={`${day.date}: ${day.count} public event${day.count === 1 ? '' : 's'}`} data-level={Math.min(day.count, 4)} />)}
          </div>
        </div>

        <div className="github-columns">
          <div className="language-panel reveal">
            <p className="eyebrow">LANGUAGE INDEX</p>
            {data.languages.slice(0, 8).map((language, index) => (
              <div className="language-row" key={language.name}><span><i style={{ background: languageColors[language.name] ?? '#87909b' }} />{language.name}</span><b>{String(index + 1).padStart(2, '0')}</b></div>
            ))}
          </div>
          <div className="repo-list reveal">
            <div className="repo-list-head"><p className="eyebrow">RECENTLY PUSHED</p><a href="https://github.com/5Gswatergod?tab=repositories" target="_blank" rel="noreferrer">ALL REPOSITORIES <ExternalLink size={13} /></a></div>
            {data.recentRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />)}
          </div>
        </div>

        <a className="github-profile-link reveal" href="https://github.com/5Gswatergod" target="_blank" rel="noreferrer" data-cursor="code">
          <GithubIcon /> <span>github.com/5Gswatergod</span><ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}

function RepoRow({ repo }: { repo: GitHubRepo }) {
  return (
    <a className="repo-row" href={repo.html_url} target="_blank" rel="noreferrer" data-cursor="code">
      <span className="repo-name">{repo.name}</span>
      <span className="repo-description">{repo.description || 'Public source repository'}</span>
      <span className="repo-meta">{repo.language || '—'} · {new Date(repo.pushed_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      <ExternalLink size={14} />
    </a>
  );
}
