'use client';

import React, { useEffect, useState } from 'react';
import { Fly } from '@/components/Fly';
import { Butterfly } from '@/components/Butterfly';
import { SysStatus } from '@/components/SysStatus';

function isDesktopCrittersEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && !('ontouchstart' in window);
}

export function DesktopCritters() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isDesktopCrittersEnabled());
    const onResize = () => setEnabled(isDesktopCrittersEnabled());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Fly flyId="fly_01" />
      <Fly flyId="fly_02" />
      <Butterfly />
      <SysStatus />
    </>
  );
}
