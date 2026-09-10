'use client';

import { useEffect, useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { gsap } from '@/lib/motion';

const evidence = [
  ['REAL-TIME', 'Shared game logic across a React client and Fastify / Socket.IO server.'],
  ['LOCAL AI', 'Model archives, quantization, benchmarks, and training pipelines that stay inspectable.'],
  ['PRODUCTS', 'Desktop, mobile, web, and game projects built across distinct runtimes.'],
  ['INFRA', 'Docker, PostgreSQL, Redis, Caddy, and GitHub workflows where the project calls for them.'],
];

export function About() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const words = section.current?.querySelectorAll('[data-reveal]');
      if (!words?.length) return;
      gsap.fromTo(words, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power4.out', scrollTrigger: { trigger: section.current, start: 'top 66%', once: true } });
    });
    return () => media.revert();
  }, []);

  return (
    <section id="about" ref={section} className="section about-section" aria-labelledby="about-title">
      <div className="section-inner about-grid">
        <div className="section-index about-index"><span>02</span><i /><span>OPERATING PRINCIPLE</span></div>
        <div className="about-statement">
          <h2 id="about-title" className="sr-only">About HungYuan</h2>
          <div className="reveal-line"><span data-reveal>I DON&apos;T JUST</span></div>
          <div className="reveal-line quiet"><span data-reveal>WRITE CODE.</span></div>
          <div className="reveal-line"><span data-reveal>I BUILD</span></div>
          <div className="reveal-line accent"><span data-reveal>SYSTEMS,</span></div>
          <div className="reveal-line accent"><span data-reveal>EXPERIMENTS</span></div>
          <div className="reveal-line"><span data-reveal>AND EXPERIENCES.</span></div>
        </div>
        <div className="about-copy">
          <p>HungYuan&apos;s public work moves between application engineering and technical experimentation: a shared multiplayer game core, safety-first local model tooling, a modular Discord platform, mobile ledgers, and interactive research sites.</p>
          <p>The connective tissue is curiosity about how the whole system works—from data and deployment to the final interaction.</p>
          <a href="#work" onClick={(event) => { event.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }} data-cursor="view">TRACE THE WORK <ArrowDownRight size={16} /></a>
        </div>
        <div className="evidence-list">
          {evidence.map(([label, detail], index) => (
            <article key={label}>
              <span>0{index + 1}</span><h3>{label}</h3><p>{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
