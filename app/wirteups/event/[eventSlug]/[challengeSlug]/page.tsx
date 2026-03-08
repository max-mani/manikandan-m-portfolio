import WriteupsNavbar from '@/components/writeups/Navbar';
import WriteupsMarkdownContent from '@/components/writeups/MarkdownContent';
import {
  getChallengeByEventAndSlug,
  getEventBySlug,
  getAllEvents,
} from '@/lib/writeups/events';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ eventSlug: string; challengeSlug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { eventSlug, challengeSlug } = await params;
  const challenge = getChallengeByEventAndSlug(eventSlug, challengeSlug);
  return {
    title: challenge
      ? `${challenge.title} — ${challenge.eventName}`
      : 'Challenge not found',
    description: challenge?.excerpt ?? 'CTF challenge writeup',
  };
}

export function generateStaticParams() {
  const events = getAllEvents();
  const params: { eventSlug: string; challengeSlug: string }[] = [];
  for (const e of events) {
    const event = getEventBySlug(e.slug);
    if (!event) continue;
    for (const c of event.challenges) {
      params.push({ eventSlug: event.slug, challengeSlug: c.slug });
    }
  }
  return params;
}

export default async function ChallengePage({ params }: PageProps) {
  const { eventSlug, challengeSlug } = await params;
  const challenge = getChallengeByEventAndSlug(eventSlug, challengeSlug);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <WriteupsNavbar />

      <article className="max-w-4xl mx-auto px-4 pt-16 pb-20">
        <div
          className="font-mono text-sm mb-6"
          style={{ color: 'var(--primary-dim)' }}
        >
          ctf://events/{eventSlug}/{challengeSlug}
        </div>

        <h1
          className="font-[family-name:var(--font-vt323)] text-4xl md:text-[3rem] font-bold mb-4"
          style={{ color: 'var(--primary)' }}
        >
          {challenge.title}
        </h1>
        <div
          className="w-full h-px mb-8"
          style={{ background: 'var(--border)' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 font-mono text-sm">
          <div>
            <span style={{ color: 'var(--primary-dim)' }}>Event </span>
            <span style={{ color: 'var(--foreground)' }}>{challenge.eventName}</span>
          </div>
          <div>
            <span style={{ color: 'var(--primary-dim)' }}>Category </span>
            <span style={{ color: 'var(--foreground)' }}>{challenge.category}</span>
          </div>
          <div>
            <span style={{ color: 'var(--primary-dim)' }}>Points </span>
            <span style={{ color: 'var(--yellow)' }}>{challenge.points}</span>
          </div>
          <div>
            <span style={{ color: 'var(--primary-dim)' }}>Status </span>
            <span
              style={{
                color: 'var(--primary)',
                textShadow: '0 0 8px rgba(0,255,65,0.5)',
              }}
            >
              ✓ SOLVED
            </span>
          </div>
        </div>

        <div
          className="w-full h-px mb-10"
          style={{ background: 'var(--border)' }}
        />

        <WriteupsMarkdownContent content={challenge.content} />

        {/* Flag box */}
        {challenge.flag && (
          <div className="mt-10">
            <p
              className="font-mono text-sm mb-2"
              style={{ color: 'var(--primary)' }}
            >
              &gt; Flag
            </p>
            <div
              className="font-[family-name:var(--font-vt323)] p-4 rounded"
              style={{
                border: '1px solid var(--cyan)',
                background: 'rgba(0,229,255,0.05)',
                color: 'var(--cyan)',
                boxShadow: '0 0 16px rgba(0,229,255,0.15)',
              }}
            >
              {challenge.flag}
            </div>
          </div>
        )}

        <div
          className="mt-16 pt-8 border-t flex justify-start"
          style={{ borderColor: 'var(--border)' }}
        >
          <Link
            href={`/wirteups/event/${eventSlug}`}
            className="font-mono text-sm inline-flex items-center gap-2 hover:underline"
            style={{ color: 'var(--cyan)' }}
          >
            [ ← BACK TO EVENT ]
          </Link>
        </div>
      </article>
    </div>
  );
}
