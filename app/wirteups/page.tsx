import WriteupsNavbar from '@/components/writeups/Navbar';
import { getAllEvents, getAllCategories } from '@/lib/writeups/events';
import Link from 'next/link';

export default function WriteupsHomePage() {
  const events = getAllEvents();
  const categories = getAllCategories();
  const totalChallenges = events.reduce((sum, e) => sum + e.totalChallenges, 0);

  const cardStyle = {
    border: '1px solid var(--border)',
    background: 'var(--card)',
    borderRadius: '4px',
  };
  const cardHoverStyle =
    'hover:border-[var(--cyan)] hover:shadow-[0_0_18px_rgba(0,229,255,0.12)] transition-all';

  const getCategoryColor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('web')) return 'var(--cyan)';
    if (n.includes('crypto')) return 'var(--yellow)';
    if (n.includes('forensic')) return 'var(--magenta)';
    if (n.includes('reverse') || n.includes('pwn')) return 'var(--red)';
    return 'var(--primary-dim)';
  };

  return (
    <div className="min-h-screen">
      <WriteupsNavbar />

      {/* Hero */}
      <section className="relative pt-16 pb-12 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(30deg, transparent 48%, rgba(0, 229, 255, 0.02) 50%, transparent 52%), linear-gradient(-30deg, transparent 48%, rgba(0, 229, 255, 0.02) 50%, transparent 52%)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p
            className="font-mono text-sm mb-4"
            style={{ color: 'var(--primary)' }}
          >
            &gt; whoami --ctf
          </p>
          <h1
            className="font-[family-name:var(--font-vt323)] text-5xl md:text-[5rem] font-bold mb-2"
            style={{
              color: 'var(--primary)',
              textShadow: '0 0 20px rgba(0,255,65,0.4)',
            }}
          >
            MANIKANDAN
          </h1>
          <p
            className="font-mono text-lg mb-4"
            style={{ color: 'var(--cyan)' }}
          >
            CTF Player | Solo
          </p>
          <p
            className="font-[family-name:var(--font-share-tech-mono)] text-lg mb-8 max-w-2xl"
            style={{ color: 'var(--foreground)' }}
          >
            I break things for fun (and learning). These are my documented
            solutions — the rabbit holes, the wrong turns, and the &quot;aha&quot;
            moments.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--cyan)',
                color: 'var(--cyan)',
              }}
            >
              {totalChallenges} challenges solved
            </span>
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--cyan)',
                color: 'var(--cyan)',
              }}
            >
              {events.length} events
            </span>
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--cyan)',
                color: 'var(--cyan)',
              }}
            >
              {categories.length} categories
            </span>
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section id="events" className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-[family-name:var(--font-vt323)] text-2xl md:text-[1.8rem] font-bold mb-8"
            style={{ color: 'var(--primary)' }}
          >
            &gt; ls ./events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.slug}
                href={`/wirteups/event/${event.slug}`}
                className={`block p-6 ${cardHoverStyle}`}
                style={cardStyle}
              >
                <p
                  className="font-mono text-[0.65rem] mb-2"
                  style={{ color: 'var(--primary-dim)' }}
                >
                  ctf://events/{event.slug}
                </p>
                <h3
                  className="font-[family-name:var(--font-vt323)] text-2xl font-bold mb-4"
                  style={{ color: 'var(--cyan)' }}
                >
                  {event.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--primary)',
                    }}
                  >
                    {event.totalChallenges} challenges
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--primary)',
                    }}
                  >
                    {event.totalPoints} pts
                  </span>
                </div>
                {event.description && (
                  <p
                    className="font-mono text-sm line-clamp-2"
                    style={{ color: 'var(--primary-dim)' }}
                  >
                    {event.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories strip */}
      {categories.length > 0 && (
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-[family-name:var(--font-vt323)] text-xl font-bold mb-4"
              style={{ color: 'var(--primary)' }}
            >
              &gt; ls ./categories
            </h2>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/wirteups/categories/${cat.slug}`}
                  className="font-mono text-sm px-3 py-1 rounded whitespace-nowrap transition-colors hover:border-[var(--cyan)]"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--cyan)',
                  }}
                >
                  [ {cat.name} ]
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="border-t py-12 px-4 text-center"
        style={{ borderColor: 'var(--border)' }}
      >
        <p
          className="font-mono text-sm mb-2"
          style={{ color: 'var(--primary-dim)' }}
        >
          MAXIM.CTF — solo CTF writeups by Manikandan
        </p>
        <p
          className="font-mono text-sm mb-4"
          style={{ color: 'var(--primary-dim)' }}
        >
          © {new Date().getFullYear()} — All solutions are for educational purposes.
        </p>
        <Link
          href="/"
          className="font-mono text-sm hover:underline"
          style={{ color: 'var(--cyan)' }}
        >
          [ back to terminal ]
        </Link>
      </footer>
    </div>
  );
}
