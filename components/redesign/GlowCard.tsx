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

const borderAccent: Record<Accent, string> = {
  cyan: 'border-[#00e5ff] shadow-[4px_4px_0_0_#00e5ff]',
  violet: 'border-[#00ff41] shadow-[4px_4px_0_0_#00ff41]',
  green: 'border-[#4caf50] shadow-[4px_4px_0_0_#4caf50]',
  magenta: 'border-[#ff00ff] shadow-[4px_4px_0_0_#ff00ff]',
  mixed: 'border-[#1a2e1a] shadow-[4px_4px_0_0_#1a2e1a]',
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
      whileHover={interactive ? { x: -2, y: -2 } : undefined}
      transition={{ duration: 0.1, ease: [1, 0, 0, 1] }}
      className={[
        'relative overflow-hidden border-2 bg-[#0a140a]',
        borderAccent[accent],
        interactive ? 'hover:border-[#00ff41] hover:shadow-[6px_6px_0_0_#00ff41]' : '',
        className,
      ].join(' ')}
    >
      <div
        className={['relative h-full w-full', padded ? 'p-5 md:p-6' : ''].join(' ')}
      >
        {children}
      </div>
    </motion.div>
  );
}
