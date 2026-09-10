'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Braces, Boxes, Cpu, Database, Orbit, ServerCog } from 'lucide-react';
import { skills, skillCategories, type Skill, type SkillCategory } from '@/data/skills';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import { gsap } from '@/lib/motion';

const icons: Record<SkillCategory, React.ReactNode> = {
  languages: <Braces />, frameworks: <Boxes />, ai: <Cpu />, database: <Database />, infrastructure: <ServerCog />, creative: <Orbit />,
};

export function Skills() {
  const [selected, setSelected] = useState<Skill>(skills[0]);
  const section = useRef<HTMLElement>(null);
  const related = selected.projects.map((id) => projects.find((project) => project.id === id)).filter(Boolean);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(section.current?.querySelectorAll('.skill-chip') ?? [], { scale: 0.84, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.025, duration: 0.55, ease: 'back.out(1.4)', scrollTrigger: { trigger: section.current, start: 'top 70%', once: true } });
    });
    return () => media.revert();
  }, []);

  return (
    <section id="skills" ref={section} className="section skills-section" aria-labelledby="skills-title">
      <div className="section-inner">
        <div className="editorial-heading compact">
          <div className="section-index"><span>05</span><i /><span>TECHNOLOGY CONSTELLATION</span></div>
          <h2 id="skills-title">Evidence,<br /><em>not percentages.</em></h2>
          <p>Select a technology to trace it back to the public projects that use it.</p>
        </div>
        <div className="skills-console">
          <div className="skill-groups">
            {skillCategories.map((category) => (
              <section key={category.id} className="skill-group" aria-labelledby={`skill-${category.id}`}>
                <div className="skill-group-label">{icons[category.id]}<div><h3 id={`skill-${category.id}`}>{category.label}</h3><p>{category.description}</p></div></div>
                <div className="skill-cloud">
                  {skills.filter((skill) => skill.category === category.id).map((skill) => (
                    <button key={skill.id} className={cn('skill-chip', selected.id === skill.id && 'is-active')} onMouseEnter={() => setSelected(skill)} onFocus={() => setSelected(skill)} onClick={() => setSelected(skill)} aria-pressed={selected.id === skill.id}>
                      {skill.name}<span>{String(skill.projects.length).padStart(2, '0')}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <aside className="skill-readout" aria-live="polite">
            <div className="readout-top"><span>SELECTED TECHNOLOGY</span><i /></div>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <div className="readout-count"><strong>{related.length}</strong><span>PUBLIC PROJECT{related.length === 1 ? '' : 'S'}<br />USING THIS</span></div>
            <div className="readout-projects">
              {related.map((project, index) => project && (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span><b>{project.name}</b><ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
