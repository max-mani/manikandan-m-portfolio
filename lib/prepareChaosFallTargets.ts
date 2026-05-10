import { createChaosOverlaySession } from '@/lib/chaosOverlayLayer';

function isExcludedNode(node: Node | null): boolean {
  if (!(node instanceof Element)) return false;
  return !!(
    node.closest('[data-pixel-toast-stack],[data-chaos-fall-block],[data-ft-terminal]') ||
    node.closest('script,style,noscript,template,input,textarea,select')
  );
}

function scopesFromDocument(doc: Document): HTMLElement[] {
  const list: HTMLElement[] = [];
  const navbar = doc.querySelector('[data-chaos-fall-root="navbar"]');
  if (navbar instanceof HTMLElement) list.push(navbar);
  const main = doc.querySelector('main');
  if (main instanceof HTMLElement) list.push(main);
  const footer = doc.querySelector('footer');
  if (footer instanceof HTMLElement) list.push(footer);
  return list;
}

function getAdaptivePhysicsElementsCap(): number {
  if (typeof window === 'undefined') return 520;
  const area = window.innerWidth * window.innerHeight;
  const touchLike = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (area <= 500_000) return touchLike ? 180 : 280;
  if (area <= 1_050_000) return touchLike ? 260 : 420;
  if (area <= 1_900_000) return touchLike ? 320 : 620;
  return touchLike ? 380 : 820;
}

export function estimateChaosCharCount(doc: Document): number {
  const maxPhysicsElements = getAdaptivePhysicsElementsCap();
  return Math.min(estimateTextCharTargets(doc), maxPhysicsElements);
}

/** Old name kept for AnimeBotAvatar import paths already updated — use estimateChaosCharCount */
export function estimateChaosPaneCount(doc: Document): number {
  return estimateChaosCharCount(doc);
}

/** @deprecated */
export function estimateGranularChaosTargetCount(doc: Document): number {
  return estimateChaosCharCount(doc);
}

const CHAOS_OWNER_ATTR = 'data-chaos-owner';
const segmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter('en', { granularity: 'grapheme' })
    : null;

function isVisible(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  if (r.width < 1 || r.height < 1) return false;
  return r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
}

function isEligibleTarget(el: HTMLElement): boolean {
  const forceInclude = el.hasAttribute('data-chaos-include');
  if (!forceInclude && isExcludedNode(el)) return false;
  if (!isVisible(el)) return false;
  if (el.closest('[aria-hidden="true"]')) return false;
  if (!forceInclude && el.matches('main, section, article, ul, ol, nav, footer, header, form, svg, path')) return false;
  if (!forceInclude && el.classList.contains('hero-typewriter')) return false;
  if (!forceInclude && el.matches('svg, path')) return false;
  const text = el.textContent ?? '';
  return text.trim().length > 0;
}

function collectChaosElements(doc: Document): HTMLElement[] {
  const set = new Set<HTMLElement>();
  const includedRoots = [...doc.querySelectorAll<HTMLElement>('[data-chaos-include]')].filter(
    (el) => isEligibleTarget(el) && !el.parentElement?.closest('[data-chaos-include]'),
  );

  for (const included of includedRoots) {
    set.add(included);
  }

  return [...set];
}

function splitGraphemes(text: string): string[] {
  if (segmenter) {
    return Array.from(segmenter.segment(text), (chunk) => chunk.segment);
  }
  return Array.from(text);
}

function isInsideForceHiddenZone(node: Node): boolean {
  const parent = node.parentElement;
  if (!parent) return false;
  return !!parent.closest('[data-chaos-force-hide-text]');
}

function estimateTextCharTargets(doc: Document): number {
  const targets = collectChaosElements(doc);
  let count = 0;
  for (const el of targets) {
    const text = (el.textContent ?? '').trim();
    if (!text) continue;
    count += splitGraphemes(text).length;
  }
  return count;
}

function collectTextNodeRangesForElement(el: HTMLElement): Range[] {
  const ranges: Range[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  while (walker.nextNode()) {
    const txt = walker.currentNode;
    if (!(txt instanceof Text)) continue;
    if (isInsideForceHiddenZone(txt)) continue;
    const raw = txt.data;
    if (!raw.trim()) continue;
    let cursor = 0;
    for (const grapheme of splitGraphemes(raw)) {
      const start = cursor;
      const end = cursor + grapheme.length;
      cursor = end;
      if (!grapheme.trim()) continue;
      const range = document.createRange();
      range.setStart(txt, start);
      range.setEnd(txt, end);
      const rect = range.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        range.detach?.();
        continue;
      }
      ranges.push(range);
    }
  }
  return ranges;
}

