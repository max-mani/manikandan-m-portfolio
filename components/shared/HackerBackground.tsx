'use client';

/**
 * Fixed atmospheric layers for the homepage — grid, glow, matrix columns, vignette.
 * Sits behind TerminalCommandBackdrop (z-0) and main content (z-1).
 */
export function HackerBackground() {
  return (
    <div className="hacker-bg-root pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="hacker-bg-glow" />
      <div className="hacker-bg-grid" />
      <div className="hacker-bg-perspective" />
      <div className="hacker-bg-matrix" />
      <div className="hacker-bg-noise" />
      <div className="hacker-bg-vignette" />
      <div className="hacker-bg-corners" />
    </div>
  );
}
