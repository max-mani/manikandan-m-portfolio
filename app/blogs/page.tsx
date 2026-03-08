import BlogsNavbar from '@/components/blogs/BlogsNavbar';
import {
  getAllPosts,
  getAllTags,
  getAverageReadTime,
} from '@/lib/blogs/posts';
import Link from 'next/link';

export default function BlogsHomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const avgReadTime = getAverageReadTime();
  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  const cardStyle = {
    border: '1px solid var(--border)',
    background: 'var(--card)',
    borderRadius: '4px',
  };
  const cardHoverStyle =
    'hover:border-[var(--border-bright)] hover:shadow-[0_0_18px_rgba(0,255,65,0.12)] transition-all';

  return (
    <div className="min-h-screen">
      <BlogsNavbar />

      {/* Hero */}
      <section className="relative pt-16 pb-12 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.03) 25%, rgba(0, 255, 65, 0.03) 26%, transparent 27%), linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.03) 25%, rgba(0, 255, 65, 0.03) 26%, transparent 27%)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p
            className="font-mono text-sm mb-4"
            style={{ color: 'var(--primary)' }}
          >
            &gt; log init --author=&quot;maxim&quot;
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
            style={{ color: 'var(--primary)' }}
          >
            aka Maxim
          </p>
          <p
            className="font-[family-name:var(--font-share-tech-mono)] text-lg mb-8 max-w-2xl"
            style={{ color: 'var(--foreground)' }}
          >
            Developer. Thinker. Occasional chaos agent.
            <br />
            This is my logbook — raw thoughts, life lessons, things I learned the
            hard way, and everything in between.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--cyan)',
              }}
            >
              {posts.length} posts published
            </span>
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--cyan)',
              }}
            >
              {tags.length} categories
            </span>
            <span
              className="font-mono text-sm px-3 py-1 rounded"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--cyan)',
              }}
            >
              {avgReadTime} mins avg read
            </span>
          </div>
        </div>
      </section>

      {/* Latest post */}
      {latestPost && (
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div
              className={`p-6 ${cardHoverStyle}`}
              style={{
                ...cardStyle,
                borderColor: 'var(--cyan)',
                boxShadow: '0 0 24px rgba(0,229,255,0.1)',
              }}
            >
              <p
                className="font-mono text-xs mb-2"
                style={{ color: 'var(--yellow)' }}
              >
                &gt; date: {latestPost.date}
              </p>
              <span
                className="inline-block font-mono text-xs px-2 py-0.5 rounded mb-4"
                style={{
                  border: '1px solid var(--magenta)',
                  color: 'var(--magenta)',
                }}
              >
                {latestPost.tag}
              </span>
              <h2
                className="font-[family-name:var(--font-vt323)] text-2xl md:text-[2.2rem] font-bold mb-4"
                style={{ color: 'var(--primary)' }}
              >
                {latestPost.title}
              </h2>
              <p
                className="font-[family-name:var(--font-share-tech-mono)] text-sm mb-6 line-clamp-2"
                style={{ color: 'var(--foreground)' }}
              >
                &quot;{latestPost.excerpt}&quot;
              </p>
              <div className="flex items-center justify-between">
                <Link
                  href={`/blogs/${latestPost.slug}`}
                  className="font-mono text-sm px-4 py-2 rounded transition-colors hover:bg-[rgba(0,255,65,0.1)]"
                  style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}
                >
                  [ READ MORE → ]
                </Link>
                <span
                  className="font-mono text-sm"
                  style={{ color: 'var(--primary-dim)' }}
                >
                  {latestPost.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts grid */}
      {otherPosts.length > 0 && (
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className={`block p-6 ${cardHoverStyle}`}
                  style={cardStyle}
                >
                  <p
                    className="font-mono text-[0.72rem] mb-2"
                    style={{ color: 'var(--yellow)' }}
                  >
                    &gt; {post.date}
                  </p>
                  <span
                    className="inline-block font-mono text-[0.65rem] px-2 py-0.5 rounded mb-3"
                    style={{
                      border: '1px solid var(--magenta)',
                      color: 'var(--magenta)',
                    }}
                  >
                    [ {post.tag} ]
                  </span>
                  <h3
                    className="font-[family-name:var(--font-vt323)] text-[1.4rem] font-bold mb-2"
                    style={{ color: 'var(--primary)' }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-share-tech-mono)] text-[0.78rem] mb-4 line-clamp-2"
                    style={{ color: 'var(--primary-dim)' }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[0.72rem]"
                      style={{ color: 'var(--primary-dim)' }}
                    >
                      {post.readTime} min read
                    </span>
                    <span
                      className="font-mono text-sm hover:underline"
                      style={{ color: 'var(--cyan)' }}
                    >
                      [ READ → ]
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tags strip */}
      {tags.length > 0 && (
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <p
              className="font-mono text-sm mb-4"
              style={{ color: 'var(--primary-dim)' }}
            >
              &gt; ls ./tags
            </p>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blogs/tags?tag=${tag}`}
                  className="font-mono text-sm px-3 py-1 rounded whitespace-nowrap transition-colors hover:border-[var(--cyan)]"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--cyan)',
                  }}
                >
                  [ {tag} ]
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
          MAXIM.BLOG — personal logbook of Manikandan
        </p>
        <p
          className="font-mono text-sm mb-4"
          style={{ color: 'var(--primary-dim)' }}
        >
          Chennai, India | Est. {new Date().getFullYear()}
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
