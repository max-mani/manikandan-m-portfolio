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

export const FLY_TARGET_SELECTOR =
  'main p, main h1, main h2, main h3, main li, main span:not([aria-hidden]), main .term-label';

const EXCLUDED_ANCESTORS =
  'nav, footer, button, input, textarea, a, [data-ft-terminal], [data-pixel-toast-stack], [data-chaos-fall-root], [data-chaos-trigger], [data-chaos-force-hide-text]';

function parseCorruptionMap(raw: string | undefined): Record<number, string> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    const out: Record<number, string> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const idx = Number(k);
      if (!Number.isNaN(idx)) out[idx] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function buildCorruptedText(original: string, map: Record<number, string>): string {
  let out = '';
  for (let i = 0; i < original.length; i++) {
    out += map[i] ?? original[i];
  }
  return out;
}

export function corruptOneLetter(
  text: string,
  alreadyCorrupted: Set<number> = new Set(),
): { text: string; index: number; glyph: string } | null {
  const candidates: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch !== ' ' && ch !== '\n' && ch !== '\t' && !alreadyCorrupted.has(i)) {
      candidates.push(i);
    }
  }
  if (candidates.length === 0) return null;

  const index = candidates[Math.floor(Math.random() * candidates.length)];
  const glyph = CORRUPTION_GLYPHS[Math.floor(Math.random() * CORRUPTION_GLYPHS.length)];
  return {
    index,
    glyph,
    text: text.slice(0, index) + glyph + text.slice(index + 1),
  };
}

/** @deprecated Use corruptElement — kept for any legacy callers */
export function corruptPlainText(text: string): string {
  const result = corruptOneLetter(text);
  return result?.text ?? text;
}

function isSafeTextTarget(el: HTMLElement): boolean {
  if (el.isContentEditable) return false;
  if (el.getAttribute('aria-hidden') === 'true') return false;
  if (el.closest(EXCLUDED_ANCESTORS)) return false;
  if (el.classList.contains('hero-typewriter')) return false;
  if (el.childElementCount > 0) return false;
  const text = el.textContent ?? '';
  if (text.trim().length < 2) return false;
  return true;
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

/** Corrupt one letter on a target element; returns preview text for toast. */
export function corruptElement(el: HTMLElement): string | null {
  const original = el.dataset.original ?? (el.textContent ?? '');
  if (!original.trim()) return null;

  if (!el.dataset.original) {
    el.dataset.original = original;
    el.dataset.originalColor = getComputedStyle(el).color;
  }

  const map = parseCorruptionMap(el.dataset.corruptionMap);
  const corruptedIdx = new Set(Object.keys(map).map(Number));
  const result = corruptOneLetter(original, corruptedIdx);
  if (!result) return null;

  map[result.index] = result.glyph;
  el.dataset.corruptionMap = JSON.stringify(map);
  el.textContent = buildCorruptedText(original, map);
  el.dataset.corrupted = 'true';
  el.style.color = 'var(--red)';

  return original.replace(/\s+/g, ' ').slice(0, 18);
}

export function clearCorruptionState(el: HTMLElement): void {
  delete el.dataset.corrupted;
  delete el.dataset.original;
  delete el.dataset.originalColor;
  delete el.dataset.corruptionMap;
}
