'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { siteConfig } from '@/data/social';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const profile = 'https://github.com/5Gswatergod';
  const copy = async () => {
    await navigator.clipboard.writeText(profile);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-inner">
        <p className="eyebrow">07 / Contact</p>
        <h2 id="contact-title">Get in touch on GitHub</h2>
        <p>For collaboration or questions about a project, find me on GitHub.</p>
        <div className="contact-actions">
          <a href={profile} target="_blank" rel="noreferrer" data-cursor="code"><GithubIcon width={18} />Open GitHub<ArrowUpRight size={16} /></a>
          <button onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Link copied' : 'Copy profile link'}</button>
        </div>
      </div>
      <footer className="site-footer">
        <div><b>HungYuan Lo</b><span>Design and development</span></div>
        <div className="footer-status"><i />{siteConfig.status}</div>
        <div><span>© {new Date().getFullYear()}</span><a href="#hero">Back to top ↑</a></div>
      </footer>
    </section>
  );
}
