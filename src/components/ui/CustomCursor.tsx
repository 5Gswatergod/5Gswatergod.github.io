'use client';

import { useEffect, useRef } from 'react';

const labels: Record<string, string> = { view: 'VIEW', code: 'CODE ↗', drag: 'DRAG ↔' };

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${targetX}px,${targetY}px,0)`;
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor],a,button');
      const mode = target?.dataset.cursor ?? (target ? 'view' : document.body.dataset.cursor ?? '');
      if (ring.current) ring.current.dataset.mode = mode;
      if (label.current) label.current.textContent = labels[mode] ?? '';
    };
    const tick = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    frame = requestAnimationFrame(tick);
    document.documentElement.classList.add('has-custom-cursor');
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return <div className="cursor-layer" aria-hidden="true"><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring"><span ref={label} /></div></div>;
}
