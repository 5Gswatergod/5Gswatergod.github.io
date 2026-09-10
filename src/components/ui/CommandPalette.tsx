'use client';

import { useEffect, useRef, useState } from 'react';
import { Command, Search, Terminal, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

type PaletteCommand = { id: string; title: string; detail: string; icon: React.ReactNode; action: () => void; keywords: string };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const close = () => { setOpen(false); setQuery(''); setSelected(0); };
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); close(); };
  const commands: PaletteCommand[] = [
    ...['work', 'about', 'lab', 'skills', 'github', 'contact'].map((id) => ({ id, title: `Go to ${id[0].toUpperCase()}${id.slice(1)}`, detail: `Jump to the ${id} section`, icon: <Command size={16} />, keywords: `navigate section ${id}`, action: () => go(id) })),
    { id: 'source', title: 'Open GitHub profile', detail: 'Browse the verified public repositories', icon: <GithubIcon width={16} />, keywords: 'github source repositories code', action: () => window.open('https://github.com/5Gswatergod', '_blank', 'noopener,noreferrer') },
    { id: 'terminal', title: 'Open portfolio terminal', detail: 'Explore the site with typed commands', icon: <Terminal size={16} />, keywords: 'terminal cli command', action: () => { window.dispatchEvent(new CustomEvent('open-terminal')); close(); } },
  ];
  const filtered = commands.filter((command) => `${command.title} ${command.detail} ${command.keywords}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen((value) => !value); }
      if (event.key === 'Escape') close();
    };
    const external = () => setOpen(true);
    window.addEventListener('keydown', keyboard);
    window.addEventListener('open-command-palette', external);
    return () => { window.removeEventListener('keydown', keyboard); window.removeEventListener('open-command-palette', external); };
  }, []);

  useEffect(() => {
    if (open) { window.setTimeout(() => input.current?.focus(), 20); document.body.classList.add('modal-open'); }
    else document.body.classList.remove('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [open]);

  if (!open) return null;
  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && close()}>
      <div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="palette-input"><Search size={18} /><input ref={input} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={(event) => {
          if (event.key === 'ArrowDown') { event.preventDefault(); setSelected((value) => Math.min(value + 1, filtered.length - 1)); }
          if (event.key === 'ArrowUp') { event.preventDefault(); setSelected((value) => Math.max(value - 1, 0)); }
          if (event.key === 'Enter') filtered[selected]?.action();
        }} placeholder="Search commands…" aria-label="Search commands" /><kbd>CTRL K</kbd><button onClick={close} aria-label="Close"><X size={16} /></button></div>
        <div className="palette-results">
          {filtered.length ? filtered.map((command, index) => <button key={command.id} className={selected === index ? 'selected' : ''} onMouseEnter={() => setSelected(index)} onClick={command.action}><i>{command.icon}</i><span><b>{command.title}</b><small>{command.detail}</small></span><em>↵</em></button>) : <p>No command matches “{query}”.</p>}
        </div>
        <footer><span>↑ ↓ navigate</span><span>↵ select</span><span>esc close</span></footer>
      </div>
    </div>
  );
}
