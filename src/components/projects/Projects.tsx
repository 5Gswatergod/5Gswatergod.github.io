'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { featuredProjects, type Project } from '@/data/projects';

const projectKinds: Record<string, string> = {
  mahjong: 'Real-time system',
  'ollama-models-manager': 'Local AI utility',
  'discord-bot-2026': 'Community infrastructure',
  'ai-budget-tracker': 'Mobile application',
  'motorcycle-test': 'Learning system',
  'project-skull': 'Model training lab',
};

function MahjongVisual() {
  const tiles = [
    ['/projects/mahjong-bamboo-1.svg', 'Bamboo one Mahjong tile'],
    ['/projects/mahjong-character-5.svg', 'Character five Mahjong tile'],
    ['/projects/mahjong-dot-8.svg', 'Dot eight Mahjong tile'],
    ['/projects/mahjong-red-dragon.svg', 'Red dragon Mahjong tile'],
  ];
  return (
    <div className="project-visual mahjong-visual">
      <Image src="/projects/mahjong-table.png" alt="Game table background from the Mahjong repository" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority />
      <div className="mahjong-tiles" aria-label="Tile artwork from the Mahjong repository">
        {tiles.map(([src, alt], index) => <Image key={src} src={src} alt={alt} width={84} height={112} style={{ '--tile-index': index } as React.CSSProperties} />)}
      </div>
      <div className="visual-caption">From the repository · Mahjong tile artwork</div>
    </div>
  );
}

function HydravaVisual() {
  return (
    <div className="project-visual hydrava-visual">
      <div className="hydrava-mark"><Image src="/projects/hydrava-avatar.png" alt="Hydrava avatar from the repository" fill sizes="220px" /></div>
      <div className="topology-labels" aria-hidden="true">
        {['Bot', 'Dashboard', 'PostgreSQL', 'Redis', 'Lavalink', 'Automation'].map((label) => <span key={label}>{label}</span>)}
      </div>
      <div className="visual-caption">From the repository · Hydrava avatar</div>
    </div>
  );
}

function BudgetVisual() {
  const [screen, setScreen] = useState<'ledger' | 'analytics' | 'assistant' | 'challenges'>('ledger');
  return (
    <div className="project-visual budget-visual">
      <div className="phone-shell">
        <div className="phone-status"><span>Sample data</span><span>Sync off</span></div>
        {screen === 'ledger' && <div className="phone-screen"><strong>Ledger</strong><b>NT$ 12,480</b><span>Food · NT$ 320</span><span>Transit · NT$ 85</span><span>Study · NT$ 640</span></div>}
        {screen === 'analytics' && <div className="phone-screen"><strong>Analytics</strong><span>Study · NT$ 640</span><span>Food · NT$ 320</span><span>Transit · NT$ 85</span></div>}
        {screen === 'assistant' && <div className="phone-screen"><strong>Assistant</strong><span className="chat-bubble">Rule fallback ready.</span><span className="chat-bubble user">Where did I spend most?</span></div>}
        {screen === 'challenges' && <div className="phone-screen"><strong>Challenges</strong><span>Dining limit</span><div className="challenge-track"><i /></div><span>Sample progress · 64%</span></div>}
        <div className="phone-tabs">
          {(['ledger', 'analytics', 'assistant', 'challenges'] as const).map((item) => <button key={item} aria-label={`Show ${item} screen`} aria-pressed={screen === item} onClick={() => setScreen(item)}>{item}</button>)}
        </div>
      </div>
      <div className="visual-caption">Interactive demo · Sample ledger</div>
    </div>
  );
}

function SkullVisual() {
  return (
    <div className="project-visual skull-visual">
      <div className="pipeline-readout">
        {[
          ['01', 'Corpus', 'Cleaning'], ['02', 'Tokenizer', 'Preparation'], ['03', 'Shards', 'Mapping'],
          ['04', 'Pretrain', 'Configuration'], ['05', 'SFT', 'Fine-tuning'], ['06', 'Eval', 'Evaluation'],
        ].map(([index, label, state]) => <div key={index}><small>{index}</small><strong>{label}</strong><span>{state}</span></div>)}
      </div>
      <div className="visual-caption">From the repository · Training stages</div>
    </div>
  );
}

function DefaultVisual({ project }: { project: Project }) {
  if (project.id === 'discord-bot-2026') return <HydravaVisual />;
  if (project.id === 'ai-budget-tracker') return <BudgetVisual />;
  if (project.id === 'project-skull') return <SkullVisual />;
  if (!project.media) return null;
  return (
    <div className="project-visual image-visual">
      <Image src={project.media.src} alt={project.media.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: project.media.objectPosition }} />
      <div className="visual-caption">{project.media.kind === 'concept' ? 'Concept illustration' : 'From the repository'}</div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`feature-card feature-card-${index + 1}`}>
      <div className="feature-visual-wrap">
        {project.id === 'mahjong' ? <MahjongVisual /> : <DefaultVisual project={project} />}
      </div>
      <div className="feature-body">
        <div className="feature-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{projectKinds[project.id]}</span><span>{project.year}</span></div>
        <h3><Link href={`/projects/${project.id}`} className="feature-link" style={{ viewTransitionName: `project-${project.id}` }}>{project.name}</Link></h3>
        <p className="feature-tagline">{project.tagline}</p>
        <p className="feature-description">{project.description}</p>
        <div className="feature-signals">
          {project.highlights?.slice(0, 3).map((highlight) => <span key={highlight}><Check size={13} />{highlight}</span>)}
        </div>
        <div className="feature-foot">
          <span>{project.technologies.slice(0, 4).join(' · ')}</span>
          <span className="feature-explore">Case study <ArrowUpRight size={15} /></span>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="section-inner">
        <div className="editorial-heading">
          <div className="section-index"><span>03</span><i /><span>Selected work</span></div>
          <h2 id="work-title">Six builds, from game servers to local AI</h2>
          <p>Explore the architecture, interfaces, and source behind each project.</p>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
