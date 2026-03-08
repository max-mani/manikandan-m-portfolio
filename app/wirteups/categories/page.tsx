import WriteupsNavbar from '@/components/writeups/Navbar';
import { getAllCategories } from '@/lib/writeups/events';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CTF categories – writeups',
  description:
    'Browse all CTF challenge categories across events and drill into specific writeups.',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  const cardStyle = {
    border: '1px solid var(--border)',
    background: 'var(--card)',
    borderRadius: '4px',
  };
  const cardHoverStyle =
    'hover:border-[var(--cyan)] hover:shadow-[0_0_18px_rgba(0,229,255,0.12)] transition-all';

  return (
    <div className="min-h-screen">
      <WriteupsNavbar />

      <div className="relative pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1
            className="font-[family-name:var(--font-vt323)] text-5xl font-bold mb-4"
            style={{ color: 'var(--primary)' }}
          >
            Categories
          </h1>
          <p
            className="text-lg"
            style={{ color: 'var(--foreground)' }}
          >
            All CTF challenges, grouped by category across events.
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/wirteups/categories/${category.slug}`}
              className={`block p-6 ${cardHoverStyle}`}
              style={cardStyle}
            >
              <h2
                className="font-[family-name:var(--font-vt323)] text-2xl font-bold mb-2"
                style={{ color: 'var(--primary)' }}
              >
                {category.name}
              </h2>
              <p
                className="mb-4 text-sm"
                style={{ color: 'var(--primary-dim)' }}
              >
                {category.challenges.length} challenge
                {category.challenges.length !== 1 ? 's' : ''} • {category.totalPoints} points
              </p>
              <div
                className="font-mono text-xs"
                style={{ color: 'var(--primary-dim)' }}
              >
                ctf://category/{category.slug}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
