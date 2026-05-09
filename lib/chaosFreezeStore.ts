import { create } from 'zustand';

/**
 * During chaos we replace the live Navbar / main / footer React subtrees with a
 * static HTML snapshot so imperative DOM edits (character splitting) cannot break
 * React reconciliation.
 */

type ChaosFreezeStore = {
  frozenHomeMarkup: string | null;
  setFrozenHomeMarkup: (html: string | null) => void;
};

export const useChaosFreezeStore = create<ChaosFreezeStore>((set) => ({
  frozenHomeMarkup: null,
  setFrozenHomeMarkup: (html) => set({ frozenHomeMarkup: html }),
}));
