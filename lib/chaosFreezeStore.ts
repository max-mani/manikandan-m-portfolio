import { create } from 'zustand';

type ChaosFreezeStore = {
  chaosActive: boolean;
  setChaosActive: (active: boolean) => void;
};

export const useChaosFreezeStore = create<ChaosFreezeStore>((set) => ({
  chaosActive: false,
  setChaosActive: (active) => set({ chaosActive: active }),
}));
