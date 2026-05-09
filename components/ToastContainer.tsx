'use client';

import React from 'react';
import { useToastStore } from '@/lib/toastStore';
import { ToastRow } from '@/components/Toast';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div
      data-pixel-toast-stack
      className="pointer-events-none fixed bottom-4 right-4 z-[10000] flex max-w-[min(280px,calc(100vw-2rem))] flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastRow toast={t} />
        </div>
      ))}
    </div>
  );
}
