'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Accent = 'cyan' | 'violet' | 'green' | 'magenta' | 'mixed';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: Accent;
  /** Whether the card lifts on hover. Defaults to true. */
  interactive?: boolean;
  /** Extra inner padding. Defaults to true. */
  padded?: boolean;
}

const accentRing: Record<Accent, string> = {
  cyan: 'before:bg-[linear-gradient(135deg,rgba(0,229,255,0.7),rgba(0,229,255,0.1))]',
  violet: 'before:bg-[linear-gradient(135deg,rgba(168,85,247,0.75),rgba(168,85,247,0.1))]',
  green: 'before:bg-[linear-gradient(135deg,rgba(0,255,65,0.6),rgba(0,255,65,0.1))]',
  magenta: 'before:bg-[linear-gradient(135deg,rgba(255,0,255,0.65),rgba(255,0,255,0.08))]',
  mixed:
    'before:bg-[linear-gradient(135deg,rgba(0,229,255,0.6),rgba(168,85,247,0.6),rgba(255,0,255,0.45))]',
};

export function GlowCard({
  children,
  className = '',
  accent = 'mixed',
  interactive = true,
  padded = true,
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={[
        'relative rounded-2xl overflow-hidden',
        // Animated gradient ring border via ::before
        "before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:content-['']",
        'before:[mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor]',
        accentRing[accent],
        'shadow-[0_2px_22px_rgba(0,0,0,0.35)]',
        interactive
          ? 'transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(0,229,255,0.18),0_0_60px_rgba(168,85,247,0.18)]'
          : '',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'relative h-full w-full rounded-2xl bg-gradient-to-b from-[rgba(20,22,40,0.88)] to-[rgba(8,10,22,0.94)] backdrop-blur-md',
          padded ? 'p-5 md:p-6' : '',
        ].join(' ')}
      >
        {children}
      </div>
    </motion.div>
  );
}
