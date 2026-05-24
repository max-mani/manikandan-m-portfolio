'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type GameState = 'idle' | 'playing' | 'gameover';

type FlyObj = {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
};

type BonusObj = {
  x: number;
  y: number;
  size: number;
  vy: number;
};

const GAME_W = 600;
const GAME_H = 300;
const PLAYER_W = 18;
const PLAYER_H = 18;
const MAX_SPEED = 4.6;

function intersects(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function Game404() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const gameStateRef = useRef<GameState>('idle');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const playerXRef = useRef(GAME_W / 2 - PLAYER_W / 2);
  const fliesRef = useRef<FlyObj[]>([]);
  const bonusRef = useRef<BonusObj | null>(null);
  const freezeUntilRef = useRef(0);
  const invulnerableUntilRef = useRef(0);
  const startedAtRef = useRef(0);
  const lastFrameRef = useRef(0);
  const lastFlySpawnRef = useRef(0);
  const lastBonusSpawnRef = useRef(0);

  const moveLeftRef = useRef(false);
  const moveRightRef = useRef(false);
  const pointerDownRef = useRef(false);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const resetWorld = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = 3;
    playerXRef.current = GAME_W / 2 - PLAYER_W / 2;
    fliesRef.current = [];
    bonusRef.current = null;
    freezeUntilRef.current = 0;
    invulnerableUntilRef.current = 0;
    startedAtRef.current = performance.now();
    lastFrameRef.current = startedAtRef.current;
    lastFlySpawnRef.current = startedAtRef.current;
    lastBonusSpawnRef.current = startedAtRef.current;
    setScore(0);
    setLives(3);
  }, []);

  const begin = useCallback(() => {
    resetWorld();
    gameStateRef.current = 'playing';
    setGameState('playing');
  }, [resetWorld]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') moveLeftRef.current = true;
      if (key === 'arrowright' || key === 'd') moveRightRef.current = true;
      if (key === ' ' || key === 'enter') {
        if (gameStateRef.current !== 'playing') {
          e.preventDefault();
          begin();
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') moveLeftRef.current = false;
      if (key === 'arrowright' || key === 'd') moveRightRef.current = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [begin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = wrapRef.current;
      const width = parent?.clientWidth ?? GAME_W;
      const cssW = Math.max(280, Math.min(GAME_W, width));
      const cssH = Math.round((cssW / GAME_W) * GAME_H);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (now: number) => {
      const dt = Math.min(40, now - (lastFrameRef.current || now));
      lastFrameRef.current = now;

      if (gameStateRef.current === 'playing') {
        if (moveLeftRef.current && !moveRightRef.current) {
          playerXRef.current -= MAX_SPEED;
        } else if (moveRightRef.current && !moveLeftRef.current) {
          playerXRef.current += MAX_SPEED;
        }
        playerXRef.current = Math.max(0, Math.min(GAME_W - PLAYER_W, playerXRef.current));

        const elapsed = Math.floor((now - startedAtRef.current) / 1000);
        if (elapsed !== scoreRef.current) {
          scoreRef.current = elapsed;
          setScore(elapsed);
        }

        if (now - lastFlySpawnRef.current > 650) {
          lastFlySpawnRef.current = now;
          fliesRef.current.push({
            x: Math.random() * (GAME_W - 16),
            y: -20,
            w: 16,
            h: 16,
            speed: 1.3 + Math.random() * 2.2,
          });
        }

        if (!bonusRef.current && now - lastBonusSpawnRef.current > 15000) {
          lastBonusSpawnRef.current = now;
          bonusRef.current = {
            x: Math.random() * (GAME_W - 20),
            y: -24,
            size: 20,
            vy: 1.5,
          };
        }

        const freezeActive = now < freezeUntilRef.current;
        fliesRef.current = fliesRef.current.filter((f) => {
          if (!freezeActive) f.y += f.speed * (dt / 16);
          return f.y < GAME_H + 24;
        });

        if (bonusRef.current) {
          bonusRef.current.y += bonusRef.current.vy * (dt / 16);
          if (bonusRef.current.y > GAME_H + 24) bonusRef.current = null;
        }

        const playerBox = { x: playerXRef.current, y: GAME_H - 26, w: PLAYER_W, h: PLAYER_H };

        if (bonusRef.current) {
          const b = bonusRef.current;
          const bonusBox = { x: b.x, y: b.y, w: b.size, h: b.size };
          if (intersects(playerBox, bonusBox)) {
            bonusRef.current = null;
            freezeUntilRef.current = now + 2500;
            scoreRef.current += 10;
            setScore(scoreRef.current);
          }
        }

        if (now > invulnerableUntilRef.current) {
          for (const fly of fliesRef.current) {
            if (intersects(playerBox, { x: fly.x, y: fly.y, w: fly.w, h: fly.h })) {
              invulnerableUntilRef.current = now + 900;
              livesRef.current -= 1;
              setLives(livesRef.current);
              if (livesRef.current <= 0) {
                gameStateRef.current = 'gameover';
                setGameState('gameover');
              }
              break;
            }
          }
        }
      }

      ctx.fillStyle = '#050a05';
      ctx.fillRect(0, 0, GAME_W, GAME_H);

      ctx.strokeStyle = '#1a2e1a';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, GAME_W - 2, GAME_H - 2);

      ctx.fillStyle = '#00ff41';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillText(`SCORE: ${scoreRef.current}`, 10, 16);
      ctx.fillText(`LIVES: ${'♥'.repeat(Math.max(0, livesRef.current))}`, 10, 30);
      if (now < freezeUntilRef.current) ctx.fillText('FREEZE ACTIVE', GAME_W - 156, 16);

      for (const fly of fliesRef.current) {
        ctx.font = '16px "Press Start 2P", monospace';
        ctx.fillText('🪰', fly.x, fly.y + fly.h);
      }

      if (bonusRef.current) {
        const bonus = bonusRef.current;
        ctx.font = '18px "Press Start 2P", monospace';
        ctx.fillText('🦋', bonus.x, bonus.y + bonus.size);
      }

      const blink = now < invulnerableUntilRef.current && Math.floor(now / 80) % 2 === 0;
      if (!blink) {
        ctx.fillStyle = '#e8f5e9';
        ctx.fillRect(playerXRef.current, GAME_H - 26, PLAYER_W, PLAYER_H);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      stopLoop();
      window.removeEventListener('resize', resize);
    };
  }, [stopLoop]);

  useEffect(() => {
    return () => stopLoop();
  }, [stopLoop]);

  const onPointerMove = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas || gameStateRef.current !== 'playing') return;
    const rect = canvas.getBoundingClientRect();
    const ratio = GAME_W / rect.width;
    playerXRef.current = (clientX - rect.left) * ratio - PLAYER_W / 2;
    playerXRef.current = Math.max(0, Math.min(GAME_W - PLAYER_W, playerXRef.current));
  };

  return (
    <section className="phase6-panel pixel-border bg-[var(--surface)] p-3 sm:p-4">
      <p className="mb-2 text-[8px] text-[var(--dim)]">[ GAME PANEL ]</p>
      <div ref={wrapRef} className="phase6-game-wrap">
        <canvas
          ref={canvasRef}
          className="phase6-game-canvas"
          onPointerDown={(e) => {
            pointerDownRef.current = true;
            onPointerMove(e.clientX);
          }}
          onPointerMove={(e) => {
            if (pointerDownRef.current) onPointerMove(e.clientX);
          }}
          onPointerUp={() => {
            pointerDownRef.current = false;
          }}
          onPointerLeave={() => {
            pointerDownRef.current = false;
          }}
        />
        {gameState !== 'playing' && (
          <div className="phase6-game-overlay">
            {gameState === 'idle' ? (
              <>
                <p>DODGE THE FLIES</p>
                <p className="mt-2 text-[var(--dim)]">ARROWS/A-D/TAP TO MOVE</p>
                <button className="pixel-btn mt-4 text-[8px]" onClick={begin}>
                  [START]
                </button>
              </>
            ) : (
              <>
                <p>GAME OVER</p>
                <p className="mt-2">SCORE: {score}</p>
                <p className="mt-2 text-[var(--dim)]">fly_01 and fly_02 win this round.</p>
                <div className="mt-4 flex gap-2">
                  <button className="pixel-btn text-[8px]" onClick={begin}>
                    [PLAY AGAIN]
                  </button>
                  <Link className="pixel-btn text-[8px]" href="/">
                    [GO HOME]
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
