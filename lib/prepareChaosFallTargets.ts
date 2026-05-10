/**
 * Granular chaos: split text into char spans + media nodes for physics.
 * `[data-chaos-fall-block]` (HUD) is excluded. Caller runs `cleanup()` before thaw.
 */

function isOnlyCollapsibleWhitespace(text: string): boolean {
  return /^[\s\uFEFF\u200b\u2060]+$/.test(text);
}

function isExcludedNode(node: Node | null): boolean {
  if (!(node instanceof Element)) return false;
  return !!(
    node.closest('[data-pixel-toast-stack],[data-chaos-fall-block]') ||
    node.closest('script,style,noscript,template')
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

/** Upper bound bodies for stable physics on typical hardware. Extra text stays intact. */
const MAX_PHYSICS_ELEMENTS = 1100;

/**
 * Estimated bodies (chars + media) for cooldown — clamps to physics cap semantics.
 */
export function estimateChaosCharCount(doc: Document): number {
  let chars = 0;
  const media = new Set<Element>();

  for (const scope of scopesFromDocument(doc)) {
    const tw = doc.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);
    while (tw.nextNode()) {
      const tx = tw.currentNode;
      if (!(tx instanceof Text)) continue;
      const p = tx.parentElement;
      if (!p || isExcludedNode(p)) continue;
      if (isOnlyCollapsibleWhitespace(tx.data)) continue;
      chars += [...tx.data].length;
    }

    scope
      .querySelectorAll(
        ':scope svg, :scope img, :scope picture, :scope video, :scope canvas',
      )
      .forEach((n) => {
        if (!(n instanceof Element) || isExcludedNode(n)) return;
        if (n.closest('[data-chaos-fall-block]')) return;
        media.add(n);
      });
  }

  const raw = chars + media.size;
  return Math.min(raw, MAX_PHYSICS_ELEMENTS);
}

/** Old name kept for AnimeBotAvatar import paths already updated — use estimateChaosCharCount */
export function estimateChaosPaneCount(doc: Document): number {
  return estimateChaosCharCount(doc);
}

/** @deprecated */
export function estimateGranularChaosTargetCount(doc: Document): number {
  return estimateChaosCharCount(doc);
}

type SplitMeta = {
  parent: HTMLElement;
  groupId: string;
  originalText: string;
};

function directChildChaosSpans(parent: HTMLElement, groupId: string): HTMLElement[] {
  return [...parent.children].filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement &&
      el.tagName === 'SPAN' &&
      el.hasAttribute('data-chaos-char-wrap') &&
      el.getAttribute('data-chaos-split-group') === groupId,
  );
}

function collectSpansForGroupCleanup(meta: SplitMeta, doc: Document): HTMLElement[] {
  const { parent, groupId } = meta;
  if (parent.isConnected) {
    const direct = directChildChaosSpans(parent, groupId);
    if (direct.length > 0) return direct;
  }
  return [...doc.querySelectorAll(`span[data-chaos-split-group="${groupId}"]`)].filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement && el.hasAttribute('data-chaos-char-wrap'),
  );
}

let splitGroupSeed = 0;

/** Split visible text inside chaos scopes until `budget` spans created (remainder unsplit). */
function splitTextIntoCharSpans(doc: Document, splits: SplitMeta[], budget: number): number {
  let made = 0;
  outer: for (const scope of scopesFromDocument(doc)) {
    const walker = doc.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);

    const batch: Text[] = [];
    let n = walker.nextNode();
    while (n) {
      if (n instanceof Text) batch.push(n);
      n = walker.nextNode();
    }

    for (const textNode of batch) {
      if (made >= budget) break outer;

      const parent = textNode.parentElement;
      if (!parent || isExcludedNode(parent)) continue;
      const data = textNode.data;
      if (isOnlyCollapsibleWhitespace(data)) continue;

      const remaining = budget - made;
      if (remaining <= 0) break outer;

      const slice = data.length <= remaining ? data : data.slice(0, remaining);
      const rest = data.length <= remaining ? '' : data.slice(remaining);

      splitGroupSeed += 1;
      const groupId = `c-${splitGroupSeed}`;
      splits.push({
        parent,
        groupId,
        originalText: slice,
      });

      const frag = doc.createDocumentFragment();
      for (const ch of slice) {
        const span = doc.createElement('span');
        span.setAttribute('data-chaos-char-wrap', '');
        span.setAttribute('data-chaos-split-group', groupId);
        span.style.display = 'inline-block';
        span.textContent = ch;
        frag.appendChild(span);
      }

      if (rest) frag.appendChild(doc.createTextNode(rest));
      parent.replaceChild(frag, textNode);

      made += slice.length;
    }
  }

  return made;
}

function collectFallElements(doc: Document): HTMLElement[] {
  const set = new Set<HTMLElement>();

  for (const scope of scopesFromDocument(doc)) {
    scope.querySelectorAll('[data-chaos-char-wrap]').forEach((node) => {
      if (node instanceof HTMLElement) set.add(node);
    });
    scope
      .querySelectorAll(
        ':scope svg, :scope img, :scope picture, :scope video, :scope canvas',
      )
      .forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (isExcludedNode(node)) return;
        if (node.closest('[data-chaos-fall-block]')) return;
        set.add(node);
      });
  }

  return [...set];
}

export function prepareChaosFallTargets(doc: Document): {
  elements: HTMLElement[];
  cleanup: () => void;
} {
  const splitsMeta: SplitMeta[] = [];

  const cleanupSplits = (): void => {
    for (const meta of [...splitsMeta].reverse()) {
      const list = collectSpansForGroupCleanup(meta, doc).filter((el) => el.isConnected);
      if (list.length === 0) continue;

      list.sort((a, b) => {
        const p = a.compareDocumentPosition(b);
        if ((p & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) return -1;
        if ((p & Node.DOCUMENT_POSITION_PRECEDING) !== 0) return 1;
        return 0;
      });

      const insertionParent = list[0].parentElement;
      if (!insertionParent) continue;

      const textNode = doc.createTextNode(meta.originalText);
      insertionParent.insertBefore(textNode, list[0]);
      for (const span of list) {
        span.remove();
      }
    }
    splitsMeta.length = 0;
  };

  splitTextIntoCharSpans(doc, splitsMeta, MAX_PHYSICS_ELEMENTS);
  const elements = collectFallElements(doc);

  return { elements, cleanup: cleanupSplits };
}
