'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/** Hero “holding” illustration is `loop.mp4` only — no separate poster image. */
const HERO_VIDEO_LABEL =
  'Manikandan holding Development and Cybersecurity together — looping hero video';

export function HeroHoldingIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const [posterFailed, setPosterFailed] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 200, damping: 28 });
  const sy = useSpring(y, { stiffness: 200, damping: 28 });

  const rotateX = useTransform(sy, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-5deg', '5deg']);
  const translateX = useTransform(sx, [-0.5, 0.5], ['-4px', '4px']);
  const translateY = useTransform(sy, [-0.5, 0.5], ['-4px', '4px']);

  useEffect(() => {
    const v = videoRef.current;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    if (!v) {
      const onPrefChange = () => setReducedMotion(mq.matches);
      mq.addEventListener('change', onPrefChange);
      return () => mq.removeEventListener('change', onPrefChange);
    }

    const syncPlayback = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) v.pause();
      else void v.play().catch(() => {});
    };

    syncPlayback();
    mq.addEventListener('change', syncPlayback);
    return () => mq.removeEventListener('change', syncPlayback);
  }, []);

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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [1, 0, 0, 1] }}
    >
      <span
        aria-hidden
        className="absolute -inset-10 -z-10 opacity-60 max-md:hidden"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(0,255,65,0.2), transparent 55%), radial-gradient(circle at 70% 70%, rgba(0,229,255,0.12), transparent 55%)',
        }}
      />

      <motion.div
        style={{ rotateX, rotateY, translateX, translateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden scanline-overlay border-2 border-[#00ff41] shadow-[4px_4px_0_0_#00ff41] aspect-[1280/853] w-full bg-[#050a05]"
      >
        {videoFailed || reducedMotion ? (
          posterFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-[#0a140a] text-[10px] text-[#00e5ff]">
              [ HERO VISUAL OFFLINE ]
            </div>
          ) : (
            <Image
              src="/images/hero-holding.png"
              alt="Manikandan holding Development and Cybersecurity together — pixel art still"
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-contain [image-rendering:pixelated]"
              onError={() => setPosterFailed(true)}
              priority
            />
          )
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-contain block [image-rendering:pixelated] [image-rendering:crisp-edges]"
            src="/images/loop.mp4"
            muted
            loop
            playsInline
            preload="auto"
            aria-label={HERO_VIDEO_LABEL}
            onError={() => setVideoFailed(true)}
          />
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050a05]/40"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="hidden md:flex absolute -left-4 top-1/3 z-20 items-center gap-2 px-2 py-1 pixel-border-dim bg-[#0a140a]"
      >
        <span className="h-2 w-2 bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
        <span className="text-[8px] tracking-[0.25em] text-[#00e5ff] uppercase">DEV.LEFT</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        className="hidden md:flex absolute -right-4 bottom-1/3 z-20 items-center gap-2 px-2 py-1 pixel-border-dim bg-[#0a140a]"
      >
        <span className="h-2 w-2 bg-[#ff3d00] shadow-[0_0_8px_#ff3d00]" />
        <span className="text-[8px] tracking-[0.25em] text-[#ffb300] uppercase">SEC.RIGHT</span>
      </motion.div>
    </motion.div>
  );
}
