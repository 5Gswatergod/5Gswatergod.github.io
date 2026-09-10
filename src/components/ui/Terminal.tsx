'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal as TerminalIcon, X } from 'lucide-react';

type Line = { id: number; tone?: 'accent' | 'error'; text: string };
const names: Record<string, string> = {
  mahjong: 'mahjong', ollama: 'ollama-models-manager', hydrava: 'discord-bot-2026', 'ai-budget': 'ai-budget-tracker', rideready: 'motorcycle-test', skull: 'project-skull',
};
const help = 'help · about · projects · skills · github · contact · ls · open <project> · date · echo <text> · matrix · clear';

export function Terminal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lines, setLines] = useState<Line[]>([
    { id: 1, tone: 'accent', text: 'PORTFOLIO SHELL / REPOSITORY-BACKED MODE' },
    { id: 2, text: 'Type “help” to inspect available commands.' },
  ]);
  const input = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const id = useRef(3);
  const write = (text: string, tone?: Line['tone']) => setLines((current) => [...current, { id: id.current++, text, tone }]);

  useEffect(() => {
    const external = () => setOpen(true);
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '`') { event.preventDefault(); setOpen((current) => !current); }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('open-terminal', external);
    window.addEventListener('keydown', keyboard);
    return () => { window.removeEventListener('open-terminal', external); window.removeEventListener('keydown', keyboard); };
  }, []);
  useEffect(() => { if (open) window.setTimeout(() => input.current?.focus(), 20); }, [open]);
  useEffect(() => { output.current?.scrollTo({ top: output.current.scrollHeight }); }, [lines]);

  const execute = (raw: string) => {
    const command = raw.trim();
    if (!command) return;
    setHistory((current) => [...current, command]); setHistoryIndex(history.length + 1); setValue(''); write(`$ ${command}`, 'accent');
    const [name, ...args] = command.split(/\s+/);
    switch (name.toLowerCase()) {
      case 'help': write(help); break;
      case 'about': write('HungYuan Lo — creative developer, AI engineer, and full-stack builder. Public work spans local AI tools, real-time applications, mobile software, and interactive experiments.'); break;
      case 'projects': write('mahjong · ollama · hydrava · ai-budget · rideready · skull'); break;
      case 'skills': write('TypeScript · Python · React · Next.js · Fastify · Socket.IO · PyTorch · SwiftUI · Docker · PostgreSQL'); break;
      case 'github': write('Opening github.com/5Gswatergod…'); window.open('https://github.com/5Gswatergod', '_blank', 'noopener,noreferrer'); break;
      case 'contact': write('Verified public contact surface: github.com/5Gswatergod'); break;
      case 'ls': write('Mahjong/  Ollama-Models-Manager/  Discord-Bot-2026/  AI-Budget-Tracker/  MotorcycleTest/  Project_skull/'); break;
      case 'open': {
        const slug = names[args[0]?.toLowerCase()];
        if (slug) router.push(`/projects/${slug}`);
        else write(`Unknown project. Try: ${Object.keys(names).join(', ')}`, 'error');
        break;
      }
      case 'date': write(new Date().toString()); break;
      case 'echo': write(args.join(' ')); break;
      case 'matrix': write('Alternate signal path opened for 1.8 seconds.'); window.dispatchEvent(new CustomEvent('matrix-mode')); break;
      case 'clear': setLines([]); break;
      default: write(`Command not found: ${name}. Type “help”.`, 'error');
    }
  };

  return (
    <>
      <button className="terminal-trigger" onClick={() => setOpen(true)} aria-label="Open terminal" data-cursor="view"><TerminalIcon size={18} /><span>TERMINAL</span></button>
      {open && <div className="terminal-backdrop" onMouseDown={(event) => event.currentTarget === event.target && setOpen(false)}>
        <div className="terminal-window" role="dialog" aria-modal="true" aria-label="Portfolio terminal">
          <header><div><i /><i /><i /></div><span>hungyuan@portfolio — zsh</span><button onClick={() => setOpen(false)} aria-label="Close terminal"><X size={16} /></button></header>
          <div className="terminal-output-panel" ref={output}>{lines.map((line) => <p key={line.id} className={line.tone}>{line.text}</p>)}</div>
          <label><span>hungyuan@portfolio:~$</span><input ref={input} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => {
            if (event.key === 'Enter') execute(value);
            if (event.key === 'ArrowUp') { event.preventDefault(); const next = Math.max(0, historyIndex - 1); setHistoryIndex(next); setValue(history[next] ?? ''); }
            if (event.key === 'ArrowDown') { event.preventDefault(); const next = Math.min(history.length, historyIndex + 1); setHistoryIndex(next); setValue(history[next] ?? ''); }
            if (event.key === 'Tab') { event.preventDefault(); const options = help.split(' · ').map((item) => item.split(' ')[0]); const matches = options.filter((item) => item.startsWith(value)); if (matches.length === 1) setValue(`${matches[0]} `); }
          }} aria-label="Terminal command" autoComplete="off" spellCheck={false} /></label>
        </div>
      </div>}
    </>
  );
}
