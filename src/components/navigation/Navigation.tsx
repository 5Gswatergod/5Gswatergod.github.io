'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Command, Menu, Terminal, Volume2, VolumeX, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { navItems, sections, siteConfig } from '@/data/social';

function subscribeToSound(callback: () => void) {
  window.addEventListener('sound-preference', callback);
  return () => window.removeEventListener('sound-preference', callback);
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const muted = useSyncExternalStore(subscribeToSound, () => localStorage.getItem('hl-sound') !== 'on', () => true);
  const logoClicks = useRef<number[]>([]);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-39% 0px -60%', threshold: 0 });
    sections.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const next = !muted;
    localStorage.setItem('hl-sound', next ? 'off' : 'on');
    window.dispatchEvent(new CustomEvent('sound-preference', { detail: { enabled: !next } }));
  };

  const openTool = (eventName: 'open-command-palette' | 'open-terminal') => {
    if (open) menuButton.current?.focus();
    setOpen(false);
    window.dispatchEvent(new CustomEvent(eventName));
  };

  const logoClick = () => {
    setOpen(false);
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((time) => now - time < 1800), now];
    if (logoClicks.current.length >= 5) {
      logoClicks.current = [];
      window.dispatchEvent(new CustomEvent('toggle-dev-mode'));
    }
  };

  const progress = Math.max(1, sections.findIndex((section) => section.id === active) + 1);
  const tools = <>
    <button onClick={() => openTool('open-command-palette')} aria-label="Open command palette"><Command size={16} /><kbd>Ctrl K</kbd></button>
    <button onClick={() => openTool('open-terminal')} aria-label="Open terminal"><Terminal size={16} /><span>Terminal</span></button>
    <button onClick={toggleSound} aria-label="Interface sound" aria-pressed={!muted}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
    <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><GithubIcon width={16} /></a>
  </>;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="site-nav" aria-label="Primary navigation" onKeyDown={(event) => {
        if (open && event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
      }}>
        <a className="site-mark" href="#hero" onClick={logoClick} aria-label="HungYuan Lo, back to top"><b>HL</b><span>5GS / 026</span></a>
        <div className="desktop-links">
          {navItems.map((item) => <a key={item.id} href={item.href} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>)}
        </div>
        <div className="nav-tools">{tools}</div>
        <button ref={menuButton} className="mobile-trigger" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-menu" aria-expanded={open}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        <div className="nav-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress / sections.length})` }} /></div>
        <div id="mobile-menu" className="mobile-menu" hidden={!open}>
          {navItems.map((item) => <a key={item.id} href={item.href} onClick={() => setOpen(false)} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>)}
          <div className="mobile-tools">{tools}</div>
        </div>
      </nav>
    </>
  );
}
