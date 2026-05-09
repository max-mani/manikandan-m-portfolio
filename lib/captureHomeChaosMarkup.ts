/**
 * Serializes the home shell that chaos mutates. Order matches visual stacking.
 * Only used on the client after the live React tree has painted.
 */
export function captureHomeChaosMarkup(doc: Document): string {
  const parts: string[] = [];
  const navbar = doc.querySelector('[data-chaos-fall-root="navbar"]');
  if (navbar instanceof HTMLElement) parts.push(navbar.outerHTML);
  const main = doc.querySelector('main');
  if (main instanceof HTMLElement) parts.push(main.outerHTML);
  const footer = doc.querySelector('footer');
  if (footer instanceof HTMLElement) parts.push(footer.outerHTML);
  return parts.join('');
}
