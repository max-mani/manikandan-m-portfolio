/** Stepped easing — pixel-art motion, no springs. */
export const STEP_EASE = [1, 0, 0, 1] as const;

export const VIEWPORT_ONCE = { once: true, margin: '-60px' } as const;

export const HEADING_MOTION = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: 0.12, ease: STEP_EASE },
} as const;

export const CARD_STAGGER = 0.1;

export const SKILL_TAG_STAGGER = 0.05;

export const CTF_STAGGER = 0.12;
