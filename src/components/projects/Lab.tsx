'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { archiveProjects, labProjects, type Project, type ProjectCategory } from '@/data/projects';
import { cn } from '@/lib/utils';
import { gsap } from '@/lib/motion';

function LabCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <button className="lab-card" data-project-id={project.id} onClick={() => onOpen(project)} data-cursor="view" style={{ '--project-accent': project.accent } as React.CSSProperties}>
      <div className="lab-card-media">
        {project.media ? <Image src={project.media.src} alt="" fill sizes="360px" className="object-cover" /> : <div className="lab-monogram" aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</div>}
        <span>{project.year}</span>
      </div>
      <div className="lab-card-copy">
        <small>{project.category[0].toUpperCase()}</small>
        <h3>{project.name}</h3>
        <p>{project.tagline}</p>
        <div>{project.technologies.slice(0, 3).join(' · ')}</div>
      </div>
    </button>
  );
}

function LabDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', close); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="lab-dialog-layer" role="dialog" aria-modal="true" aria-labelledby="lab-dialog-title">
      <button className="lab-dialog-scrim" onClick={onClose} aria-label="Close project details" />
      <article className="lab-dialog" style={{ '--project-accent': project.accent } as React.CSSProperties}>
        <button className="dialog-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="lab-dialog-media">
          {project.media ? <Image src={project.media.src} alt={project.media.alt} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" /> : <div className="lab-monogram large">{project.name.slice(0, 2).toUpperCase()}</div>}
          {project.media && <span className="visual-caption">{project.media.kind === 'concept' ? 'CONCEPT VISUAL' : 'REPOSITORY ASSET'}</span>}
        </div>
        <div className="lab-dialog-copy">
          <div className="feature-meta"><span>{project.year}</span><span>{project.category.join(' / ').toUpperCase()}</span></div>
          <h2 id="lab-dialog-title">{project.name}</h2>
          <p className="dialog-tagline">{project.tagline}</p>
          <p>{project.longDescription ?? project.description}</p>
          <div className="dialog-tech">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="dialog-actions">
            <Link href={`/projects/${project.id}`} className="button-primary">CASE STUDY <ArrowRight size={15} /></Link>
            <a href={project.github} target="_blank" rel="noreferrer" className="button-secondary" data-cursor="code"><GithubIcon width={15} /> SOURCE</a>
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-secondary">LIVE <ArrowUpRight size={15} /></a>}
          </div>
        </div>
      </article>
    </div>
  );
}

function ProjectArchive() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const [preview, setPreview] = useState<Project | null>(null);
  const filters: Array<'all' | ProjectCategory> = ['all', 'ai', 'fullstack', 'web', 'mobile', 'game', 'tools', 'experiments'];
  const filtered = filter === 'all' ? archiveProjects : archiveProjects.filter((project) => project.category.includes(filter));

  return (
    <div className="archive-wrap">
      <button className="archive-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="project-archive">
        <span><small>PUBLIC INDEX</small>/ ALL PROJECTS <b>{String(archiveProjects.length).padStart(2, '0')}</b></span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div id="project-archive" className="archive-panel">
          <div className="archive-filters" aria-label="Filter project archive">
            {filters.map((item) => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item.toUpperCase()}</button>)}
          </div>
          <div className="archive-layout">
            <div className="archive-list" role="list">
              <div className="archive-head"><span>PROJECT</span><span>YEAR</span><span>TYPE</span><span>TECH</span><span>SOURCE</span></div>
              {filtered.map((project) => (
                <div key={project.id} className="archive-row" role="listitem" onMouseEnter={() => setPreview(project)} onFocus={() => setPreview(project)}>
                  <Link href={`/projects/${project.id}`}>{project.name}{project.fork && <small>FORK</small>}</Link>
                  <span>{project.year}</span>
                  <span>{project.category[0]}</span>
                  <span>{project.technologies.slice(0, 2).join(' · ')}</span>
                  <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.repoName} source`} data-cursor="code"><ArrowUpRight size={15} /></a>
                </div>
              ))}
            </div>
            <aside className={cn('archive-preview', preview && 'is-visible')} aria-hidden="true">
              {preview?.media ? <Image src={preview.media.src} alt="" fill sizes="300px" className="object-cover" /> : <div className="lab-monogram large">{preview?.name.slice(0, 2).toUpperCase()}</div>}
              <span>{preview?.name ?? 'HOVER TO PREVIEW'}</span>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}

export function Lab() {
  const rail = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(heading.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: heading.current, start: 'top 84%', once: true } });
    });
    return () => media.revert();
  }, []);

  const moveRail = (direction: number) => rail.current?.scrollBy({ left: direction * Math.min(520, window.innerWidth * 0.75), behavior: 'smooth' });
  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!rail.current || event.pointerType === 'touch') return;
    if ((event.target as HTMLElement).closest('button, a')) return;
    pointer.current = { id: event.pointerId, x: event.clientX, left: rail.current.scrollLeft, moved: false };
    setDragging(true);
    document.body.dataset.cursor = 'drag';
  };
  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!rail.current || !pointer.current || pointer.current.id !== event.pointerId) return;
    const distance = event.clientX - pointer.current.x;
    if (Math.abs(distance) > 5) pointer.current.moved = true;
    rail.current.scrollLeft = pointer.current.left - distance;
  };
  const pointerUp = () => {
    pointer.current = null;
    setDragging(false);
    document.body.dataset.cursor = 'default';
  };

  return (
    <section id="lab" className="section lab-section" aria-labelledby="lab-title">
      <div className="section-inner">
        <div ref={heading} className="editorial-heading lab-heading">
          <div className="section-index"><span>04</span><i /><span>THE LAB</span></div>
          <h2 id="lab-title">Built to answer<br /><em>“what if?”</em></h2>
          <p>Experiments, prototypes, games, and things I built because I wanted to know if I could.</p>
        </div>
        <div className="lab-controls"><span>{dragging ? 'DRAGGING' : 'DRAG / SWIPE'}</span><div><button onClick={() => moveRail(-1)} aria-label="Previous experiments"><ArrowLeft /></button><button onClick={() => moveRail(1)} aria-label="Next experiments"><ArrowRight /></button></div></div>
        <div ref={rail} className={cn('lab-rail', dragging && 'is-dragging')} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
          {labProjects.map((project) => <LabCard key={project.id} project={project} onOpen={setSelected} />)}
        </div>
        <ProjectArchive />
      </div>
      {selected && <LabDialog project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
