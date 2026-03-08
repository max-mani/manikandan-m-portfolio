import WriteupsNavbar from '@/components/writeups/Navbar';
import { getAllCategories } from '@/lib/writeups/events';
import type { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  return {
    title: category ? `${category.name} – CTF category` : 'CTF category – challenges',
    description:
      category != null
        ? `All CTF challenges in the ${category.name} category across your events.`
        : 'CTF challenges for this category.',
  };
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen">
        <WriteupsNavbar />
        <div className="pt-32 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Category not found
            </h1>
            <Link
              href="/wirteups/categories"
              className="hover:underline"
              style={{ color: 'var(--cyan)' }}
            >
              ← Back to categories
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

  return (
    <div className="min-h-screen">
      <WriteupsNavbar />

      <div className="relative pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/wirteups/categories"
            className="inline-flex items-center gap-2 mb-8 font-mono text-sm hover:underline"
            style={{ color: 'var(--cyan)' }}
          >
            ← Back to categories
          </Link>
          <h1
            className="font-[family-name:var(--font-vt323)] text-5xl font-bold mb-4"
            style={{ color: 'var(--primary)' }}
          >
            {category.name}
          </h1>
          <p
            className="text-lg"
            style={{ color: 'var(--primary-dim)' }}
          >
            {category.challenges.length} challenge
            {category.challenges.length !== 1 ? 's' : ''} • {category.totalPoints} points
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {category.challenges.map((challenge) => (
              <Link
                key={challenge.slug}
                href={`/wirteups/event/${challenge.eventSlug}/${challenge.slug}`}
                className={`block p-6 ${cardHoverStyle}`}
                style={cardStyle}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div
                      className="text-xs font-mono mb-1"
                      style={{ color: 'var(--primary-dim)' }}
                    >
                      {challenge.points} pts • {challenge.eventName}
                    </div>
                    <h3
                      className="font-[family-name:var(--font-vt323)] text-2xl font-bold mb-2"
                      style={{ color: 'var(--primary)' }}
                    >
                      {challenge.title}
                    </h3>
                    <p
                      className="line-clamp-2 mb-3"
                      style={{ color: 'var(--primary-dim)' }}
                    >
                      {challenge.excerpt}
                    </p>
                  </div>
                  <span
                    className="font-mono text-sm flex-shrink-0"
                    style={{ color: 'var(--cyan)' }}
                  >
                    [ VIEW → ]
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
