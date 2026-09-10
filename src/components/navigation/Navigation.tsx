'use client';

import { useEffect, useRef, useState } from 'react';
import { Command, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { navItems, sections } from '@/data/social';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [muted, setMuted] = useState(true);
  const logoClicks = useRef<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-35% 0px -55%', threshold: [0, 0.25, 0.6] });
    sections.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem('hl-sound', next ? 'off' : 'on');
    window.dispatchEvent(new CustomEvent('sound-preference', { detail: { enabled: !next } }));
  };

  const logoClick = () => {
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((time) => now - time < 1800), now];
    if (logoClicks.current.length >= 5) {
      logoClicks.current = [];
      window.dispatchEvent(new CustomEvent('toggle-dev-mode'));
    }
  };

  const progress = Math.max(1, sections.findIndex((section) => section.id === active) + 1);

  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <button className="site-mark" onClick={() => { logoClick(); navigate('hero'); }} aria-label="HungYuan Lo, back to top">
          <b>HL</b><span>5GS / 026</span>
        </button>
        <div className="desktop-links">
          {navItems.map((item) => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>{item.label}</button>)}
        </div>
        <div className="nav-tools">
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))} aria-label="Open command palette"><Command size={15} /><span>CTRL K</span></button>
          <button onClick={toggleSound} aria-label={muted ? 'Enable interface sound' : 'Disable interface sound'}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
          <a href="https://github.com/5Gswatergod" target="_blank" rel="noreferrer" aria-label="GitHub profile"><GithubIcon width={17} /></a>
          <button className="mobile-trigger" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
        <div className="nav-progress"><span style={{ transform: `scaleX(${progress / sections.length})` }} /></div>
      </nav>
      {open && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
          <p>INDEX / {String(progress).padStart(2, '0')}</p>
          {navItems.map((item, index) => <button key={item.id} onClick={() => navigate(item.id)}><span>0{index + 1}</span>{item.label}</button>)}
          <a href="https://github.com/5Gswatergod" target="_blank" rel="noreferrer">GITHUB / SOURCE ↗</a>
        </div>
      )}
    </>
  );
}
