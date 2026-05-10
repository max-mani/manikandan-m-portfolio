'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  AVATAR_CHAOS_CLICK_GAP_MS,
  estimateAvatarChaosDurationMs,
  runAvatarChaosSequence,
} from '@/lib/avatarChaos';

interface AnimeBotAvatarProps {
  size?: number;
  /** `portrait` uses `/images/anime-bot.png` (pixel profile); `mark` is a compact monogram placeholder. */
  variant?: 'portrait' | 'mark';
  /** Show the rotating ring + halo. Defaults to true. */
  withHalo?: boolean;
  /** Adds a subtle floating animation. Defaults to false. */
  floating?: boolean;
  className?: string;
  alt?: string;
  priority?: boolean;
  /** 5 rapid clicks → chaos + toasts (Phase 3). Use with `onNonChaosClick` for normal tap behavior. */
  chaosClicks?: boolean;
  /** Fired on each click until the 5th chaos trigger (e.g. scroll to #home). */
  onNonChaosClick?: () => void;
}

export function AnimeBotAvatar({
  size = 48,
  variant = 'portrait',
  withHalo = true,
  floating = false,
  className = '',
  alt,
  priority,
  chaosClicks = false,
  onNonChaosClick,
}: AnimeBotAvatarProps) {
  const resolvedAlt =
    alt ??
    (variant === 'mark'
      ? 'Manikandan M — brand mark'
      : 'Manikandan M — pixel art profile photo');
  const clickCountRef = useRef(0);
  const lastClickRef = useRef(0);
  const chaosRunningRef = useRef(false);
  const [portraitFailed, setPortraitFailed] = useState(false);

  const onChaosPointerUp = useCallback(() => {
    if (typeof document === 'undefined') return;

    const now = Date.now();
    if (now - lastClickRef.current > AVATAR_CHAOS_CLICK_GAP_MS) {
      clickCountRef.current = 0;
    }
    lastClickRef.current = now;
    clickCountRef.current += 1;

    if (chaosRunningRef.current) return;

    if (clickCountRef.current < 5) {
      onNonChaosClick?.();
      return;
    }

    chaosRunningRef.current = true;
    clickCountRef.current = 0;
    const chaosMs = estimateAvatarChaosDurationMs();

    runAvatarChaosSequence();
    window.setTimeout(() => {
      chaosRunningRef.current = false;
    }, chaosMs);
  }, [onNonChaosClick]);

  const inner = (
    <motion.div
      animate={floating ? { y: [0, -4, 0] } : undefined}
      transition={
        floating ? { duration: 5, repeat: Infinity, ease: 'linear' } : undefined
      }
      className={['relative inline-block', className].join(' ')}
      style={{ width: size, height: size }}
    >
      {withHalo && (
        <>
          <span
            aria-hidden
            className="absolute inset-[-10%] opacity-80"
            style={{
              background:
                'radial-gradient(circle, rgba(0,255,65,0.35) 0%, rgba(0,229,255,0.2) 50%, transparent 70%)',
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 border-2 border-[#00e5ff]/50 animate-spin-slow bg-transparent"
            style={{ boxShadow: 'inset 0 0 8px rgba(0,229,255,0.25)' }}
          />
        </>
      )}
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden border-2 border-[#00ff41] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41]">
        {variant === 'mark' || portraitFailed ? (
          <span
            aria-hidden
            className="select-none font-bold leading-none tracking-tight text-[#00ff41]"
            style={{
              fontSize: Math.max(12, Math.round(size * 0.52)),
              textShadow: '2px 2px 0 #050a05',
            }}
          >
            M
          </span>
        ) : (
          <Image
            src="/images/anime-bot.png"
            alt={resolvedAlt}
            fill
            sizes={`${size}px`}
            className="object-cover [image-rendering:pixelated]"
            priority={priority}
            onError={() => setPortraitFailed(true)}
          />
        )}
      </span>
    </motion.div>
  );

  if (chaosClicks) {
    return (
      <button
        type="button"
        data-chaos-trigger
        onClick={onChaosPointerUp}
        className="inline-block border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        aria-label="Manikandan M — profile (tap for home, five fast clicks for chaos)"
      >
        {inner}
      </button>
    );
  }

  return inner;
}
