'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

export function Modal({ className, label, labelledBy, onClose, children }: {
  className: string;
  label?: string;
  labelledBy?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-initial-focus]')?.focus();
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={ref} className={className} aria-label={label} aria-labelledby={labelledBy} onCancel={(event) => {
    event.preventDefault();
    onClose();
  }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>{children}</dialog>;
}
