'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function HeroHoldingIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(sy, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-9deg', '9deg']);
  const translateX = useTransform(sx, [-0.5, 0.5], ['-8px', '8px']);
  const translateY = useTransform(sy, [-0.5, 0.5], ['-8px', '8px']);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[680px] mx-auto"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <span
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-full blur-3xl opacity-70"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(0,229,255,0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(168,85,247,0.45), transparent 55%)',
        }}
      />

      <motion.div
        style={{ rotateX, rotateY, translateX, translateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-3xl overflow-hidden scanline-overlay neon-border-violet animate-pulse-glow"
      >
        <Image
          src="/images/hero-holding.png"
          alt="Manikandan holding Development and Cybersecurity together"
          width={1280}
          height={853}
          priority
          className="w-full h-auto block"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(5,6,10,0.35)]"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:flex absolute -left-6 top-1/3 z-20 items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-400/40"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#00e5ff]" />
        <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.25em] text-cyan-300">
          DEV.LEFT
        </span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden md:flex absolute -right-6 bottom-1/3 z-20 items-center gap-2 px-3 py-1.5 rounded-full glass border border-fuchsia-400/40"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#a855f7]" />
        <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.25em] text-fuchsia-300">
          SEC.RIGHT
        </span>
      </motion.div>
    </motion.div>
  );
}
