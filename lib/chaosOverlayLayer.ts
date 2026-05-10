type OverlaySeed =
  | {
      kind: 'char';
      char: string;
      rect: DOMRect;
    }
  | {
      kind: 'box';
      rect: DOMRect;
      borderColor?: string;
      backgroundColor?: string;
      boxShadow?: string;
    }
  | {
      kind: 'sprite';
      src: string;
      rect: DOMRect;
      alt?: string;
    };

type HiddenSource = {
  el: HTMLElement;
  textHidden: boolean;
};

export type ChaosOverlaySession = {
  elements: HTMLElement[];
  cleanup: () => void;
};

const OWNER_ATTR = 'data-chaos-owner';
const SOURCE_TOKEN_ATTR = 'data-chaos-source-token';

function createOverlayRoot(doc: Document, token: string): HTMLDivElement {
  const root = doc.createElement('div');
  root.setAttribute('data-chaos-overlay-root', token);
  root.setAttribute(OWNER_ATTR, 'overlay-root');
  root.className = 'chaos-overlay-root';
  doc.body.appendChild(root);
  return root;
}

function createCharNode(doc: Document, seed: Extract<OverlaySeed, { kind: 'char' }>): HTMLElement {
  const node = doc.createElement('span');
  node.setAttribute(OWNER_ATTR, 'overlay');
  node.className = 'chaos-overlay-char';
  node.textContent = seed.char;
  node.style.left = `${seed.rect.left}px`;
  node.style.top = `${seed.rect.top}px`;
  node.style.width = `${Math.max(1, seed.rect.width)}px`;
  node.style.height = `${Math.max(1, seed.rect.height)}px`;
  node.style.fontSize = `${Math.max(8, Math.round(seed.rect.height))}px`;
  return node;
}

function createSpriteNode(doc: Document, seed: Extract<OverlaySeed, { kind: 'sprite' }>): HTMLElement {
  const node = doc.createElement('div');
  node.setAttribute(OWNER_ATTR, 'overlay');
  node.className = 'chaos-overlay-sprite';
  node.setAttribute('aria-label', seed.alt ?? '');
  node.style.left = `${seed.rect.left}px`;
  node.style.top = `${seed.rect.top}px`;
  node.style.width = `${Math.max(2, seed.rect.width)}px`;
  node.style.height = `${Math.max(2, seed.rect.height)}px`;
  node.style.backgroundImage = `url("${seed.src}")`;
  node.style.backgroundSize = 'cover';
  node.style.backgroundPosition = 'center';
  return node;
}

function createBoxNode(doc: Document, seed: Extract<OverlaySeed, { kind: 'box' }>): HTMLElement {
  const node = doc.createElement('div');
  node.setAttribute(OWNER_ATTR, 'overlay');
  node.className = 'chaos-overlay-box';
  node.style.left = `${seed.rect.left}px`;
  node.style.top = `${seed.rect.top}px`;
  node.style.width = `${Math.max(2, seed.rect.width)}px`;
  node.style.height = `${Math.max(2, seed.rect.height)}px`;
  if (seed.borderColor) node.style.borderColor = seed.borderColor;
  if (seed.backgroundColor) node.style.backgroundColor = seed.backgroundColor;
  if (seed.boxShadow) node.style.boxShadow = seed.boxShadow;
  return node;
}

export function createChaosOverlaySession(opts: {
  doc: Document;
  token: string;
  seeds: OverlaySeed[];
  sourcesToHide: HTMLElement[];
}): ChaosOverlaySession {
  const { doc, token, seeds, sourcesToHide } = opts;
  const root = createOverlayRoot(doc, token);
  const hidden: HiddenSource[] = [];
  const elements: HTMLElement[] = [];

  for (const source of sourcesToHide) {
    if (!source.isConnected) continue;
    if (source.getAttribute(SOURCE_TOKEN_ATTR) === token) continue;
    const textHidden = source.hasAttribute('data-chaos-include');
    hidden.push({ el: source, textHidden });
    if (textHidden) source.setAttribute('data-chaos-source-text-hidden', 'true');
    else source.style.visibility = 'hidden';
    source.setAttribute(SOURCE_TOKEN_ATTR, token);
  }

  for (const seed of seeds) {
    const node =
      seed.kind === 'sprite'
        ? createSpriteNode(doc, seed)
        : seed.kind === 'box'
          ? createBoxNode(doc, seed)
          : createCharNode(doc, seed);
    root.appendChild(node);
    elements.push(node);
  }

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;

    for (const item of hidden) {
      if (!item.el.isConnected) continue;
      if (item.textHidden) item.el.removeAttribute('data-chaos-source-text-hidden');
      else item.el.style.removeProperty('visibility');
      item.el.removeAttribute(SOURCE_TOKEN_ATTR);
    }

    root.remove();
  };

  return { elements, cleanup };
}

