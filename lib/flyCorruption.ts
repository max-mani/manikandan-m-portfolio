/** Glyph pool — maxim-portfolio-cursor-brief-FINAL.md Phase 5 */
export const CORRUPTION_GLYPHS = [
  '@',
  '#',
  '$',
  '%',
  '!',
  '&',
  '*',
  '?',
  '~',
  '^',
  '<',
  '>',
  '{',
  '}',
  '[',
  ']',
  '|',
  '\\',
  '0',
  'x',
  '░',
  '▒',
  '▓',
] as const;

const REPLACE_CHANCE = 0.35;

export function corruptPlainText(text: string): string {
  let out = '';
  for (const ch of text) {
    if (ch === ' ' || ch === '\n' || ch === '\t') {
      out += ch;
      continue;
    }
    if (Math.random() < REPLACE_CHANCE) {
      const i = Math.floor(Math.random() * CORRUPTION_GLYPHS.length);
      out += CORRUPTION_GLYPHS[i];
    } else {
      out += ch;
    }
  }
  return out;
}

export const FLY_TARGET_SELECTOR =
  'h1:not(.hero-typewriter), h2, h3, .section-label, .term-label';

function isSafeTextTarget(el: HTMLElement): boolean {
  if (el.isContentEditable) return false;
  if (el.getAttribute('aria-hidden') === 'true') return false;
  if (el.closest('nav, footer, [data-ft-terminal], [data-pixel-toast-stack]')) return false;
  if (el.childElementCount > 0) return false;
  const text = el.textContent ?? '';
  return text.trim().length > 0;
}

function isVisibleInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
}

export function collectCorruptibleTargets(): HTMLElement[] {
  if (typeof document === 'undefined') return [];
  const nodes = document.querySelectorAll<HTMLElement>(FLY_TARGET_SELECTOR);
  const list: HTMLElement[] = [];
  nodes.forEach((el) => {
    if (el.dataset.corrupted === 'true') return;
    if (el.classList.contains('hero-typewriter')) return;
    if (!isSafeTextTarget(el)) return;
    if (!isVisibleInViewport(el)) return;
    list.push(el);
  });
  return list;
}

export function findFirstVisibleCorrupted(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  const nodes = document.querySelectorAll<HTMLElement>('[data-corrupted="true"]');
  for (const el of nodes) {
    if (isVisibleInViewport(el)) return el;
  }
  return null;
}
