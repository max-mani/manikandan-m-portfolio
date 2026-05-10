import { animate } from 'framer-motion/dom';
import Matter from 'matter-js';

/** Exported for avatar cooldown estimation. */
export const CHAOS_MATTER_PHYS_HARD_CAP_MS = 14_000;
export const CHAOS_MATTER_RETURN_SECONDS = 1.08;

/** Gentler than Matter default (`1` × scale). */
const GRAVITY_Y = 0.38;

const FIXED_DT_MS = 1000 / 60;

const REST_V_SUM = 0.012;
const REST_STEPS = 48;

const RETURN_EASE_A: [number, number, number, number] = [0.2, 0.94, 0.14, 1];
const RETURN_EASE_B: [number, number, number, number] = [0.28, 1, 0.22, 1];

export type ChaosPhysicsSnapshot = {
  el: HTMLElement;
  anchorCx: number;
  anchorCy: number;
  dx: number;
  dy: number;
  deg: number;
};

type Binding = {
  el: HTMLElement;
  body: Matter.Body;
  anchorCx: number;
  anchorCy: number;
};

function pinElement(el: HTMLElement): Binding | null {
  const r = el.getBoundingClientRect();
  if (r.width < 0.5 || r.height < 0.5) return null;

  const anchorCx = r.left + r.width / 2;
  const anchorCy = r.top + r.height / 2;

  el.style.pointerEvents = 'none';
  el.style.position = 'fixed';
  el.style.left = `${r.left}px`;
  el.style.top = `${r.top}px`;
  el.style.width = `${r.width}px`;
  el.style.height = `${r.height}px`;
  el.style.margin = '0';
  el.style.zIndex = '9600';
  el.style.transformOrigin = 'center center';
  el.style.boxSizing = 'border-box';

  const w = Math.max(r.width, 4);
  const h = Math.max(r.height, 6);

  const body = Matter.Bodies.rectangle(anchorCx, anchorCy, w, h, {
    friction: 0.64,
    frictionAir: 0.024,
    restitution: 0.065,
    density: 0.00165,
    chamfer: { radius: 0.5 },
    sleepThreshold: 40,
  });

  return { el, body, anchorCx, anchorCy };
}

