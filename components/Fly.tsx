'use client';

import React, { useEffect, useRef } from 'react';
import { collectCorruptibleTargets, corruptElement } from '@/lib/flyCorruption';
import { showToast } from '@/lib/toastStore';
import { incCorruption } from '@/lib/sysStatusStore';

const FLY_SIZE = 28;
const ROAM_LERP = 0.006;
const APPROACH_LERP = 0.025;
const FLOOR_MS = 6000;
const CEIL_MS = 10000;
const SIT_MIN_MS = 2000;
const SIT_MAX_MS = 4000;
const LAND_DIST = 28;
const CORNER_IDLE_MIN_MS = 2200;
const CORNER_IDLE_MAX_MS = 3600;

type Phase = 'roam' | 'approach' | 'sit' | 'cornerSit';

type FlyProps = { flyId: 'fly_01' | 'fly_02' };

function randRange(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

function pickNextLandMs(): number {
  return randRange(FLOOR_MS, CEIL_MS);
}

export function Fly({ flyId }: FlyProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    x: typeof window !== 'undefined' ? Math.random() * (window.innerWidth - FLY_SIZE) : 40,
    y: typeof window !== 'undefined' ? Math.random() * (window.innerHeight - FLY_SIZE) : 40,
  });
  const wanderTargetRef = useRef<{ x: number; y: number } | null>(null);
  const phaseRef = useRef<Phase>('roam');
  const targetElRef = useRef<HTMLElement | null>(null);
  const cachedTargetsRef = useRef<HTMLElement[]>([]);
  const nextTargetRefreshAtRef = useRef(0);
  const nextLandAtRef = useRef(0);
  const sitUntilRef = useRef(0);
  const rafRef = useRef(0);

  const setRandomCorner = (w: number, h: number) => {
    const corner = Math.floor(Math.random() * 4);
    const pad = 8;
    if (corner === 0) {
      posRef.current.x = pad;
      posRef.current.y = pad;
    } else if (corner === 1) {
      posRef.current.x = Math.max(pad, w - FLY_SIZE - pad);
      posRef.current.y = pad;
    } else if (corner === 2) {
      posRef.current.x = pad;
      posRef.current.y = Math.max(pad, h - FLY_SIZE - pad);
    } else {
      posRef.current.x = Math.max(pad, w - FLY_SIZE - pad);
      posRef.current.y = Math.max(pad, h - FLY_SIZE - pad);
    }
  };

  const pickWanderTarget = (w: number, h: number) => {
    const pad = 20;
    wanderTargetRef.current = {
      x: randRange(pad, Math.max(pad, w - FLY_SIZE - pad)),
      y: randRange(pad, Math.max(pad, h - FLY_SIZE - pad)),
    };
  };

  const refreshTargetsIfNeeded = (now: number, force = false): HTMLElement[] => {
    if (force || now >= nextTargetRefreshAtRef.current) {
      cachedTargetsRef.current = collectCorruptibleTargets();
      nextTargetRefreshAtRef.current = now + randRange(450, 900);
    }
    return cachedTargetsRef.current;
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let running = true;
    const { innerWidth: initialW, innerHeight: initialH } = window;
    setRandomCorner(initialW, initialH);
    phaseRef.current = 'cornerSit';
    sitUntilRef.current = performance.now() + randRange(CORNER_IDLE_MIN_MS, CORNER_IDLE_MAX_MS);
    nextLandAtRef.current = performance.now() + pickNextLandMs();

    const tick = (now: number) => {
      if (!running) return;

      const { innerWidth: W, innerHeight: H } = window;
      const pos = posRef.current;
      const phase = phaseRef.current;

      if (phase === 'roam') {
        const visibleTargets = refreshTargetsIfNeeded(now);
        if (visibleTargets.length === 0) {
          setRandomCorner(W, H);
          phaseRef.current = 'cornerSit';
          sitUntilRef.current = now + randRange(CORNER_IDLE_MIN_MS, CORNER_IDLE_MAX_MS);
          targetElRef.current = null;
          wanderTargetRef.current = null;
          el.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        const wander = wanderTargetRef.current;
        if (!wander) {
          pickWanderTarget(W, H);
        } else {
          const dx = wander.x - pos.x;
          const dy = wander.y - pos.y;
          pos.x += dx * ROAM_LERP;
          pos.y += dy * ROAM_LERP;
          if (Math.hypot(dx, dy) < 28) {
            pickWanderTarget(W, H);
          }
        }
        pos.x = Math.max(0, Math.min(W - FLY_SIZE, pos.x));
        pos.y = Math.max(0, Math.min(H - FLY_SIZE, pos.y));

        if (now >= nextLandAtRef.current) {
          const pick = visibleTargets[Math.floor(Math.random() * visibleTargets.length)];
          targetElRef.current = pick;
          phaseRef.current = 'approach';
          nextTargetRefreshAtRef.current = 0;
        }
      } else if (phase === 'approach') {
        const tgt = targetElRef.current;
        if (!tgt || !document.contains(tgt)) {
          phaseRef.current = 'roam';
          targetElRef.current = null;
          nextLandAtRef.current = now + pickNextLandMs();
        } else {
          const r = tgt.getBoundingClientRect();
          const inView =
            r.bottom > 0 && r.right > 0 && r.top < H && r.left < W && r.width > 0 && r.height > 0;
          if (!inView) {
            targetElRef.current = null;
            phaseRef.current = 'roam';
            nextLandAtRef.current = now + pickNextLandMs();
          } else {
            const cx = r.left + r.width / 2 - FLY_SIZE / 2;
            const cy = r.top + r.height / 2 - FLY_SIZE / 2;
            const dx = cx - pos.x;
            const dy = cy - pos.y;
            const dist = Math.hypot(dx, dy);
            if (dist < LAND_DIST) {
              const preview = corruptElement(tgt);
              if (preview) {
                const original = tgt.dataset.original ?? '';
                showToast(
                  `🪰 ${flyId} corrupted "${preview}${original.length > 18 ? '...' : ''}"`,
                  'corrupt',
                );
                incCorruption();
              }
              phaseRef.current = 'sit';
              sitUntilRef.current = now + randRange(SIT_MIN_MS, SIT_MAX_MS);
            } else {
              pos.x += dx * APPROACH_LERP;
              pos.y += dy * APPROACH_LERP;
              pos.x = Math.max(0, Math.min(W - FLY_SIZE, pos.x));
              pos.y = Math.max(0, Math.min(H - FLY_SIZE, pos.y));
            }
          }
        }
      } else if (phase === 'sit') {
        const tgt = targetElRef.current;
        if (tgt && document.contains(tgt)) {
          const r = tgt.getBoundingClientRect();
          pos.x = r.left + r.width / 2 - FLY_SIZE / 2;
          pos.y = r.top + r.height / 2 - FLY_SIZE / 2;
        }
        if (now >= sitUntilRef.current) {
          setRandomCorner(W, H);
          phaseRef.current = 'cornerSit';
          targetElRef.current = null;
          nextLandAtRef.current = now + pickNextLandMs();
          sitUntilRef.current = now + randRange(CORNER_IDLE_MIN_MS, CORNER_IDLE_MAX_MS);
        }
      } else if (phase === 'cornerSit') {
        if (now >= sitUntilRef.current) {
          const visibleTargets = refreshTargetsIfNeeded(now, true);
          if (visibleTargets.length === 0) {
            sitUntilRef.current = now + randRange(CORNER_IDLE_MIN_MS, CORNER_IDLE_MAX_MS);
          } else {
            phaseRef.current = 'roam';
            nextLandAtRef.current = now + pickNextLandMs();
            pickWanderTarget(W, H);
          }
        }
      }

      el.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [flyId]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-[1000] flex items-center justify-center select-none"
      style={{ width: FLY_SIZE, height: FLY_SIZE, willChange: 'transform', fontSize: 22, lineHeight: 1 }}
      aria-hidden
    >
      🪰
    </div>
  );
}
