import { animate } from 'framer-motion/dom';



/** Single-root “OS crash” vibrate (Framer Motion hybrid engine). */

export const CHAOS_GLITCH_SECONDS = 0.56;

/** Deliberate slow slip off-screen, one block at a time. */

export const CHAOS_SLOW_FALL_SECONDS = 1.24;

const RISE_SECONDS = 1.08;



export const CHAOS_GLITCH_MS = Math.ceil(CHAOS_GLITCH_SECONDS * 1000);

export const CHAOS_SLOW_FALL_MS = Math.ceil(CHAOS_SLOW_FALL_SECONDS * 1000);

export const CHAOS_MOTION_RISE_MS = Math.ceil(RISE_SECONDS * 1000);



export type ChaosAnimTiming = {
  /** Multiply fall + base glitch when paired with durationScale. */
  durationScale?: number;
  /** Extra multiplier on glitch-only duration (longer shake feel). */
  glitchScale?: number;
};



/** Slow gravity — uncanny “still sliding” before blackout. */

const SLOW_FALL_EASE: [number, number, number, number] = [0.38, 0.04, 0.52, 0.96];

/** Exit low → settle with a soft mechanical overshoot on scale. */

const RISE_ENTER: [number, number, number, number] = [0.2, 0.95, 0.26, 1];

const RISE_SETTLE: [number, number, number, number] = [0.34, 1.02, 0.24, 1];



type RiseOrigin = { xPx: number; yPx: number; tiltDeg: number };



function vwToPx(vw: number): number {

  return (vw / 100) * window.innerWidth;

}



function vhToPx(vh: number): number {

  return (vh / 100) * window.innerHeight;

}



function shuffleAngles(rad: number[]) {

  for (let i = rad.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [rad[i], rad[j]] = [rad[j], rad[i]];

  }

}



function hash01(i: number, seed: number): number {

  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;

  return x - Math.floor(x);

}



/** Disjoint compass sectors → Motion px space (no CSS variable hop). */

export function buildDistributedRiseOrigins(n: number): RiseOrigin[] {

  if (n === 0) return [];

  const sector = (2 * Math.PI) / n;

  const bases = Array.from({ length: n }, (_, k) => k * sector);

  shuffleAngles(bases);



  return bases.map((base, i) => {

    const jitter = (Math.random() - 0.5) * sector * 0.52;

    const angle = base + jitter;

    const mag =
      (78 + (i % 5) * 12 + Math.random() * 62) *
      /** Stronger compass spread so simultaneous rise reads clearly. */
      1.46;

    const tiltDeg = ((i % 11) - 5) * 1.35 + (Math.random() - 0.55) * 4.2;

    return {

      xPx: vwToPx(Math.cos(angle) * mag),

      yPx: vhToPx(Math.sin(angle) * mag),

      tiltDeg,

    };

  });

}



export function flushChaosTransforms(els: Element[]) {

  els.forEach((el) => {

    const any = el as HTMLElement | SVGElement;

    any.style?.removeProperty?.('transform');

    any.style?.removeProperty?.('opacity');

    any.style?.removeProperty?.('filter');


  });

}



const GLITCH_TIMES = [0, 0.13, 0.26, 0.42, 0.55, 0.68, 0.82, 1];



/**

 * One element — jitter + micro brightness twitch; ends neutral transform.

 */

export async function playChaosGlitchShake(

  el: Element,

  stableIdx: number,

  seed: number,

  timing?: ChaosAnimTiming,

): Promise<void> {

  const durScale = timing?.durationScale ?? 1;
  const gScale = timing?.glitchScale ?? 1;
  const glitchSec = CHAOS_GLITCH_SECONDS * durScale * gScale;

  const h = hash01(stableIdx, seed);

  const ax = 2.2 + h * 4.2;

  const ay = 1.9 + hash01(stableIdx + 11, seed) * 4.1;

  const rot = 0.55 + hash01(stableIdx + 23, seed) * 1.35;



  const xs = [

    0,

    -ax,

    ax * 0.85,

    -ax * 0.55,

    ax * 0.95,

    -ax * 0.42,

    ax * 0.28,

    0,

  ];

  const ys = [

    0,

    ay * 0.65,

    -ay,

    ay * 0.48,

    -ay * 0.72,

    ay * 0.32,

    -ay * 0.18,

    0,

  ];

  const rotsDeg = [

    0,

    -rot,

    rot * 0.78,

    -rot * 0.5,

    rot * 0.42,

    -rot * 0.24,

    rot * 0.12,

    0,

  ].map((r) => `${r}deg`);



  await animate(

    el,

    {

      x: xs,

      y: ys,

      rotate: rotsDeg,

      filter: [

        'brightness(1) contrast(1)',

        'brightness(1.06) contrast(1.02)',

        'brightness(0.94) contrast(1.04)',

        'brightness(1.05) contrast(0.98)',

        'brightness(0.92) contrast(1.06)',

        'brightness(1.03) contrast(1)',

        'brightness(0.99) contrast(1)',

        'brightness(1) contrast(1)',

      ],

    },

    {

      duration: glitchSec,

      times: GLITCH_TIMES,

      ease: 'linear',

    },

  );

}



