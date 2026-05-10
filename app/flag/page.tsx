'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const REVEAL_DELAY_MS = 3000;

export default function FlagPage() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRevealed(true);
    }, REVEAL_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-16">
      <section className="pixel-border bg-[var(--surface)] p-6 sm:p-8">
        <p className="term-label">/flag</p>
        {!revealed ? (
          <div className="space-y-3 text-[8px] leading-[2] text-[var(--green)]">
            <p>&gt; 404 — Nothing here.</p>
            <p className="text-[var(--dim)]">...</p>
            <p className="text-[var(--dim)]">...</p>
          </div>
        ) : (
          <div className="space-y-3 text-[8px] leading-[2] text-[var(--green)]">
            <p>&gt; 404 — Nothing here.</p>
            <p className="text-[var(--dim)]">...</p>
            <p className="text-[var(--dim)]">...</p>
            <p>&gt; Wait.</p>
            <p>&gt; Checking /flag/index ...</p>
            <p>&gt; Decrypting payload ...</p>
            <p>&gt; Access granted.</p>
            <p className="pt-2 text-[var(--cyan)]">FLAG{'{'}y0u_f0und_th3_h1dd3n_p4g3{'}'}</p>
            <p>One more flag remains.</p>
            <p>Hint: butterfly_1993.exe left something behind in 1993.</p>
            <p>Navigate to it.</p>
            <Link href="/butterfly_1993" className="inline-block animate-blink text-[var(--amber)]">
              &gt; /butterfly_1993
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
