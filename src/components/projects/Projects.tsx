'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Cpu, Database, Gauge, Layers3, ShieldCheck, Smartphone } from 'lucide-react';
import { featuredProjects, type Project } from '@/data/projects';
import { gsap } from '@/lib/motion';

const projectKinds: Record<string, string> = {
  mahjong: 'REAL-TIME SYSTEM',
  'ollama-models-manager': 'LOCAL AI UTILITY',
  'discord-bot-2026': 'COMMUNITY INFRASTRUCTURE',
  'ai-budget-tracker': 'MOBILE APPLICATION',
  'motorcycle-test': 'LEARNING SYSTEM',
  'project-skull': 'MODEL TRAINING LAB',
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
      <div className="visual-caption">REPOSITORY ASSET / LIVE GAME SYSTEM</div>
    </div>
  );
}

function HydravaVisual() {
  return (
    <div className="project-visual hydrava-visual">
      <div className="hydrava-mark"><Image src="/projects/hydrava-avatar.png" alt="Hydrava avatar from the repository" fill sizes="220px" /></div>
      <div className="topology-labels" aria-hidden="true">
        {['BOT', 'DASHBOARD', 'POSTGRESQL', 'REDIS', 'LAVALINK', 'AUTOMATION'].map((label) => <span key={label}>{label}</span>)}
      </div>
      <div className="visual-caption">REPOSITORY BRAND ASSET / SERVICE MAP</div>
    </div>
  );
}

function BudgetVisual() {
  const [screen, setScreen] = useState<'ledger' | 'analytics' | 'assistant' | 'challenges'>('ledger');
  return (
    <div className="project-visual budget-visual" onClick={(event) => event.preventDefault()}>
      <div className="phone-shell">
        <div className="phone-status"><span>LOCAL</span><span>SYNC OFF</span></div>
        {screen === 'ledger' && <div className="phone-screen"><strong>Ledger</strong><b>NT$ 12,480</b><span>Food · NT$ 320</span><span>Transit · NT$ 85</span><span>Study · NT$ 640</span></div>}
        {screen === 'analytics' && <div className="phone-screen"><strong>Analytics</strong><div className="mini-bars"><i /><i /><i /><i /><i /></div><span>Monthly category view</span></div>}
        {screen === 'assistant' && <div className="phone-screen"><strong>Assistant</strong><span className="chat-bubble">Rule fallback ready.</span><span className="chat-bubble user">Where did I spend most?</span></div>}
        {screen === 'challenges' && <div className="phone-screen"><strong>Challenges</strong><span>Dining limit</span><div className="challenge-track"><i /></div><span>Local progress · 64%</span></div>}
        <div className="phone-tabs">
          {(['ledger', 'analytics', 'assistant', 'challenges'] as const).map((item) => <button key={item} aria-label={`Show ${item} screen`} aria-pressed={screen === item} onClick={() => setScreen(item)} />)}
        </div>
      </div>
      <div className="visual-caption">INTERFACE MAP / REPOSITORY-BACKED STATES</div>
    </div>
  );
}

function SkullVisual() {
  return (
    <div className="project-visual skull-visual">
      <div className="pipeline-readout">
        {[
          ['01', 'CORPUS', 'CLEAN'], ['02', 'TOKENIZER', 'READY'], ['03', 'SHARDS', 'MAPPED'],
          ['04', 'PRETRAIN', 'CONFIG'], ['05', 'SFT', 'QUEUED'], ['06', 'EVAL', 'VISIBLE'],
        ].map(([index, label, state]) => <div key={index}><small>{index}</small><strong>{label}</strong><span>{state}</span></div>)}
      </div>
      <div className="visual-caption">PIPELINE MAP / DOCUMENTED LOCAL FLOW</div>
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
      <div className="visual-caption">{project.media.kind === 'concept' ? 'CONCEPT VISUAL / NOT AN APP SCREENSHOT' : 'REPOSITORY ASSET'}</div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(card.current, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: card.current, start: 'top 84%', once: true } });
    });
    return () => media.revert();
  }, []);

  return (
    <article ref={card} className={`feature-card feature-card-${index + 1}`} style={{ '--project-accent': project.accent } as React.CSSProperties}>
      <Link href={`/projects/${project.id}`} className="feature-link" data-cursor="view" aria-label={`Explore ${project.name} case study`}>
        <div className="feature-visual-wrap">
          {project.id === 'mahjong' ? <MahjongVisual /> : <DefaultVisual project={project} />}
        </div>
        <div className="feature-body">
          <div className="feature-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{projectKinds[project.id]}</span><span>{project.year}</span></div>
          <h3 style={{ viewTransitionName: `project-${project.id}` }}>{project.name}</h3>
          <p className="feature-tagline">{project.tagline}</p>
          <p className="feature-description">{project.description}</p>
          <div className="feature-signals">
            {project.highlights?.slice(0, 3).map((highlight) => <span key={highlight}><Check size={13} />{highlight}</span>)}
          </div>
          <div className="feature-foot">
            <span>{project.technologies.slice(0, 4).join(' · ')}</span>
            <span className="feature-explore">EXPLORE <ArrowUpRight size={15} /></span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function Projects() {
  const heading = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(heading.current, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: heading.current, start: 'top 82%', once: true } });
    });
    return () => media.revert();
  }, []);

  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="section-inner">
        <div ref={heading} className="editorial-heading">
          <div className="section-index"><span>03</span><i /><span>SELECTED WORK</span></div>
          <h2 id="work-title">Systems with<br /><em>something at stake.</em></h2>
          <p>Six recent builds, selected for depth and verified directly from their repositories.</p>
        </div>
        <div className="work-legend" aria-label="Selected work themes">
          <span><Layers3 size={15} /> SYSTEMS</span><span><Cpu size={15} /> LOCAL AI</span><span><Database size={15} /> DATA</span><span><Smartphone size={15} /> APPLICATIONS</span><span><ShieldCheck size={15} /> VERIFICATION</span><span><Gauge size={15} /> INTERACTION</span>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
