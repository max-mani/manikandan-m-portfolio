/**
 * Chaos falls coarse UI panes (navbar, each top-level main section, footer) so
 * headers, boxes, and <video> move with their parent. `[data-chaos-fall-block]`
 * backdrops stay visible.
 */

/**
 * Rough pane count for avatar cooldown (navbar + main sections + footer).
 */
export function estimateChaosPaneCount(doc: Document): number {
  let n = 0;
  const nav = doc.querySelector('[data-chaos-fall-root="navbar"]');
  if (nav) n += 1;
  const main = doc.querySelector('main');
  if (main) n += main.children.length;
  const footer = doc.querySelector('footer');
  if (footer) n += 1;
  return Math.max(1, n);
}

/** @deprecated Use estimateChaosPaneCount */
export function estimateGranularChaosTargetCount(doc: Document): number {
  return estimateChaosPaneCount(doc);
}

function collectPaneElements(doc: Document): Element[] {
  const out: Element[] = [];
  const nav = doc.querySelector('[data-chaos-fall-root="navbar"]');
  if (nav instanceof HTMLElement) out.push(nav);

  const main = doc.querySelector('main');
  if (main instanceof HTMLElement) {
    for (let i = 0; i < main.children.length; i++) {
      const c = main.children[i];
      if (c instanceof HTMLElement) out.push(c);
    }
  }

  const footer = doc.querySelector('footer');
  if (footer instanceof HTMLElement) out.push(footer);

  return out;
}

export function prepareChaosFallTargets(doc: Document): {
  elements: Element[];
  cleanup: () => void;
} {
  const elements = collectPaneElements(doc);

  return {
    elements,
    cleanup: () => {
      /* Pane-only — no text-node merge */
    },
  };
}
