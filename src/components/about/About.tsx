import { ArrowDownRight } from 'lucide-react';

const evidence = [
  ['Real-time systems', 'Shared game logic across a React client and Fastify / Socket.IO server.'],
  ['Local AI', 'Model archives, quantization, benchmarks, and training pipelines that stay inspectable.'],
  ['Applications', 'Desktop, mobile, web, and game projects built across distinct runtimes.'],
  ['Infrastructure', 'Docker, PostgreSQL, Redis, Caddy, and GitHub workflows where the project calls for them.'],
];

export function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="section-inner about-grid">
        <div className="section-index about-index"><span>02</span><i /><span>About</span></div>
        <h2 id="about-title" className="about-statement">From game rules to deployment</h2>
        <div className="about-copy">
          <p>My public work ranges from a shared multiplayer game engine and local model backup tools to a modular Discord platform, mobile ledgers, and interactive research sites.</p>
          <p>I like working across the whole system: the data, how the software ships, and what it feels like to use.</p>
          <a href="#work">See selected work <ArrowDownRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="evidence-list">
          {evidence.map(([label, detail], index) => (
            <article key={label}>
              <span>{String(index + 1).padStart(2, '0')}</span><h3>{label}</h3><p>{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
