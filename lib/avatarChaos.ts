import {
  CHAOS_MATTER_PHYS_HARD_CAP_MS,
  CHAOS_MATTER_RETURN_SECONDS,
  animateSnapshotsReturn,
  runMatterFallThenInteractive,
} from '@/lib/chaosMatterPhysics';
import { useChaosFreezeStore } from '@/lib/chaosFreezeStore';
import { prepareChaosFallTargets } from '@/lib/prepareChaosFallTargets';
import { showToast } from '@/lib/toastStore';

export const AVATAR_CHAOS_CLICK_GAP_MS = 2000;

/** Matter `MouseConstraint` play window after the pile settles. */
const INTERACTIVE_PHASE_MS = 0;

const END_BUFFER_MS = 1100;

/**
 * Chaos lockout: physics cap + drag phase + return + buffer.
 */
export function estimateAvatarChaosDurationMs(): number {
  return (
    CHAOS_MATTER_PHYS_HARD_CAP_MS +
    INTERACTIVE_PHASE_MS +
    Math.ceil(CHAOS_MATTER_RETURN_SECONDS * 1000) +
    END_BUFFER_MS
  );
}

export const AVATAR_CHAOS_TOTAL_MS = estimateAvatarChaosDurationMs();

async function orchestrate(): Promise<void> {
  const doc = document;
  let cleanupSplits: (() => void) | null = null;
  let active = false;
  let savedScrollY = 0;
  let bodyTop = '';

  const deactivate = () => {
    if (!active) return;
    active = false;
    document.body.removeAttribute('data-chaos-active');
    useChaosFreezeStore.getState().setChaosActive(false);
  };

  try {
    active = true;
    savedScrollY = window.scrollY || 0;
    doc.getElementById('home')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    document.body.setAttribute('data-chaos-active', 'true');
    document.body.setAttribute('data-chaos-scroll-lock', 'true');
    bodyTop = `-${savedScrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.top = bodyTop;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    useChaosFreezeStore.getState().setChaosActive(true);
    showToast('Too many clicks. Destabilizing...', 'warn');

    const { elements: elsRaw, cleanup } = prepareChaosFallTargets(doc);
    cleanupSplits = cleanup;
    const els = [...elsRaw];

    if (els.length === 0) {
      showToast('Nothing to shake. Weird.', 'warn');
      return;
    }

    const snaps = await runMatterFallThenInteractive({
      elements: els,
      interactivePhaseMs: INTERACTIVE_PHASE_MS,
      onFallSettled: () => {
        showToast('Text hit bottom. Bounce stabilized...', 'warn');
      },
    });

    showToast('MAXIM_OS: Running recovery...', 'sys');

    await animateSnapshotsReturn(snaps);

    showToast("System stable. Don't do that again.", 'ok');
  } catch (err) {
    console.warn('[avatarChaos]', err);
  } finally {
    cleanupSplits?.();
    deactivate();
    // Restore scroll position after chaos cleanup.
    document.body.removeAttribute('data-chaos-scroll-lock');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('left');
    document.body.style.removeProperty('right');
    document.body.style.removeProperty('width');
    window.scrollTo(0, savedScrollY);
  }
}

export function runAvatarChaosSequence() {
  if (typeof document === 'undefined') return;
  void orchestrate().catch((err) => {
    console.warn('[avatarChaos]', err);
  });
}
