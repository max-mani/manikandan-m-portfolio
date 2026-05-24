'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STEP_EASE, VIEWPORT_ONCE } from '@/lib/pixelMotion';

interface CountUpStatProps {
  value: string;
  className?: string;
  durationMs?: number;
}

function parseStatValue(raw: string): { target: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: raw };
  return { target: parseInt(match[1], 10), suffix: match[2] ?? '' };
}

export function CountUpStat({ value, className = '', durationMs = 900 }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT_ONCE);
  const { target, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!inView || ranRef.current) return;
    ranRef.current = true;
    if (target <= 0) {
      setDisplay(0);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const stepped = Math.floor(t * target);
      setDisplay(stepped);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, durationMs]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.12, ease: STEP_EASE }}
      className={className}
    >
      {display}
      {suffix}
    </motion.div>
  );
}
