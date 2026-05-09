'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnimeBotAvatarProps {
  size?: number;
  /** Show the rotating ring + halo. Defaults to true. */
  withHalo?: boolean;
  /** Adds a subtle floating animation. Defaults to false. */
  floating?: boolean;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export function AnimeBotAvatar({
  size = 48,
  withHalo = true,
  floating = false,
  className = '',
  alt = 'Manikandan M cyber-anime mascot',
  priority,
}: AnimeBotAvatarProps) {
  return (
    <motion.div
      animate={floating ? { y: [0, -6, 0] } : undefined}
      transition={floating ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
      className={['relative inline-block', className].join(' ')}
      style={{ width: size, height: size }}
    >
      {withHalo && (
        <>
          <span
            aria-hidden
            className="absolute inset-[-12%] rounded-full blur-xl"
            style={{
              background:
                'radial-gradient(circle, rgba(0,229,255,0.45) 0%, rgba(168,85,247,0.4) 50%, transparent 70%)',
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-cyan-400/40 animate-spin-slow"
            style={{ boxShadow: 'inset 0 0 16px rgba(0,229,255,0.35)' }}
          />
        </>
      )}
      <span className="relative block w-full h-full rounded-full overflow-hidden ring-1 ring-fuchsia-400/40">
        <Image
          src="/images/anime-bot.png"
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority={priority}
        />
      </span>
    </motion.div>
  );
}
