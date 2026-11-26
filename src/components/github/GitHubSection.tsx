import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import type { GitHubData, GitHubRepo } from '@/lib/github';

export function GitHubSection({ data }: { data: GitHubData }) {
  const days = (() => {
    const result: Array<{ date: string; count: number }> = [];
    const today = new Date();
    for (let index = 55; index >= 0; index -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      const key = date.toISOString().slice(0, 10);
      result.push({ date: key, count: data.eventDays[key] ?? 0 });
    }
    return result;
  })();

  return (
    <section id="github" className="section github-section" aria-labelledby="github-title">
      <div className="section-inner">
        <header className="section-heading">
          <p className="eyebrow">06 / Public activity</p>
          <h2 id="github-title">Public GitHub activity</h2>
          <p>Repository counts and recent pushes are captured when the site is built.</p>
        </header>

        <div className="github-dashboard">
          <div className="github-stat"><span>{data.publicRepos.toLocaleString('en-US')}</span><small>Public repositories</small></div>
          <div className="github-stat"><span>{data.languages.length}</span><small>Primary languages</small></div>
          <div className="github-stat"><span>{new Date(data.memberSince).getFullYear()}</span><small>GitHub member since</small></div>
          <div className="github-source"><i className={data.source === 'live' ? 'live' : ''} />{data.source === 'live' ? 'GitHub API at build time' : 'Saved snapshot'}</div>
        </div>

        {data.source === 'live' && <div className="activity-panel">
          <div className="activity-copy"><p className="eyebrow">Public events · 56 days</p><p>Public events from the GitHub API, not the contributions calendar.</p></div>
          <div className="activity-grid" aria-label="Public GitHub event activity over the last 56 days">
            {days.map((day) => <span key={day.date} title={`${day.date}: ${day.count} public event${day.count === 1 ? '' : 's'}`} data-level={Math.min(day.count, 4)} />)}
          </div>
        </div>}

        <div className="github-columns">
          <div className="language-panel">
            <p className="eyebrow">Repository languages</p>
            {data.languages.slice(0, 8).map((language) => (
              <div className="language-row" key={language.name}><span>{language.name}</span></div>
            ))}
          </div>
          <div className="repo-list">
            <div className="repo-list-head"><p className="eyebrow">Recently pushed</p><a href="https://github.com/5Gswatergod?tab=repositories" target="_blank" rel="noreferrer">All repositories <ExternalLink size={13} /></a></div>
            {data.recentRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />)}
          </div>
        </div>

        <a className="github-profile-link" href="https://github.com/5Gswatergod" target="_blank" rel="noreferrer" data-cursor="code">
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
