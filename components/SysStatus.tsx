'use client';

import React from 'react';
import { useSysStatusStore } from '@/lib/sysStatusStore';

export function SysStatus() {
  const corruptions = useSysStatusStore((s) => s.corruptions);
  const patches = useSysStatusStore((s) => s.patches);
  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 z-[9998] max-w-[calc(100vw-2rem)] font-mono text-[8px] leading-[2em] text-[#4caf50]"
      aria-live="polite"
    >
      <span className="text-[#00e5ff]">{'[SYS]'}</span> fly_01 • fly_02 • butterfly_1993{' '}
      <span className="text-[#4caf50]">|</span> corruptions: {corruptions} <span className="text-[#4caf50]">|</span>{' '}
      patches: {patches}
    </div>
  );
}
