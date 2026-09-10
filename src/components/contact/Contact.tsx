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
      <div className="contact-orbit" aria-hidden="true" />
      <div className="contact-inner">
        <p className="eyebrow">07 / CONTACT</p>
        <h2 id="contact-title">Have a hard problem?<br /><span>Let’s build through it.</span></h2>
        <p>For collaborations, technical conversations, or source-level questions, GitHub is the verified public route.</p>
        <div className="contact-actions">
          <a href={profile} target="_blank" rel="noreferrer" data-cursor="code"><GithubIcon width={18} />OPEN GITHUB<ArrowUpRight size={16} /></a>
          <button onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'PROFILE LINK COPIED' : 'COPY PROFILE LINK'}</button>
        </div>
      </div>
      <footer className="site-footer">
        <div><b>HUNGYUAN LO</b><span>DESIGNED + ENGINEERED</span></div>
        <div className="footer-status"><i />{siteConfig.status}</div>
        <div><span>© {new Date().getFullYear()}</span><a href="#hero">BACK TO TOP ↑</a></div>
      </footer>
    </section>
  );
}
