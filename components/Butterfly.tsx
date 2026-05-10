'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { showToast } from '@/lib/toastStore';
import { incPatch } from '@/lib/sysStatusStore';
import { findFirstVisibleCorrupted } from '@/lib/flyCorruption';

const BF_SIZE = 160;
const LERP = 0.05;
const SCAN_MS = 4000;
const ARRIVE_DIST = 30;
const RESTORE_CHAR_MS = 40;
const ROAM_MAX = 1.1;
const HOVER_TOAST_COOLDOWN_MS = 4000;
const CORNER_IDLE_MIN_MS = 2200;
const CORNER_IDLE_MAX_MS = 3800;

export function Butterfly() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.3 : 80,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.2 : 80,
  });
  const velRef = useRef({ vx: 0.4, vy: 0.3 });
  const phaseRef = useRef<'roam' | 'chase'>('roam');
  const chaseTargetRef = useRef<HTMLElement | null>(null);
  const restoreVictimRef = useRef<HTMLElement | null>(null);
  const restoringRef = useRef(false);
  const rafRef = useRef(0);
  const hoverToastAt = useRef(0);
  const cornerHoldUntilRef = useRef(0);

  const [imgBroken, setImgBroken] = useState(false);

  const setRandomCorner = useCallback((w: number, h: number) => {
    const pad = 10;
    const corner = Math.floor(Math.random() * 4);
    if (corner === 0) {
      posRef.current.x = pad;
      posRef.current.y = pad;
    } else if (corner === 1) {
      posRef.current.x = Math.max(pad, w - BF_SIZE - pad);
      posRef.current.y = pad;
    } else if (corner === 2) {
      posRef.current.x = pad;
      posRef.current.y = Math.max(pad, h - BF_SIZE - pad);
    } else {
      posRef.current.x = Math.max(pad, w - BF_SIZE - pad);
      posRef.current.y = Math.max(pad, h - BF_SIZE - pad);
    }
  }, []);

  const restoreElement = useCallback((el: HTMLElement) => {
    const original = el.dataset.original;
    if (original === undefined || original.length === 0) {
      restoringRef.current = false;
      restoreVictimRef.current = null;
      const w = window.innerWidth;
      const h = window.innerHeight;
      setRandomCorner(w, h);
      cornerHoldUntilRef.current =
        performance.now() + (CORNER_IDLE_MIN_MS + Math.random() * (CORNER_IDLE_MAX_MS - CORNER_IDLE_MIN_MS));
      phaseRef.current = 'roam';
      return;
    }
    const corruptedSnapshot = el.textContent ?? '';
    const savedColor = el.dataset.originalColor ?? '';

    let step = 0;
    const finish = () => {
      el.textContent = original;
      el.style.color = savedColor;
      delete el.dataset.corrupted;
      delete el.dataset.original;
      delete el.dataset.originalColor;
      const preview = original.replace(/\s+/g, ' ').slice(0, 18);
      showToast(
        `🦋 butterfly_1993 restored "${preview}${original.length > 18 ? '...' : ''}"`,
        'fix',
      );
      incPatch();
      restoringRef.current = false;
      restoreVictimRef.current = null;
      phaseRef.current = 'roam';
    };

    const run = () => {
      if (!document.contains(el)) {
        restoringRef.current = false;
        restoreVictimRef.current = null;
        phaseRef.current = 'roam';
        return;
      }

      step += 1;
      if (step > original.length) {
        finish();
        return;
      }

      el.textContent = original.slice(0, step) + corruptedSnapshot.slice(step);
      el.style.color = 'var(--green)';
      window.setTimeout(() => {
        if (document.contains(el) && step < original.length) {
          el.style.color = 'var(--red)';
        }
      }, 22);

      if (step >= original.length) {
        window.setTimeout(() => {
          if (!document.contains(el)) {
            restoringRef.current = false;
            restoreVictimRef.current = null;
            return;
          }
          finish();
        }, RESTORE_CHAR_MS);
        return;
      }

      window.setTimeout(run, RESTORE_CHAR_MS);
    };

    run();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onPointerEnter = () => {
      const now = Date.now();
      if (now - hoverToastAt.current < HOVER_TOAST_COOLDOWN_MS) return;
      hoverToastAt.current = now;
      showToast('🦋 Butterfly Virus — 1993 | "Some of us remember."', 'sys');
    };
    el.addEventListener('pointerenter', onPointerEnter);

    const scanId = window.setInterval(() => {
      if (restoringRef.current) return;
      if (phaseRef.current === 'chase') return;
      const victim = findFirstVisibleCorrupted();
      if (victim) {
        chaseTargetRef.current = victim;
        phaseRef.current = 'chase';
      }
    }, SCAN_MS);

    let running = true;

    const tick = () => {
      if (!running) return;
      const root = wrapRef.current;
      if (!root) return;

      const pos = posRef.current;
      const vel = velRef.current;
      const W = window.innerWidth;
      const H = window.innerHeight;

      if (restoringRef.current) {
        const vic = restoreVictimRef.current;
        if (vic && document.contains(vic)) {
          const r = vic.getBoundingClientRect();
          pos.x = r.left + r.width / 2 - BF_SIZE / 2;
          pos.y = r.top + r.height / 2 - BF_SIZE / 2;
        }
      } else if (phaseRef.current === 'chase') {
        const tgt = chaseTargetRef.current;
        if (!tgt || !document.contains(tgt) || tgt.dataset.corrupted !== 'true') {
          phaseRef.current = 'roam';
          chaseTargetRef.current = null;
        } else {
          const r = tgt.getBoundingClientRect();
          const cx = r.left + r.width / 2 - BF_SIZE / 2;
          const cy = r.top + r.height / 2 - BF_SIZE / 2;
          pos.x += (cx - pos.x) * LERP;
          pos.y += (cy - pos.y) * LERP;
          const dist = Math.hypot(cx - pos.x, cy - pos.y);
          if (dist <= ARRIVE_DIST) {
            restoringRef.current = true;
            restoreVictimRef.current = tgt;
            chaseTargetRef.current = null;
            phaseRef.current = 'roam';
            pos.x = cx;
            pos.y = cy;
            restoreElement(tgt);
          }
        }
      } else if (phaseRef.current === 'roam') {
        if (performance.now() < cornerHoldUntilRef.current) {
          vel.vx = 0;
          vel.vy = 0;
          root.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        vel.vx += (Math.random() - 0.5) * 0.08;
        vel.vy += (Math.random() - 0.5) * 0.08;
        const sp = Math.hypot(vel.vx, vel.vy);
        if (sp > ROAM_MAX) {
          vel.vx = (vel.vx / sp) * ROAM_MAX;
          vel.vy = (vel.vy / sp) * ROAM_MAX;
        }
        pos.x += vel.vx;
        pos.y += vel.vy;
        if (pos.x < 0) {
          pos.x = 0;
          vel.vx *= -1;
        }
        if (pos.x > W - BF_SIZE) {
          pos.x = W - BF_SIZE;
          vel.vx *= -1;
        }
        if (pos.y < 0) {
          pos.y = 0;
          vel.vy *= -1;
        }
        if (pos.y > H - BF_SIZE) {
          pos.y = H - BF_SIZE;
          vel.vy *= -1;
        }
      }

      root.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      window.clearInterval(scanId);
      el.removeEventListener('pointerenter', onPointerEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [restoreElement]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-auto fixed left-0 top-0 z-[1000] cursor-none"
      style={{ width: BF_SIZE, height: BF_SIZE, willChange: 'transform' }}
      aria-hidden
    >
      {imgBroken ? (
        <div
          className="h-[50px] w-[50px] border-2 border-[#00e5ff] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff]"
          aria-hidden
        />
      ) : (
        <img
          src="/sprites/butterfly.gif"
          alt=""
          width={BF_SIZE}
          height={BF_SIZE}
          className="block select-none"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
          onError={() => setImgBroken(true)}
        />
      )}
    </div>
  );
}