function shouldCreateBoxSeed(el: HTMLElement): boolean {
  // Skip large structural containers that can visually mask falling chars.
  if (el.matches('nav, header, main, body, section#home')) return false;
  if (el.hasAttribute('data-chaos-fall-root')) return false;
  return true;
}

export function prepareChaosFallTargets(doc: Document): {
  elements: HTMLElement[];
  cleanup: () => void;
} {
  const maxPhysicsElements = getAdaptivePhysicsElementsCap();
  const targets = collectChaosElements(doc);
  const seeds: Array<
    | { kind: 'char'; char: string; rect: DOMRect }
    | { kind: 'box'; rect: DOMRect; borderColor?: string; backgroundColor?: string; boxShadow?: string }
    | { kind: 'sprite'; src: string; rect: DOMRect; alt?: string }
  > = [];
  const sourcesToHide: HTMLElement[] = [];
  const sourcesSet = new Set<HTMLElement>();
  const seen = new Set<string>();
  const seenBoxes = new Set<string>();

  // Include the header profile image as a falling sprite, plus its alt/label as falling chars.
  const trigger = doc.querySelector<HTMLElement>('[data-chaos-trigger]');
  const triggerImg = trigger?.querySelector('img') ?? null;
  if (triggerImg instanceof HTMLImageElement) {
    const r = triggerImg.getBoundingClientRect();
    if (r.width > 2 && r.height > 2) {
      seeds.push({ kind: 'sprite', src: triggerImg.currentSrc || triggerImg.src, rect: r, alt: triggerImg.alt });
      // Hide the live avatar image so only overlay falls.
      sourcesSet.add(triggerImg);

      const label =
        trigger?.getAttribute('aria-label') ||
        triggerImg.alt ||
        'Manikandan M — pixel art profile photo';
      const chars = splitGraphemes(label);
      const step = Math.max(6, Math.round(r.height * 0.26));
      const startX = r.left;
      const startY = r.bottom + 6;
      for (let i = 0; i < chars.length && seeds.length < maxPhysicsElements; i++) {
        const ch = chars[i];
        if (!ch.trim()) continue;
        const rect = new DOMRect(startX + i * step, startY, step, Math.max(10, Math.round(r.height * 0.32)));
        seeds.push({ kind: 'char', char: ch, rect });
      }
    }
  }

  // Always hide all included targets, regardless of character budget.
  for (const el of targets) {
    sourcesSet.add(el);
  }

  sourcesToHide.push(...sourcesSet);

  for (const el of targets) {
    if (seeds.length >= maxPhysicsElements) break;
    if (shouldCreateBoxSeed(el)) {
      const containerRect = el.getBoundingClientRect();
      if (containerRect.width >= 2 && containerRect.height >= 2) {
        const key = `${Math.round(containerRect.left)}|${Math.round(containerRect.top)}|${Math.round(containerRect.width)}|${Math.round(containerRect.height)}`;
        if (!seenBoxes.has(key)) {
          const styles = window.getComputedStyle(el);
          seeds.push({
            kind: 'box',
            rect: containerRect,
            borderColor: styles.borderColor,
            backgroundColor: styles.backgroundColor,
            boxShadow: styles.boxShadow === 'none' ? undefined : styles.boxShadow,
          });
          seenBoxes.add(key);
        }
      }
    }
    const ranges = collectTextNodeRangesForElement(el);
    if (ranges.length === 0) continue;
    for (const range of ranges) {
      if (seeds.length >= maxPhysicsElements) break;
      const txt = range.toString();
      const rect = range.getBoundingClientRect();
      if (!txt.trim() || rect.width < 1 || rect.height < 1) {
        range.detach?.();
        continue;
      }
      const k = `${txt}|${Math.round(rect.left)}|${Math.round(rect.top)}|${Math.round(rect.width)}|${Math.round(rect.height)}`;
      if (seen.has(k)) {
        range.detach?.();
        continue;
      }
      seen.add(k);
      seeds.push({ kind: 'char', char: txt, rect });
      range.detach?.();
    }
  }

  const token = `chaos-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const session = createChaosOverlaySession({
    doc,
    token,
    seeds,
    sourcesToHide,
  });

  for (const node of session.elements) {
    node.setAttribute(CHAOS_OWNER_ATTR, 'overlay');
  }

  return session;
}
