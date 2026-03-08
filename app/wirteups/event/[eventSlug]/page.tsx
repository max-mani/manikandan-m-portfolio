import WriteupsNavbar from '@/components/writeups/Navbar';
import { getEventBySlug, getAllEvents } from '@/lib/writeups/events';
import type { Metadata } from 'next';
import Link from 'next/link';
interface PageProps {
  params: Promise<{ eventSlug: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventSlug } = await params;
  const event = getEventBySlug(eventSlug);
  return {
    title: event ? `${event.name} – CTF writeups` : 'CTF event – writeups',
    description:
      event?.description ??
      'Browse CTF challenges, categories and writeups for this event.',
  };
}

export function generateStaticParams() {
  const events = getAllEvents();
  return events.map((e) => ({ eventSlug: e.slug }));
}

function getCategoryColor(name: string) {
  const n = name.toLowerCase();
  if (n.includes('web')) return 'var(--cyan)';
  if (n.includes('crypto')) return 'var(--yellow)';
  if (n.includes('forensic')) return 'var(--magenta)';
  if (n.includes('reverse') || n.includes('pwn')) return 'var(--red)';
  if (n.includes('ai') || n.includes('machine')) return 'var(--magenta)';
  return 'var(--primary-dim)';
}

export default async function EventPage({ params, searchParams }: PageProps) {
  const { eventSlug } = await params;
  const { category: categoryFilter } = await searchParams;
  const event = getEventBySlug(eventSlug);

  if (!event) {
    return (
      <div className="min-h-screen">
        <WriteupsNavbar />
        <div className="pt-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Event not found
            </h1>
            <Link
              href="/wirteups"
              className="hover:underline"
              style={{ color: 'var(--cyan)' }}
            >
              ← Back to events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cardStyle = {
    border: '1px solid var(--border)',
    background: 'var(--card)',
    borderRadius: '4px',
  };
  const cardHoverStyle =
    'hover:border-[var(--cyan)] hover:shadow-[0_0_18px_rgba(0,229,255,0.12)] transition-all';

  const filteredChallenges = categoryFilter
    ? event.challenges.filter(
        (c) => c.category.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    : event.challenges;

  return (
    <div className="min-h-screen">
      <WriteupsNavbar />

      <div className="relative pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/wirteups"
            className="inline-flex items-center gap-2 mb-8 font-mono text-sm hover:underline"
            style={{ color: 'var(--cyan)' }}
          >
            ← Back to events
          </Link>

          <h1
            className="font-[family-name:var(--font-vt323)] text-4xl md:text-[3rem] font-bold mb-4"
            style={{ color: 'var(--cyan)' }}
          >
            {event.name}
          </h1>
          {event.description && (
            <p
              className="text-lg mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              {event.description}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mb-8">
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--cyan)',
                color: 'var(--cyan)',
              }}
            >
              {event.totalChallenges} challenges
            </span>
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--cyan)',
                color: 'var(--cyan)',
              }}
            >
              {event.totalPoints} pts
            </span>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href={`/wirteups/event/${event.slug}`}
              className="font-mono text-sm px-4 py-2 rounded transition-colors"
              style={{
                border: '1px solid var(--border)',
                background: !categoryFilter
                  ? 'rgba(0,229,255,0.1)'
                  : 'transparent',
                color: !categoryFilter ? 'var(--cyan)' : 'var(--primary-dim)',
                borderColor: !categoryFilter ? 'var(--cyan)' : undefined,
              }}
            >
              [ All ]
            </Link>
            {event.categories.map((cat) => {
              const isActive =
                categoryFilter?.toLowerCase() === cat.slug.toLowerCase();
              return (
                <Link
                  key={cat.slug}
                  href={`/wirteups/event/${event.slug}?category=${cat.slug}`}
                  className="font-mono text-sm px-4 py-2 rounded transition-colors"
                  style={{
                    border: '1px solid var(--border)',
                    background: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
                    color: isActive ? 'var(--cyan)' : 'var(--primary-dim)',
                    borderColor: isActive ? 'var(--cyan)' : undefined,
                  }}
                >
                  [ {cat.name} ]
                </Link>
              );
            })}
          </div>

          {/* Challenges grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredChallenges.map((challenge) => (
              <Link
                key={challenge.slug}
                href={`/wirteups/event/${event.slug}/${challenge.slug}`}
                className={`block p-6 ${cardHoverStyle}`}
                style={cardStyle}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      border: '1px solid var(--border)',
                      color: getCategoryColor(challenge.category),
                    }}
                  >
                    {challenge.category.toUpperCase()}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: 'var(--yellow)' }}
                  >
                    {challenge.points} pts
                  </span>
                </div>
                <h3
                  className="font-[family-name:var(--font-vt323)] text-xl font-bold mb-2"
                  style={{ color: 'var(--primary)' }}
                >
                  {challenge.title}
                </h3>
                <p
                  className="font-mono text-sm line-clamp-2 mb-4"
                  style={{ color: 'var(--primary-dim)' }}
                >
                  {challenge.excerpt}
                </p>
                <span
                  className="font-mono text-sm"
                  style={{ color: 'var(--cyan)' }}
                >
                  [ VIEW WRITEUP → ]
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
