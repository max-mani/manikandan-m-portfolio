'use client';

import React, { useEffect, useRef } from 'react';

const COMMAND_SNIPPETS = [
  'nmap -sV target',
  'sqlmap -u "http://?id=1" --batch',
  'python3 exploit.py',
  'gobuster dir -u http://target -w wordlist.txt',
  'ffuf -u https://t/FUZZ -w words.txt',
  'hashcat -m 1000 hashes.txt dict.txt',
  'dig target.com ANY +short',
  'curl -s https://api/ping',
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  text: string;
  fontSizePx: number;
  opacity: number;
};

function hash01(i: number, s: number): number {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function createParticles(w: number, h: number): Particle[] {
  return COMMAND_SNIPPETS.map((text, i) => {
    const fontSizePx = 12 + (i % 3) * 1.5;
    const r = Math.min(140, Math.max(64, text.length * 4.2 + 36));
    return {
      x: hash01(i, 1) * Math.max(1, w - 2 * r) + r,
      y: hash01(i, 2) * Math.max(1, h - 2 * r) + r,
      vx: (hash01(i, 3) - 0.5) * 0.38,
      vy: (hash01(i, 4) - 0.5) * 0.38,
      r,
      text,
      fontSizePx,
      opacity: 0.1 + hash01(i, 7) * 0.1,
    };
  });
}

export function TerminalCommandBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>(
    Array.from({ length: COMMAND_SNIPPETS.length }, () => null)
  );
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  /** Pointer in container-local pixels; invalid until first pointer move inside window. */
  const pointerRef = useRef({ x: -1e6, y: -1e6, valid: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wallDamp = 0.92;
    const maxSpeed = 0.52;
    const wander = 0.005;
    /** Radius (px) around cursor where lines start easing away */
    const repelRadius = 200;
    /** How much extra velocity per frame at cursor center (keeps motion gentle) */
    const repelStrength = 0.085;

    const syncParticlesSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w < 40 || h < 40) return;
      let list = particlesRef.current;
      if (list.length === 0) {
        list = createParticles(w, h);
        particlesRef.current = list;
      } else {
        for (const p of list) {
          p.x = Math.min(Math.max(p.r, p.x), w - p.r);
          p.y = Math.min(Math.max(p.r, p.y), h - p.r);
        }
      }
    };

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w < 40 || h < 40) return;
      particlesRef.current = createParticles(w, h);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        valid: true,
      };
    };

    syncParticlesSize();
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const tick = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const particles = particlesRef.current;
      const els = spansRef.current;
      const ptr = pointerRef.current;

      if (particles.length && w > 40 && h > 40) {
        const n = particles.length;

        for (let i = 0; i < n; i++) {
          const p = particles[i];
          p.vx += (Math.random() - 0.5) * wander;
          p.vy += (Math.random() - 0.5) * wander;

          if (ptr.valid) {
            const dx = p.x - ptr.x;
            const dy = p.y - ptr.y;
            const dist = Math.hypot(dx, dy);
            if (dist < repelRadius && dist > 0.5) {
              const nx = dx / dist;
              const ny = dy / dist;
              const t = 1 - dist / repelRadius;
              const push = t * t * repelStrength;
              p.vx += nx * push;
              p.vy += ny * push;
            }
          }

          const sp = Math.hypot(p.vx, p.vy);
          if (sp > maxSpeed) {
            p.vx = (p.vx / sp) * maxSpeed;
            p.vy = (p.vy / sp) * maxSpeed;
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < p.r) {
            p.x = p.r;
            p.vx = Math.abs(p.vx) * wallDamp;
          } else if (p.x > w - p.r) {
            p.x = w - p.r;
            p.vx = -Math.abs(p.vx) * wallDamp;
          }
          if (p.y < p.r) {
            p.y = p.r;
            p.vy = Math.abs(p.vy) * wallDamp;
          } else if (p.y > h - p.r) {
            p.y = h - p.r;
            p.vy = -Math.abs(p.vy) * wallDamp;
          }
        }

        for (let i = 0; i < n; i++) {
          const el = els[i];
          const p = particles[i];
          if (el) {
            el.style.left = `${p.x}px`;
            el.style.top = `${p.y}px`;
            el.style.transform = 'translate(-50%, -50%)';
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  const setSpanRef = (i: number) => (el: HTMLSpanElement | null) => {
    spansRef.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      data-chaos-fall-block
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {COMMAND_SNIPPETS.map((snippet, i) => (
        <span
          key={snippet}
          ref={setSpanRef(i)}
          className="absolute whitespace-nowrap font-[family-name:var(--font-share-tech-mono)] select-none text-cyan-200/95 will-change-transform"
          style={{
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            fontSize: `${11 + (i % 3) * 1.35}px`,
            opacity: 0.1 + (i % 5) * 0.02,
            textShadow:
              '0 0 1px rgba(5,6,10,0.85), 0 0 14px rgba(0,229,255,0.45), 0 0 28px rgba(168,85,247,0.18)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
            maxWidth: 'min(88vw, 380px)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '0.02em',
          }}
        >
          <span className="text-fuchsia-400/90 font-semibold">$ </span>
          {snippet}
        </span>
      ))}
    </div>
  );
}
