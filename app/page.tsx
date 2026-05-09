import { HomeClient } from '@/components/redesign/HomeClient';
import { getAllPosts } from '@/lib/blogs/posts';
import { getAllEvents } from '@/lib/writeups/events';

export default function HomePage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    tag: p.tag,
    excerpt: p.excerpt,
    readTime: p.readTime,
  }));

  const events = getAllEvents().map((e) => ({
    slug: e.slug,
    name: e.name,
    year: e.year,
    description: e.description,
    totalChallenges: e.totalChallenges,
    totalPoints: e.totalPoints,
  }));

  return <HomeClient posts={posts} events={events} />;
}
