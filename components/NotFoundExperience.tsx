import Link from 'next/link';
import { Terminal404 } from '@/components/Terminal404';

export function NotFoundExperience() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="pixel-border mb-6 bg-[var(--surface)] p-4 sm:p-6">
        <h1 className="mb-3 text-[10px] leading-[2] sm:text-[12px]">404 — DESTINATION NOT FOUND</h1>
        <p className="text-[8px] leading-[2] text-[var(--text)] sm:text-[9px]">
          {'> '}The page you requested does not exist.
        </p>
        <p className="text-[8px] leading-[2] text-[var(--dim)] sm:text-[9px]">
          {'> '}But since you&apos;re here... check the terminal.
        </p>
      </section>

      <section className="mb-6">
        <Terminal404 />
      </section>

      <div className="pixel-border bg-[var(--surface)] p-3 sm:p-4">
        <Link href="/" className="text-[8px] leading-[2] sm:text-[9px]">
          {'[ <- Back to home ]'}
        </Link>
      </div>
    </main>
  );
}
