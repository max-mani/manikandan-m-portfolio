'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { TerminalCommandBackdrop } from '@/components/shared/TerminalCommandBackdrop';
import { HackerBackground } from '@/components/shared/HackerBackground';

type CyberPageShellProps = {
  children: ReactNode;
  /** Outer wrapper class, e.g. `blogs-theme` or `writeups-theme` for CSS variables. */
  contentClassName?: string;
};

/**
 * Aligns sub-pages with the homepage: body cyber gradient, floating command backdrop, subtle grid.
 */
export function CyberPageShell({ children, contentClassName }: CyberPageShellProps) {
  useEffect(() => {
    const prev = document.body.getAttribute('data-mode');
    document.body.setAttribute('data-mode', 'cyber');
    return () => {
      if (prev) document.body.setAttribute('data-mode', prev);
      else document.body.removeAttribute('data-mode');
    };
  }, []);

  return (
    <>
      <HackerBackground />
      <TerminalCommandBackdrop />
      <div
        className={[
          'relative z-[1] min-h-screen flex flex-col text-[#d8e2f1]',
          contentClassName ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 grid-bg opacity-[0.14] sm:opacity-[0.18]"
        />
        <div className="relative z-[1] flex min-h-screen flex-col">{children}</div>
      </div>
    </>
  );
}
