'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  /** Small mono eyebrow, e.g. `> ./projects`. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.1, ease: [1, 0, 0, 1] }}
      className={[isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl', className].join(' ')}
    >
      {eyebrow && (
        <p
          className={[
            'term-label uppercase tracking-[0.2em] text-[#4caf50]',
            isCenter ? 'mx-auto' : '',
          ].join(' ')}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={[
          'mt-2 font-bold leading-snug text-[12px] text-[#00ff41]',
          isCenter ? 'mx-auto' : '',
        ].join(' ')}
      >
        {title}
      </h2>
      {description && (
        <p
          className={[
            'mt-3 text-[10px] leading-[2em] text-[#e8f5e9]/80',
            isCenter ? 'mx-auto' : '',
          ].join(' ')}
        >
          {description}
        </p>
      )}
      <div
        className={[
          'mt-4 h-0.5 w-24 bg-gradient-to-r',
          isCenter
            ? 'mx-auto from-transparent via-[#00ff41] to-transparent'
            : 'from-[#00ff41] via-[#00e5ff] to-transparent',
        ].join(' ')}
      />
    </motion.div>
  );
}