/**

 * Single target: multi-stop slip + dim.

 */

export async function playChaosFallOne(

  el: Element,

  stableIdx: number,

  seed: number,

  timing?: ChaosAnimTiming,

): Promise<void> {

  const durScale = timing?.durationScale ?? 1;

  const isSvg = el instanceof SVGElement;



  const slipVw =

    (Math.sin(stableIdx * 1.31 + seed) + (Math.random() - 0.45)) * 4.4;

  const yaw = ((stableIdx % 9) - 4) * 1.05 + (Math.random() - 0.5) * 3.8;

  const skew = ((stableIdx % 5) - 2) * 0.38 + (Math.random() - 0.5) * 0.55;

  const drop = (((stableIdx + seed * 9) | 0) % 18) / 100;

  const y1 = `${18 + drop * 18}vh`;

  const y2 = `${52 + drop * 20}vh`;

  const yEnd = `${112 + drop * 100}vh`;

  const dur =

    CHAOS_SLOW_FALL_SECONDS *

    (0.96 + hash01(stableIdx + 3, seed) * 0.1) *

    durScale;

  const x1 = `${slipVw * 0.28}vw`;

  const x2 = `${slipVw * 0.72}vw`;

  const x3 = `${slipVw}vw`;



  const motion = {

    y: ['0vh', y1, y2, yEnd],

    x: ['0vw', x1, x2, x3],

    rotate: [`0deg`, `${yaw * 0.32}deg`, `${yaw * 0.78}deg`, `${yaw}deg`],

    ...(isSvg

      ? {}

      : {

          skewX: [`0deg`, `${skew * 0.42}deg`, `${skew * 0.88}deg`, `${skew}deg`],

        }),

    scale: [1, 0.97, 0.92, 0.86],

    opacity: [1, 1, 0.32, 0],

    filter: [

      'brightness(1)',

      'brightness(0.9)',

      'brightness(0.42)',

      'brightness(0.18)',

    ],

  };



  await animate(el, motion, {

    duration: dur,

    times: [0, 0.26, 0.66, 1],

    ease: [SLOW_FALL_EASE, SLOW_FALL_EASE, SLOW_FALL_EASE],

  });

}



/**

 * Rise: simultaneous — each shard from its sector; scale overshoot + filter bloom.

 */

export async function playChaosRise(

  els: Element[],

  origins: RiseOrigin[],

): Promise<void> {

  if (els.length === 0) return;



  await Promise.all(

    els.map((el, i) => {

      const o = origins[i] ?? origins[0];

      const skewKick = `${(o.tiltDeg >= 0 ? 1 : -1) * 1.6}deg`;

      const isSvg = el instanceof SVGElement;



      const motionBase = {

        x: [o.xPx, 0],

        y: [o.yPx, 0],

        opacity: [0, 0.55, 1],

        rotate: [`${o.tiltDeg}deg`, `${o.tiltDeg * 0.22}deg`, '0deg'],

        scale: [0.88, 1.042, 1],

        filter: [

          'brightness(0.55) saturate(1.08)',

          'brightness(1.08) saturate(1.06)',

          'brightness(1) saturate(1)',

        ],

      };



      const motion = {

        ...motionBase,

        ...(isSvg

          ? {}

          : {

              skewX: [skewKick, '0deg', '0deg'],

            }),

      };



      return animate(el, motion, {

        duration: RISE_SECONDS,

        times: [0, 0.58, 1],

        ease: [RISE_ENTER, RISE_SETTLE],

      });

    }),

  );

}


