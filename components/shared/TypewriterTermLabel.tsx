'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypewriterTermLabelProps {
  text: string;
  className?: string;
  charMs?: number;
}

export function TypewriterTermLabel({
  text,
  className = '',
  charMs = 35,
}: TypewriterTermLabelProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [visible, setVisible] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    if (text.length === 0) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= text.length) window.clearInterval(id);
    }, charMs);

    return () => window.clearInterval(id);
  }, [inView, text, charMs]);

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.08, ease: [1, 0, 0, 1] }}
    >
      {text.slice(0, visible)}
      {inView && visible < text.length && (
        <span className="animate-blink" aria-hidden>
          _
        </span>
      )}
    </motion.p>
  );
}
