import {
  CHAOS_GLITCH_MS,
  CHAOS_MOTION_RISE_MS,
  CHAOS_SLOW_FALL_MS,
  buildDistributedRiseOrigins,
  flushChaosTransforms,
  playChaosFallOne,
  playChaosGlitchShake,
  playChaosRise,
  type ChaosAnimTiming,
} from '@/lib/chaosMotion';
import { captureHomeChaosMarkup } from '@/lib/captureHomeChaosMarkup';
import { useChaosFreezeStore } from '@/lib/chaosFreezeStore';
import { prepareChaosFallTargets } from '@/lib/prepareChaosFallTargets';
import { showToast } from '@/lib/toastStore';
import { flushSync } from 'react-dom';

export const AVATAR_CHAOS_CLICK_GAP_MS = 2000;

/** Panes shaken + dropped together per wave (multi-element parallel). */
const WAVE_SIZE = 4;

const WAVE_GAP_MS = 160;

/** Shared Motion scale applied to glitch + gap + fall (after glitchScale multiplier on shake). */
const FALL_DURATION_SCALE = 0.58;

const FALL_GLITCH_SCALE = 1.92;

const VIBE_TO_FALL_GAP_MS_BASE = 45;

const GAP_AFTER_FALL_MS = 120;

/** Blank viewport (bg + HUD lines only); ms */
const HELD_DWELL_MS = 1000;

const END_BUFFER_MS = 880;

/** Random permutation — indexes into `els`. */
function shuffleIndices(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/** After static snapshot inject, restart hero <video> (otherwise poster frame shows). */
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

/**
 * Avatar cooldown length from pane/wave breakdown.
 * @param paneCount from `estimateChaosPaneCount(document)` when available.
 */
export function estimateAvatarChaosDurationMs(paneCount?: number): number {
  const n = Math.max(1, paneCount ?? 14);
  const waves = Math.max(1, Math.ceil(n / WAVE_SIZE));

  const glitchPart = CHAOS_GLITCH_MS * FALL_DURATION_SCALE * FALL_GLITCH_SCALE;
  const gapPart = VIBE_TO_FALL_GAP_MS_BASE * FALL_DURATION_SCALE;
  const fallPart = CHAOS_SLOW_FALL_MS * FALL_DURATION_SCALE;
  const perWave = glitchPart + gapPart + fallPart;

  return (
    Math.ceil(waves * perWave + (waves - 1) * WAVE_GAP_MS) +
    GAP_AFTER_FALL_MS +
    HELD_DWELL_MS +
    CHAOS_MOTION_RISE_MS +
    END_BUFFER_MS
  );
}

export const AVATAR_CHAOS_TOTAL_MS = estimateAvatarChaosDurationMs();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForFrozenShellPaint(): Promise<void> {
  await new Promise<void>((r) => queueMicrotask(r));
  await new Promise<void>((r) => requestAnimationFrame(() => r()));
  await new Promise<void>((r) => requestAnimationFrame(() => r()));
}

/**
 * Pane snapshot → grouped parallel shake→fall waves → 1s empty dwell (+ HUD) →
 * simultaneous directional rise → thaw React.
 */
async function orchestrate(): Promise<void> {
  const doc = document;
  let thawed = false;
  let cleanupSplits: (() => void) | null = null;

  const thaw = () => {
    if (thawed) return;
    thawed = true;
    document.body.classList.remove('chaos-phase-dwell');
    flushSync(() => {
      useChaosFreezeStore.getState().setFrozenHomeMarkup(null);
    });
  };

  const timing: ChaosAnimTiming = {
    durationScale: FALL_DURATION_SCALE,
    glitchScale: FALL_GLITCH_SCALE,
  };
  const gapMsBetweenShakeAndFall = Math.max(
    22,
    VIBE_TO_FALL_GAP_MS_BASE * FALL_DURATION_SCALE,
  );

  try {
    const markup = captureHomeChaosMarkup(doc);
    if (!markup.trim()) {
      showToast('Nothing to shake. Weird.', 'warn');
      return;
    }

    flushSync(() => {
      useChaosFreezeStore.getState().setFrozenHomeMarkup(markup);
    });

    await waitForFrozenShellPaint();
    primeChaosFrozenVideos(doc);

    const { elements: elsRaw, cleanup } = prepareChaosFallTargets(doc);
    cleanupSplits = cleanup;
    const els = [...elsRaw];

    flushChaosTransforms(els);

    if (els.length === 0) {
      showToast('Nothing to shake. Weird.', 'warn');
      return;
    }

    const order = shuffleIndices(els.length);
    const seed = Math.random();
    const riseOrigins = buildDistributedRiseOrigins(els.length);

    showToast('Too many clicks. Destabilizing...', 'warn');

    for (let w = 0; w < order.length; w += WAVE_SIZE) {
      const chunk = order.slice(w, w + WAVE_SIZE);
      await Promise.all(
        chunk.map((idx) =>
          (async () => {
            const el = els[idx];
            await playChaosGlitchShake(el, idx, seed, timing);
            await sleep(gapMsBetweenShakeAndFall);
            await playChaosFallOne(el, idx, seed, timing);
          })(),
        ),
      );
      if (w + WAVE_SIZE < order.length) await sleep(WAVE_GAP_MS);
    }

    showToast('Text gravity failure. Catching...', 'warn');

    await sleep(GAP_AFTER_FALL_MS);

    document.body.classList.add('chaos-phase-dwell');

    await sleep(HELD_DWELL_MS);

    document.body.classList.remove('chaos-phase-dwell');

    showToast('MAXIM_OS: Running recovery...', 'sys');

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });

    await playChaosRise(els, riseOrigins);

    flushChaosTransforms(els);
    showToast("System stable. Don't do that again.", 'ok');

    await sleep(120);
  } catch (err) {
    console.warn('[avatarChaos]', err);
  } finally {
    cleanupSplits?.();
    document.body.classList.remove('chaos-phase-dwell');
    thaw();
  }
}

export function runAvatarChaosSequence() {
  if (typeof document === 'undefined') return;
  void orchestrate().catch((err) => {
    console.warn('[avatarChaos]', err);
  });
}
