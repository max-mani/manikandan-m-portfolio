'use client';

import React from 'react';

export function ScanLine() {
  return (
    <div
      className="fixed left-0 right-0 h-0.5 pointer-events-none z-[9997]"
      style={{
        top: 0,
        background: 'rgba(0, 255, 65, 0.07)',
        animation: 'scanMove 8s linear infinite',
      }}
      aria-hidden
    />
  );
}
