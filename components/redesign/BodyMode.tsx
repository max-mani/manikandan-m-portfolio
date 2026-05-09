'use client';

import { useEffect } from 'react';

interface BodyModeProps {
  /** Sets `data-mode` on the body so globals.css can scope styling. */
  mode: 'cyber' | 'terminal';
}

export function BodyMode({ mode }: BodyModeProps) {
  useEffect(() => {
    const prev = document.body.getAttribute('data-mode');
    document.body.setAttribute('data-mode', mode);
    return () => {
      if (prev) document.body.setAttribute('data-mode', prev);
      else document.body.removeAttribute('data-mode');
    };
  }, [mode]);
  return null;
}
