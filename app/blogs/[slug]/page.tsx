import BlogsNavbar from '@/components/blogs/BlogsNavbar';
import BlogsMarkdownContent from '@/components/blogs/MarkdownContent';
import { getPostBySlug, getAllPosts } from '@/lib/blogs/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post ? `${post.title} — MAXIM.BLOG` : 'Post not found',
    description: post?.excerpt ?? 'Blog post',
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <BlogsNavbar />

      <article className="max-w-[720px] mx-auto px-4 pt-16 pb-20">
        <div
          className="font-mono text-sm mb-6"
          style={{ color: 'var(--primary-dim)' }}
        >
          <Link href="/blogs" className="hover:underline" style={{ color: 'var(--cyan)' }}>
            blog://home
          </Link>
          {' > '}
          <span>blog://{slug}</span>
        </div>

        <h1
          className="font-[family-name:var(--font-vt323)] text-4xl md:text-[3.5rem] font-bold mb-6"
          style={{ color: 'var(--primary)' }}
        >
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-10">
          <span
            className="font-mono text-sm"
            style={{ color: 'var(--yellow)' }}
          >
            {post.date}
          </span>
          <span
            className="font-mono text-sm"
            style={{ color: 'var(--primary-dim)' }}
          >
            {post.readTime} min read
          </span>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              border: '1px solid var(--magenta)',
              color: 'var(--magenta)',
            }}
          >
            {post.tag}
          </span>
        </div>

        <BlogsMarkdownContent content={post.content} />

        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <Link
            href="/blogs"
            className="font-mono text-sm inline-flex items-center gap-2 hover:underline"
            style={{ color: 'var(--cyan)' }}
          >
            [ ← BACK TO BLOG ]
          </Link>
        </div>
      </article>
    </div>
  );
}