function syncDom(bindings: Binding[]) {
  for (const b of bindings) {
    const dx = b.body.position.x - b.anchorCx;
    const dy = b.body.position.y - b.anchorCy;
    const deg = b.body.angle * (180 / Math.PI);
    b.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${deg}deg)`;
  }
}

export function clearPhysicsDomStyles(el: HTMLElement) {
  el.style.removeProperty('position');
  el.style.removeProperty('left');
  el.style.removeProperty('top');
  el.style.removeProperty('width');
  el.style.removeProperty('height');
  el.style.removeProperty('margin');
  el.style.removeProperty('z-index');
  el.style.removeProperty('transform-origin');
  el.style.removeProperty('transform');
  el.style.removeProperty('pointer-events');
  el.style.removeProperty('cursor');
  el.style.removeProperty('box-sizing');
}

function buildBoundaries(vpW: number, vpH: number) {
  const floorThick = 96;
  const floor = Matter.Bodies.rectangle(
    vpW / 2,
    vpH + floorThick / 2 - 1,
    vpW * 2.25,
    floorThick,
    {
      isStatic: true,
      friction: 0.94,
      restitution: 0.03,
      label: 'chaos-floor',
    },
  );

  const side = 54;
  const left = Matter.Bodies.rectangle(-side / 2, vpH / 2, side, vpH * 2.8, {
    isStatic: true,
    friction: 0.45,
    label: 'chaos-left',
  });
  const right = Matter.Bodies.rectangle(vpW + side / 2, vpH / 2, side, vpH * 2.8, {
    isStatic: true,
    friction: 0.45,
    label: 'chaos-right',
  });

  return [floor, left, right];
}

function snapshotsFromBindings(bindings: Binding[]): ChaosPhysicsSnapshot[] {
  return bindings.map((b) => ({
    el: b.el,
    anchorCx: b.anchorCx,
    anchorCy: b.anchorCy,
    dx: b.body.position.x - b.anchorCx,
    dy: b.body.position.y - b.anchorCy,
    deg: b.body.angle * (180 / Math.PI),
  }));
}

/**
 * Gravity pile + mouse drag (`MouseConstraint`) for `interactivePhaseMs`, then teardown.
 */
export async function runMatterFallThenInteractive(opts: {
  elements: HTMLElement[];
  interactivePhaseMs: number;
  onFallSettled: () => void;
}): Promise<ChaosPhysicsSnapshot[]> {
  const { elements, interactivePhaseMs, onFallSettled } = opts;
  if (elements.length === 0) return [];

  const vpW = window.innerWidth;
  const vpH = window.innerHeight;

  const engine = Matter.Engine.create({ enableSleeping: true });
  engine.world.gravity.y = GRAVITY_Y;
  engine.world.gravity.scale = 0.001;

  const walls = buildBoundaries(vpW, vpH);
  Matter.Composite.add(engine.world, walls);

  const bindings: Binding[] = [];

  for (const el of elements) {
    const b = pinElement(el);
    if (b) bindings.push(b);
  }

  if (bindings.length === 0) return [];

  const movers = bindings.map((b) => b.body);
  Matter.Composite.add(engine.world, movers);

  const bodies = movers;
  await new Promise<void>((resolve) => {
    let rafId = 0;
    const started = performance.now();
    let restAccum = 0;

    function stepFall() {
      Matter.Engine.update(engine, FIXED_DT_MS);
      syncDom(bindings);

      const elapsed = performance.now() - started;
      let sumVel = 0;
      for (const bod of bodies) {
        sumVel +=
          Math.abs(bod.velocity.x) +
          Math.abs(bod.velocity.y) +
          Math.abs(bod.angularVelocity) * 40;
      }
      const perBody = bodies.length ? sumVel / bodies.length : 0;
      const creeping = perBody < REST_V_SUM;

      restAccum = creeping ? restAccum + 1 : 0;

      if (elapsed >= CHAOS_MATTER_PHYS_HARD_CAP_MS || restAccum >= REST_STEPS) {
        cancelAnimationFrame(rafId);
        resolve();
        return;
      }

      rafId = requestAnimationFrame(stepFall);
    }

    requestAnimationFrame(stepFall);
  });

  try {
    onFallSettled();
  } catch {
    /* ignore */
  }

  for (const b of bindings) {
    b.el.style.pointerEvents = 'auto';
    b.el.style.cursor = 'grab';
  }

  const mouse = Matter.Mouse.create(document.body);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.28,
      damping: 0.12,
      render: { visible: false },
    },
  });

  Matter.Composite.add(engine.world, mouseConstraint);

  let dragActive = false;
  const md = () => {
    dragActive = true;
    for (const b of bindings) b.el.style.cursor = 'grabbing';
  };
  const mu = () => {
    dragActive = false;
    for (const b of bindings) b.el.style.cursor = 'grab';
  };

  Matter.Events.on(mouseConstraint, 'startdrag', md);
  Matter.Events.on(mouseConstraint, 'enddrag', mu);

  const interactiveStart = performance.now();
  await new Promise<void>((resolve) => {
    let iraf = 0;
    function stepInteractive() {
      Matter.Engine.update(engine, FIXED_DT_MS);
      syncDom(bindings);

      if (performance.now() - interactiveStart >= interactivePhaseMs) {
        cancelAnimationFrame(iraf);
        Matter.Events.off(mouseConstraint, 'startdrag', md);
        Matter.Events.off(mouseConstraint, 'enddrag', mu);
        Matter.Composite.remove(engine.world, mouseConstraint);
        resolve();
        return;
      }

      iraf = requestAnimationFrame(stepInteractive);
    }
    iraf = requestAnimationFrame(stepInteractive);
  });

  Matter.Mouse.clearSourceEvents(mouse);

  for (const b of bindings) {
    b.el.style.pointerEvents = 'none';
    b.el.style.cursor = '';
  }

  const out = snapshotsFromBindings(bindings);
  Matter.Composite.clear(engine.world, false);
  Matter.Engine.clear(engine);

  return out;
}

export async function animateSnapshotsReturn(
  snapshots: ChaosPhysicsSnapshot[],
): Promise<void> {
  if (snapshots.length === 0) return;

  for (const s of snapshots) {
    s.el.style.transform = `translate(${s.dx}px, ${s.dy}px) rotate(${s.deg}deg)`;
  }

  const fromT = (s: ChaosPhysicsSnapshot) =>
    `translate(${s.dx}px, ${s.dy}px) rotate(${s.deg}deg)`;

  await Promise.all(
    snapshots.map((s) =>
      animate(
        s.el,
        {
          transform: [fromT(s), 'translate(0px, 0px) rotate(0deg)'],
          filter: ['brightness(0.96)', 'brightness(1)'],
        },
        {
          duration: CHAOS_MATTER_RETURN_SECONDS,
          ease: [RETURN_EASE_A, RETURN_EASE_B],
        },
      ),
    ),
  );

  for (const s of snapshots) {
    clearPhysicsDomStyles(s.el);
    s.el.style.removeProperty('filter');
  }
}
