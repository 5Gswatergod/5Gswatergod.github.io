'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Braces, Boxes, Cpu, Database, Orbit, ServerCog } from 'lucide-react';
import { skills, skillCategories, type Skill, type SkillCategory } from '@/data/skills';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

const icons: Record<SkillCategory, React.ReactNode> = {
  languages: <Braces />, frameworks: <Boxes />, ai: <Cpu />, database: <Database />, infrastructure: <ServerCog />, creative: <Orbit />,
};

export function Skills() {
  const [selected, setSelected] = useState<Skill>(skills[0]);
  const readout = useRef<HTMLElement>(null);
  const related = selected.projects.map((id) => projects.find((project) => project.id === id)).filter(Boolean);

  const chooseSkill = (skill: Skill) => {
    setSelected(skill);
    if (window.matchMedia('(max-width: 900px)').matches) {
      requestAnimationFrame(() => {
        readout.current?.focus({ preventScroll: true });
        readout.current?.scrollIntoView({ block: 'start' });
      });
    }
  };

  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
      <div className="section-inner">
        <div className="editorial-heading compact">
          <div className="section-index"><span>05</span><i /><span>Technologies</span></div>
          <h2 id="skills-title">Technologies in use</h2>
          <p>Select a technology to trace it back to the public projects that use it.</p>
        </div>
        <div className="skills-console">
          <div id="technology-list" className="skill-groups" tabIndex={-1}>
            {skillCategories.map((category) => (
              <section key={category.id} className="skill-group" aria-labelledby={`skill-${category.id}`}>
                <div className="skill-group-label">{icons[category.id]}<div><h3 id={`skill-${category.id}`}>{category.label}</h3><p>{category.description}</p></div></div>
                <div className="skill-cloud">
                  {skills.filter((skill) => skill.category === category.id).map((skill) => (
                    <button key={skill.id} className={cn('skill-chip', selected.id === skill.id && 'is-active')} onClick={() => chooseSkill(skill)} aria-pressed={selected.id === skill.id}>
                      {skill.name}<span>{skill.projects.length}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <aside ref={readout} className="skill-readout" aria-label={`Projects using ${selected.name}`} aria-live="polite" tabIndex={-1}>
            <div className="readout-top"><span>Selected technology</span><i /></div>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <div className="readout-count"><strong>{related.length}</strong><span>public project{related.length === 1 ? '' : 's'}</span></div>
            <div className="readout-projects">
              {related.map((project, index) => project && (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span><b>{project.name}</b><ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
            <a className="skill-back" href="#technology-list">Back to technologies ↑</a>
          </aside>
        </div>
      </div>
    </section>
  );
}
