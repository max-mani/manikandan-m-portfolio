import { flushChaosTransforms } from '@/lib/chaosMotion';
import {
  CHAOS_MATTER_PHYS_HARD_CAP_MS,
  CHAOS_MATTER_RETURN_SECONDS,
  animateSnapshotsReturn,
  runMatterFallThenInteractive,
} from '@/lib/chaosMatterPhysics';
import { captureHomeChaosMarkup } from '@/lib/captureHomeChaosMarkup';
import { useChaosFreezeStore } from '@/lib/chaosFreezeStore';
import { prepareChaosFallTargets } from '@/lib/prepareChaosFallTargets';
import { showToast } from '@/lib/toastStore';
import { flushSync } from 'react-dom';

export const AVATAR_CHAOS_CLICK_GAP_MS = 2000;

/** Full `#000` overlay (toasts stay above via z-index). */
const BLACK_SCREEN_MS = 1000;

/** Matter `MouseConstraint` play window after the pile settles. */
const INTERACTIVE_PHASE_MS = 6000;

const END_BUFFER_MS = 1100;

/**
 * Chaos lockout: two black beats + physics cap + drag phase + Motion return + buffer.
 */
export function estimateAvatarChaosDurationMs(): number {
  return (
    BLACK_SCREEN_MS +
    CHAOS_MATTER_PHYS_HARD_CAP_MS +
    INTERACTIVE_PHASE_MS +
    BLACK_SCREEN_MS +
    Math.ceil(CHAOS_MATTER_RETURN_SECONDS * 1000) +
    END_BUFFER_MS
  );
}

export const AVATAR_CHAOS_TOTAL_MS = estimateAvatarChaosDurationMs();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function paintFrames(n: number) {
  for (let i = 0; i < n; i++) {
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
  }
}

function setBlackScreen(on: boolean) {
  document.body.classList.toggle('chaos-black-screen', on);
}

async function blackScreenHoldToast(
  toastMessage: Parameters<typeof showToast>[0],
  toastType: Parameters<typeof showToast>[1],
) {
  showToast(toastMessage, toastType);
  setBlackScreen(true);
  await sleep(BLACK_SCREEN_MS);
  setBlackScreen(false);
}

function primeChaosFrozenVideos(doc: Document): void {
  const host = doc.querySelector('[data-chaos-frozen-home]');
  if (!host) return;
  host.querySelectorAll('video').forEach((node) => {
    if (!(node instanceof HTMLVideoElement)) return;
    node.muted = true;
    try {
      node.playsInline = true;
      void node.play().catch(() => {});
    } catch {
      /* ignore */
    }
  });
}

async function orchestrate(): Promise<void> {
  const doc = document;
  let thawed = false;
  let cleanupSplits: (() => void) | null = null;

  const thaw = () => {
    if (thawed) return;
    thawed = true;
    setBlackScreen(false);
    document.body.classList.remove('chaos-phase-dwell');
    flushSync(() => {
      useChaosFreezeStore.getState().setFrozenHomeMarkup(null);
    });
  };

  try {
    const markup = captureHomeChaosMarkup(doc);
    if (!markup.trim()) {
      showToast('Nothing to shake. Weird.', 'warn');
      return;
    }

    flushSync(() => {
      useChaosFreezeStore.getState().setFrozenHomeMarkup(markup);
    });

    await new Promise<void>((r) => queueMicrotask(r));
    await paintFrames(2);

    await blackScreenHoldToast(
      'Too many clicks. Destabilizing...',
      'warn',
    );

    primeChaosFrozenVideos(doc);

    const { elements: elsRaw, cleanup } = prepareChaosFallTargets(doc);
    cleanupSplits = cleanup;
    const els = [...elsRaw];

    flushChaosTransforms(els);

    if (els.length === 0) {
      showToast('Nothing to shake. Weird.', 'warn');
      return;
    }

    const snaps = await runMatterFallThenInteractive({
      elements: els,
      interactivePhaseMs: INTERACTIVE_PHASE_MS,
      onFallSettled: () => {
        showToast('Text gravity failure. Catching...', 'warn');
      },
    });

    await blackScreenHoldToast('MAXIM_OS: Running recovery...', 'sys');

    await animateSnapshotsReturn(snaps);

    showToast("System stable. Don't do that again.", 'ok');

    flushChaosTransforms(els);
  } catch (err) {
    console.warn('[avatarChaos]', err);
  } finally {
    cleanupSplits?.();
    setBlackScreen(false);
    thaw();
  }
}

export function runAvatarChaosSequence() {
  if (typeof document === 'undefined') return;
  void orchestrate().catch((err) => {
    console.warn('[avatarChaos]', err);
  });
}
