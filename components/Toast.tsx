'use client';

import React, { useEffect } from 'react';
import type { ToastItem, ToastType } from '@/lib/toastStore';
import { TOAST_AUTO_DISMISS_MS, TOAST_PREFIX, dismissToast } from '@/lib/toastStore';

const TYPE_CLASS: Record<ToastType, string> = {
  corrupt: 'border-[var(--red)] text-[var(--red)]',
  fix: 'border-[var(--green)] text-[var(--green)]',
  warn: 'border-[var(--amber)] text-[var(--amber)]',
  sys: 'border-[var(--cyan)] text-[var(--cyan)]',
  ok: 'border-[var(--green)] text-[var(--green)]',
};

export function ToastRow({ toast }: { toast: ToastItem }) {
  useEffect(() => {
    const t = setTimeout(() => dismissToast(toast.id), TOAST_AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [toast.id]);

  return (
    <div
      role="status"
      className={[
        'toast',
        'bg-[var(--surface)] shadow-[4px_4px_0_0_var(--border)]',
        TYPE_CLASS[toast.type],
      ].join(' ')}
    >
      <span className="block text-[7px] leading-[1.8em]">
        <span className="opacity-90">{TOAST_PREFIX[toast.type]}</span>{' '}
        {toast.message}
      </span>
    </div>
  );
}
