import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import type { Project } from '@/data/projects';

export function ProjectCaseStudy({ project }: { project: Project }) {
  const architecture = project.architecture ? [
    ['Client', project.architecture.client], ['Server', project.architecture.server],
    ['Real-time', project.architecture.realtime], ['Infrastructure', project.architecture.infrastructure],
  ].filter(([, items]) => items.length > 0) as Array<[string, string[]]> : [];

  return (
    <article className="case-page">
      <nav className="case-nav"><Link href="/#work"><ArrowLeft size={16} />Back to work</Link>{project.github && <a href={project.github} target="_blank" rel="noreferrer"><GithubIcon width={16} />Source</a>}</nav>
      <header className="case-header">
        <p className="eyebrow">{project.year} / {project.category.join(' + ')}</p>
        <h1 style={{ viewTransitionName: `project-${project.id}` }}>{project.name}</h1>
        <p>{project.tagline}</p>
        <div className="case-actions">{project.github && <a href={project.github} target="_blank" rel="noreferrer"><GithubIcon width={17} />View source<ArrowUpRight size={15} /></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Open live project<ArrowUpRight size={15} /></a>}</div>
      </header>

      {project.media && <figure className="case-media">
        <Image src={project.media.src} alt={project.media.alt} fill priority sizes="(max-width: 900px) 100vw, 1200px" style={{ objectPosition: project.media.objectPosition ?? 'center' }} />
        <figcaption>{project.media.kind === 'concept' ? 'Concept illustration, not an app screenshot' : 'From the repository'}</figcaption>
      </figure>}

      <div className="case-body">
        <section className="case-overview"><p className="eyebrow">01 / Overview</p><h2>{project.github ? 'Project overview' : 'About this archived project'}</h2><p>{project.longDescription ?? project.description}</p></section>
        {project.highlights?.length && <section><p className="eyebrow">02 / System highlights</p><div className="case-highlights">{project.highlights.map((item) => <div key={item}><CheckCircle2 size={18} /><span>{item}</span></div>)}</div></section>}
        {architecture.length > 0 && <section><p className="eyebrow">03 / Architecture</p><div className="architecture-grid">{architecture.map(([label, items]) => <div key={label}><h3>{label}</h3>{items.map((item) => <p key={item}>{item}</p>)}</div>)}</div></section>}
        <section><p className="eyebrow">04 / Toolchain</p><div className="case-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></section>
        {project.evidence?.length && <section><p className="eyebrow">05 / Source notes</p><div className="evidence-list">{project.evidence.map((item, index) => <div key={item}><b>0{index + 1}</b><p>{item}</p></div>)}</div></section>}
      </div>
      <footer className="case-footer"><Link href="/#work"><ArrowLeft size={16} />Return to selected work</Link>{project.github && <a href={project.github} target="_blank" rel="noreferrer">Inspect repository<ArrowUpRight size={16} /></a>}</footer>
    </article>
  );
}
