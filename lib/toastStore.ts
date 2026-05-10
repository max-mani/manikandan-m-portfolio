import { create } from 'zustand';

export type ToastType = 'corrupt' | 'fix' | 'warn' | 'sys' | 'ok';

export type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastState = {
  toasts: ToastItem[];
  push: (message: string, type: ToastType) => string;
  dismiss: (id: string) => void;
};

export const TOAST_PREFIX: Record<ToastType, string> = {
  corrupt: '[ALERT]',
  fix: '[PATCH]',
  warn: '[WARN]',
  sys: '[SYS]',
  ok: '[OK]',
};

/** Each toast row stays visible for this long (chaos + fly copy use the same stack). */
export const TOAST_AUTO_DISMISS_MS = 3000;
const TOAST_STACK_LIMIT = 6;
const TOAST_DEDUP_WINDOW_MS = 450;

let lastToastKey = '';
let lastToastAt = 0;
let lastToastId = '';

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push(message, type) {
    const now = Date.now();
    const toastKey = `${type}:${message}`;
    if (toastKey === lastToastKey && now - lastToastAt < TOAST_DEDUP_WINDOW_MS) {
      return lastToastId;
    }

    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const next = [...get().toasts, { id, message, type }];
    set({ toasts: next.slice(-TOAST_STACK_LIMIT) });
    lastToastKey = toastKey;
    lastToastAt = now;
    lastToastId = id;
    return id;
  },
  dismiss(id) {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));

/** Imperative API for client components / chaos mode (no hook required). */
export function showToast(message: string, type: ToastType): string {
  return useToastStore.getState().push(message, type);
}

export function dismissToast(id: string): void {
  useToastStore.getState().dismiss(id);
}
