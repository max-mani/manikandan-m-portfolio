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
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={[isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl', className].join(' ')}
    >
      {eyebrow && (
        <p
          className={[
            'font-[family-name:var(--font-share-tech-mono)] text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-400/80',
            isCenter ? 'mx-auto' : '',
          ].join(' ')}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={[
          'mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold leading-tight',
          'text-gradient-cyber',
        ].join(' ')}
      >
        {title}
      </h2>
      {description && (
        <p
          className={[
            'mt-4 text-base md:text-lg text-white/70 font-[family-name:var(--font-body)]',
            isCenter ? 'mx-auto' : '',
          ].join(' ')}
        >
          {description}
        </p>
      )}
      <div
        className={[
          'mt-5 h-px w-32 bg-gradient-to-r',
          isCenter ? 'mx-auto from-transparent via-cyan-400 to-transparent' : 'from-cyan-400 via-fuchsia-400 to-transparent',
        ].join(' ')}
      />
    </motion.div>
  );
}
