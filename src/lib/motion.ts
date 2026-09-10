import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function createScrollReveal(
  elements: string | Element[],
  options: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
    y?: number;
    opacity?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    once?: boolean;
  } = {}
) {
  const {
    start = 'top 85%',
    end = 'bottom 20%',
    scrub = false,
    y = 40,
    opacity = 0,
    stagger = 0.1,
    duration = 0.8,
    ease = 'power3.out',
    once = true,
  } = options;

  const targets = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;

  if (targets.length === 0) return;

  if (scrub) {
    gsap.to(targets, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: targets[0],
        start,
        end,
        scrub,
        once,
      },
    });
  } else {
    gsap.fromTo(
      targets,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: targets[0],
          start,
          end,
          once,
        },
      }
    );
  }
}

export function createPinSection(
  trigger: string | Element,
  options: {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  } = {}
) {
  const { start = 'top top', end = 'bottom top', pinSpacing = true } = options;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    pinSpacing,
    onEnter: options.onEnter,
    onLeave: options.onLeave,
    onEnterBack: options.onEnterBack,
    onLeaveBack: options.onLeaveBack,
  });
}

export function createParallax(
  element: string | Element,
  options: {
    speed?: number;
    start?: string;
    end?: string;
    direction?: 'up' | 'down';
  } = {}
) {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top', direction = 'up' } = options;

  gsap.to(element, {
    yPercent: direction === 'up' ? -100 * speed : 100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

export function createTextReveal(
  elements: string | Element[],
  options: {
    start?: string;
    stagger?: number;
    duration?: number;
    ease?: string;
    from?: 'bottom' | 'top' | 'left' | 'right';
  } = {}
) {
  const { start = 'top 85%', stagger = 0.03, duration = 0.8, ease = 'power3.out', from = 'bottom' } = options;

  const targets = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;

  const initialProps = {
    bottom: { y: '100%', opacity: 0 },
    top: { y: '-100%', opacity: 0 },
    left: { x: '-100%', opacity: 0 },
    right: { x: '100%', opacity: 0 },
  };

  gsap.fromTo(
    targets,
    initialProps[from],
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: targets[0],
        start,
        once: true,
      },
    }
  );
}

export function createCounter(
  element: string | Element,
  endValue: number,
  options: {
    start?: string;
    duration?: number;
    ease?: string;
    decimals?: number;
    prefix?: string;
    suffix?: string;
  } = {}
) {
  const { start = 'top 85%', duration = 2, ease = 'power2.out', decimals = 0, prefix = '', suffix = '' } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const obj = { value: 0 };

  gsap.to(obj, {
    value: endValue,
    duration,
    ease,
    scrollTrigger: {
      trigger: el,
      start,
      once: true,
    },
    onUpdate: () => {
      el.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
    },
  });
}

export function createMagnetic(
  element: string | Element,
  options: {
    strength?: number;
    area?: number;
  } = {}
) {
  const { strength = 0.3, area = 100 } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  const target = el as HTMLElement;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);

    if (distance < area) {
      gsap.to(target, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  target.addEventListener('mousemove', handleMouseMove);
  target.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    target.removeEventListener('mousemove', handleMouseMove);
    target.removeEventListener('mouseleave', handleMouseLeave);
  };
}

export function createHoverScale(
  element: string | Element,
  scale = 1.02
) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  const target = el as HTMLElement;

  const handleEnter = () => gsap.to(target, { scale, duration: 0.2, ease: 'power2.out' });
  const handleLeave = () => gsap.to(target, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });

  target.addEventListener('mouseenter', handleEnter);
  target.addEventListener('mouseleave', handleLeave);

  return () => {
    target.removeEventListener('mouseenter', handleEnter);
    target.removeEventListener('mouseleave', handleLeave);
  };
}

export function splitText(
  element: string | Element,
  options: {
    type?: 'chars' | 'words' | 'lines';
    className?: string;
  } = {}
) {
  const { type = 'chars', className = 'split-text' } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return [];

  const text = el.textContent || '';
  el.textContent = '';

  const splits = text.split(type === 'words' ? ' ' : type === 'lines' ? '\n' : '');

  return splits.map((split, i) => {
    const span = document.createElement('span');
    span.className = `${className} ${className}-${type}`;
    span.style.display = 'inline-block';
    span.textContent = split + (type === 'words' && i < splits.length - 1 ? ' ' : '');
    el.appendChild(span);
    return span;
  });
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
