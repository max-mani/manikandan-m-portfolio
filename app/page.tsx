import { HomeClient } from '@/components/redesign/HomeClient';
import { getAllPosts } from '@/lib/blogs/posts';
import { getAllEvents } from '@/lib/writeups/events';
import type { GithubActivityPreview } from '@/components/redesign/BlogWriteupsPreview';

type GithubEvent = {
  type?: string;
  created_at?: string;
  repo?: { name?: string };
  payload?: { commits?: Array<{ message?: string }> };
};

async function getGithubPushActivity(): Promise<GithubActivityPreview[]> {
  try {
    const res = await fetch('https://api.github.com/users/max-mani/events/public', {
      next: { revalidate: 900 },
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return [];
    const events = (await res.json()) as GithubEvent[];
    return events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 5)
      .map((e) => ({
        date: (e.created_at ?? '').slice(0, 10),
        repo: e.repo?.name ?? 'max-mani/unknown',
        message: e.payload?.commits?.[0]?.message ?? 'Updated repository activity',
      }));
  } catch {
    return [];
  }
}

const LOGBOOK_BLOG_SLUGS = [
  'ctf-notes-after-midnight',
  'how-i-scope-side-projects',
  'what-i-learned-from-broken-deploys',
] as const;

export default async function HomePage() {
  const posts = getAllPosts()
    .filter((p) => LOGBOOK_BLOG_SLUGS.includes(p.slug as (typeof LOGBOOK_BLOG_SLUGS)[number]))
    .sort(
      (a, b) =>
        LOGBOOK_BLOG_SLUGS.indexOf(a.slug as (typeof LOGBOOK_BLOG_SLUGS)[number]) -
        LOGBOOK_BLOG_SLUGS.indexOf(b.slug as (typeof LOGBOOK_BLOG_SLUGS)[number])
    )
    .map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    tag: p.tag,
    excerpt: p.excerpt,
    readTime: p.readTime,
  }));

  const events = getAllEvents()
    .filter((e) => e.slug === 'kictf-2026')
    .map((e) => ({
    slug: e.slug,
    name: e.name,
    year: e.year,
    description: e.description,
    totalChallenges: e.totalChallenges,
    totalPoints: e.totalPoints,
  }));
  const activity = await getGithubPushActivity();

  return <HomeClient posts={posts} events={events} activity={activity} />;
}
