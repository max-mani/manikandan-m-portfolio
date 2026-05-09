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

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push(message, type) {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    set({ toasts: [...get().toasts, { id, message, type }] });
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
