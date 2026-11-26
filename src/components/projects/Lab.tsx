'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { archiveProjects, labProjects, type Project, type ProjectCategory } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';

function LabCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <button className="lab-card" data-project-id={project.id} onClick={() => onOpen(project)} data-cursor="view">
      <div className="lab-card-media">
        {project.media ? <Image src={project.media.src} alt="" fill sizes="360px" className="object-cover" draggable={false} /> : <div className="lab-monogram" aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</div>}
        <span>{project.year}</span>
      </div>
      <div className="lab-card-copy">
        <small>{project.category[0]}</small>
        <h3>{project.name}</h3>
        <p>{project.tagline}</p>
        <div>{project.technologies.slice(0, 3).join(' · ')}</div>
      </div>
    </button>
  );
}

function LabDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Modal className="lab-dialog-layer" labelledBy="lab-dialog-title" onClose={onClose}>
      <article className="lab-dialog">
        <button data-initial-focus className="dialog-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="lab-dialog-media">
          {project.media ? <Image src={project.media.src} alt={project.media.alt} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" /> : <div className="lab-monogram large">{project.name.slice(0, 2).toUpperCase()}</div>}
          {project.media && <span className="visual-caption">{project.media.kind === 'concept' ? 'Concept illustration' : 'From the repository'}</span>}
        </div>
        <div className="lab-dialog-copy">
          <div className="feature-meta"><span>{project.year}</span><span>{project.category.join(' / ')}</span></div>
          <h2 id="lab-dialog-title">{project.name}</h2>
          <p className="dialog-tagline">{project.tagline}</p>
          <p>{project.longDescription ?? project.description}</p>
          <div className="dialog-tech">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="dialog-actions">
            <Link href={`/projects/${project.id}`} className="button-primary">Case study <ArrowRight size={15} /></Link>
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="button-secondary"><GithubIcon width={16} /> Source</a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-secondary">Live project <ArrowUpRight size={15} /></a>}
          </div>
        </div>
      </article>
    </Modal>
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
        <span><small>Public index</small>/ All projects <b>{String(archiveProjects.length).padStart(2, '0')}</b></span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div id="project-archive" className="archive-panel">
          <div className="archive-filters" aria-label="Filter project archive">
            {filters.map((item) => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}
          </div>
          <div className="archive-layout">
            <div className="archive-list" role="list">
              <div className="archive-head"><span>Project</span><span>Year</span><span>Type</span><span>Technology</span><span>Source</span></div>
              {filtered.map((project) => (
                <div key={project.id} className="archive-row" role="listitem" onMouseEnter={() => setPreview(project)} onFocus={() => setPreview(project)}>
                  <Link href={`/projects/${project.id}`}>{project.name}{project.fork && <small>Fork</small>}</Link>
                  <span>{project.year}</span>
                  <span>{project.category[0]}</span>
                  <span>{project.technologies.slice(0, 2).join(' · ')}</span>
                  {project.github ? <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.repoName} source`}><ArrowUpRight size={16} /></a> : <span>—</span>}
                </div>
              ))}
            </div>
            <aside className={cn('archive-preview', preview && 'is-visible')} aria-hidden="true">
              {preview?.media ? <Image src={preview.media.src} alt="" fill sizes="300px" className="object-cover" /> : <div className="lab-monogram large">{preview?.name.slice(0, 2).toUpperCase()}</div>}
              <span>{preview?.name ?? 'Focus a project to preview it'}</span>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}

export function Lab() {
  const rail = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const suppressClick = useRef(false);
  const moveRail = (direction: number) => rail.current?.scrollBy({ left: direction * Math.min(420, window.innerWidth * 0.8), behavior: 'auto' });
  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointer.current = { id: event.pointerId, x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
  };
  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = pointer.current;
    if (!drag || drag.id !== event.pointerId || !event.buttons) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(distance) < 6) return;
      drag.moved = true;
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    event.currentTarget.scrollLeft = drag.left - distance;
  };
  const pointerUp = () => {
    pointer.current = null;
    setDragging(false);
  };

  return (
    <section id="lab" className="section lab-section" aria-labelledby="lab-title">
      <div className="section-inner">
        <div className="editorial-heading lab-heading">
          <div className="section-index"><span>04</span><i /><span>Lab</span></div>
          <h2 id="lab-title">Prototypes, games, and research</h2>
          <p>Smaller builds for trying an idea, a tool, or a different way to interact.</p>
        </div>
        <div className="lab-controls"><span>{dragging ? 'Dragging' : 'Drag, swipe, or use arrows'}</span><div><button onClick={() => moveRail(-1)} aria-label="Previous experiments"><ArrowLeft /></button><button onClick={() => moveRail(1)} aria-label="Next experiments"><ArrowRight /></button></div></div>
        <div ref={rail} className={cn('lab-rail', dragging && 'is-dragging')} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onLostPointerCapture={pointerUp} onClickCapture={(event) => {
          if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); }
        }}>
          {labProjects.map((project) => <LabCard key={project.id} project={project} onOpen={setSelected} />)}
        </div>
        <ProjectArchive />
      </div>
      {selected && <LabDialog project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
