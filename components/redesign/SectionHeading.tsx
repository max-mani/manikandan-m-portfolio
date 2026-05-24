'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HEADING_MOTION } from '@/lib/pixelMotion';
import { TypewriterTermLabel } from '@/components/shared/TypewriterTermLabel';

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
      {...HEADING_MOTION}
      className={[isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl', className].join(' ')}
    >
      {eyebrow && (
        <TypewriterTermLabel
          text={eyebrow}
          className={[
            'term-label uppercase tracking-[0.2em] text-[#4caf50]',
            isCenter ? 'mx-auto' : '',
          ].join(' ')}
        />
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
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.12, ease: [1, 0, 0, 1], delay: 0.05 }}
        className={[
          'mt-4 h-0.5 w-24 bg-gradient-to-r origin-left',
          isCenter
            ? 'mx-auto from-transparent via-[#00ff41] to-transparent'
            : 'from-[#00ff41] via-[#00e5ff] to-transparent',
        ].join(' ')}
      />
    </motion.div>
  );
}
