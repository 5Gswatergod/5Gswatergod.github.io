'use client';

import { useEffect, useState } from 'react';

export function ExperienceLayer() {
  const [devMode, setDevMode] = useState(false);
  const [signal, setSignal] = useState(false);
  const [metrics, setMetrics] = useState({ fps: 60, width: 0, height: 0, scroll: 0, x: 0, y: 0 });

  useEffect(() => {
    let soundEnabled = localStorage.getItem('hl-sound') === 'on';
    let context: AudioContext | null = null;
    const tone = () => {
      if (!soundEnabled) return;
      context ??= new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = 620;
      gain.gain.setValueAtTime(0.025, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.055);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + 0.06);
    };
    const sound = (event: Event) => { soundEnabled = Boolean((event as CustomEvent<{ enabled: boolean }>).detail.enabled); };
    const click = (event: MouseEvent) => { if ((event.target as HTMLElement).closest('button,a')) tone(); };
    const toggleDev = () => setDevMode((value) => !value);
    const showSignal = () => { setSignal(true); window.setTimeout(() => setSignal(false), 1800); };
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let keys: string[] = [];
    const keydown = (event: KeyboardEvent) => {
      keys = [...keys, event.key].slice(-sequence.length);
      if (keys.join('|').toLowerCase() === sequence.join('|').toLowerCase()) {
        showSignal();
        keys = [];
      }
    };
    window.addEventListener('sound-preference', sound);
    window.addEventListener('toggle-dev-mode', toggleDev);
    window.addEventListener('matrix-mode', showSignal);
    window.addEventListener('keydown', keydown);
    document.addEventListener('click', click);
    return () => {
      window.removeEventListener('sound-preference', sound);
      window.removeEventListener('toggle-dev-mode', toggleDev);
      window.removeEventListener('matrix-mode', showSignal);
      window.removeEventListener('keydown', keydown);
      document.removeEventListener('click', click);
      context?.close();
    };
  }, []);

  useEffect(() => {
    if (!devMode) return;
    let frame = 0; let count = 0; let last = performance.now(); let pointerX = 0; let pointerY = 0;
    const pointer = (event: PointerEvent) => { pointerX = event.clientX; pointerY = event.clientY; };
    const tick = (now: number) => {
      count += 1;
      if (now - last >= 500) {
        setMetrics({ fps: Math.round(count * 1000 / (now - last)), width: innerWidth, height: innerHeight, scroll: Math.round(scrollY), x: pointerX, y: pointerY });
        count = 0; last = now;
      }
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', pointer, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', pointer); };
  }, [devMode]);

  return <>{signal && <div className="signal-overlay" role="status"><span>Alternate signal path active</span></div>}{devMode && <aside className="dev-hud" aria-live="polite"><b>Developer mode</b><span>{metrics.fps} FPS</span><span>{metrics.width} × {metrics.height}</span><span>Scroll {metrics.scroll}</span><span>Pointer {metrics.x},{metrics.y}</span></aside>}</>;
}
