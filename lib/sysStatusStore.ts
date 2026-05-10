import { create } from 'zustand';

type SysStatusState = {
  corruptions: number;
  patches: number;
  incCorruption: () => void;
  incPatch: () => void;
};

export const useSysStatusStore = create<SysStatusState>((set) => ({
  corruptions: 0,
  patches: 0,
  incCorruption: () => set((s) => ({ corruptions: s.corruptions + 1 })),
  incPatch: () => set((s) => ({ patches: s.patches + 1 })),
}));

export function incCorruption(): void {
  useSysStatusStore.getState().incCorruption();
}

export function incPatch(): void {
  useSysStatusStore.getState().incPatch();
}
