'use client';

import React, { useEffect, useState } from 'react';

interface GlitchEffectProps {
  children: React.ReactNode;
}

export function GlitchEffect({ children }: GlitchEffectProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const scheduleNext = () => {
      if (cancelled) return;
      const delay = 3000 + Math.random() * 2000; // 3-5 seconds
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        setGlitch(true);
        setTimeout(() => {
          if (!cancelled) setGlitch(false);
          scheduleNext();
        }, 400);
      }, delay);
    };

    scheduleNext();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <span
      className={`inline-block ${glitch ? 'animate-glitch-effect' : ''}`}
    >
      {children}
    </span>
  );
}
