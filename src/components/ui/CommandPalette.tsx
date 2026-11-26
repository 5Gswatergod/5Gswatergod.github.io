'use client';

import { useEffect, useRef, useState } from 'react';
import { Command, Search, Terminal, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { GithubIcon } from '@/components/ui/Icons';

type PaletteCommand = { id: string; title: string; detail: string; icon: React.ReactNode; action: () => void; keywords: string };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const close = () => { setOpen(false); setQuery(''); setSelected(0); };
  const go = (id: string) => { close(); requestAnimationFrame(() => { window.location.hash = id; }); };
  const commands: PaletteCommand[] = [
    ...['work', 'about', 'lab', 'skills', 'github', 'contact'].map((id) => ({ id, title: `Go to ${id[0].toUpperCase()}${id.slice(1)}`, detail: `Jump to the ${id} section`, icon: <Command size={16} />, keywords: `navigate section ${id}`, action: () => go(id) })),
    { id: 'source', title: 'Open GitHub profile', detail: 'Browse the verified public repositories', icon: <GithubIcon width={16} />, keywords: 'github source repositories code', action: () => { window.open('https://github.com/5Gswatergod', '_blank', 'noopener,noreferrer'); close(); } },
    { id: 'terminal', title: 'Open portfolio terminal', detail: 'Explore the site with typed commands', icon: <Terminal size={16} />, keywords: 'terminal cli command', action: () => { window.dispatchEvent(new CustomEvent('open-terminal')); close(); } },
  ];
  const filtered = commands.filter((command) => `${command.title} ${command.detail} ${command.keywords}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !document.querySelector('.terminal-backdrop[open], .lab-dialog-layer[open]')) { event.preventDefault(); if (document.querySelector('.palette-backdrop[open]')) close(); else setOpen(true); }
    };
    const external = () => setOpen(true);
    window.addEventListener('keydown', keyboard);
    window.addEventListener('open-command-palette', external);
    return () => { window.removeEventListener('keydown', keyboard); window.removeEventListener('open-command-palette', external); };
  }, []);

  if (!open) return null;
  return (
    <Modal className="palette-backdrop" label="Command palette" onClose={close}>
      <div className="command-palette">
        <div className="palette-input"><Search size={18} /><input ref={input} data-initial-focus value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={(event) => {
          if (event.key === 'ArrowDown') { event.preventDefault(); setSelected((value) => Math.min(value + 1, Math.max(0, filtered.length - 1))); }
          if (event.key === 'ArrowUp') { event.preventDefault(); setSelected((value) => Math.max(value - 1, 0)); }
          if (event.key === 'Enter') { event.preventDefault(); filtered[selected]?.action(); }
        }} placeholder="Search commands" aria-label="Search commands" /><kbd>Ctrl K</kbd><button onClick={close} aria-label="Close"><X size={16} /></button></div>
        <div className="palette-results">
          {filtered.length ? filtered.map((command, index) => <button key={command.id} className={selected === index ? 'selected' : ''} onMouseEnter={() => setSelected(index)} onClick={command.action}><i>{command.icon}</i><span><b>{command.title}</b><small>{command.detail}</small></span><kbd>↵</kbd></button>) : <p>No command matches “{query}”.</p>}
        </div>
        <footer><span>↑ ↓ navigate</span><span>↵ select</span><span>esc close</span></footer>
      </div>
    </Modal>
  );
}
