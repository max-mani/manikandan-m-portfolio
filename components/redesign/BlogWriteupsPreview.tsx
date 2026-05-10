'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, NotebookPen, Flag, Clock, Layers, GitCommitHorizontal } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

export interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readTime: number;
}

export interface EventPreview {
  slug: string;
  name: string;
  year?: number;
  description?: string;
  totalChallenges: number;
  totalPoints: number;
}

export interface GithubActivityPreview {
  date: string;
  repo: string;
  message: string;
}

interface BlogWriteupsPreviewProps {
  posts: BlogPostPreview[];
  events: EventPreview[];
  activity: GithubActivityPreview[];
}

const cardLink =
  'block group border-2 border-[#1a2e1a] bg-[#050a05] p-3 shadow-[2px_2px_0_0_#1a2e1a] hover:border-[#00e5ff] hover:shadow-[2px_2px_0_0_#00e5ff] transition-none';

export function BlogWriteupsPreview({ posts, events, activity }: BlogWriteupsPreviewProps) {
  return (
    <section id="logbook" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <SectionHeading
          eyebrow="> ./logbook --tail"
          title="Logbook & Writeups"
          description="Where I think out loud and where I document the CTF challenges I've solved. Both are kept raw and honest."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, ease: [1, 0, 0, 1] }}
          >
            <GlowCard accent="cyan" className="h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-8 w-8 items-center justify-center border-2 border-[#00e5ff] bg-[#0a140a] text-[#00e5ff] shadow-[2px_2px_0_0_#00e5ff]">
                  <NotebookPen size={12} />
                </span>
                <h3 className="text-[12px] font-bold text-[#00ff41]">Latest Blogs</h3>
              </div>
              <p className="text-[10px] text-[#e8f5e9]/60 mb-4">
                Reflections on freelancing, building, and the developer mindset.
              </p>

              {posts.length === 0 ? (
                <p className="text-[10px] text-[#4caf50]">&gt; No posts yet — first one&apos;s queued.</p>
              ) : (
                <ul className="space-y-2">
                  {posts.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blogs/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardLink}
                      >
                        <div className="flex items-center gap-2 mb-1 text-[8px] tracking-widest uppercase text-[#4caf50]">
                          <span>{p.date}</span>
                          <span className="text-[#1a2e1a]">·</span>
                          <span className="text-[#00e5ff]">[{p.tag}]</span>
                        </div>
                        <p className="text-[10px] font-bold text-[#e8f5e9] group-hover:text-[#00ff41] transition-none">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[8px] text-[#e8f5e9]/55 line-clamp-2">{p.excerpt}</p>
                        <div className="mt-2 flex items-center gap-1 text-[8px] text-[#4caf50]">
                          <Clock size={10} /> {p.readTime} min read
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/blogs"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[10px] text-[#00e5ff] hover:text-[#00ff41] transition-none"
              >
                Read all posts <ArrowRight size={12} />
              </Link>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, delay: 0.05, ease: [1, 0, 0, 1] }}
          >
            <GlowCard accent="violet" className="h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-8 w-8 items-center justify-center border-2 border-[#00ff41] bg-[#0a140a] text-[#00ff41] shadow-[2px_2px_0_0_#00ff41]">
                  <Flag size={12} />
                </span>
                <h3 className="text-[12px] font-bold text-[#00ff41]">CTF Writeups</h3>
              </div>
              <p className="text-[10px] text-[#e8f5e9]/60 mb-4">
                Challenges I&apos;ve cracked, end-to-end attack chains, written so you can replay them.
              </p>

              {events.length === 0 ? (
                <p className="text-[10px] text-[#4caf50]">&gt; No events published yet.</p>
              ) : (
                <ul className="space-y-2">
                  {events.slice(0, 3).map((ev) => (
                    <li key={ev.slug}>
                      <Link
                        href={`/writeups/event/${ev.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardLink}
                      >
                        <div className="flex items-center gap-2 mb-1 text-[8px] tracking-widest uppercase text-[#4caf50]">
                          <span>EVENT · {ev.year ?? ''}</span>
                          <span className="text-[#1a2e1a]">·</span>
                          <span className="text-[#00e5ff]">
                            {ev.totalChallenges} chals · {ev.totalPoints} pts
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-[#e8f5e9] group-hover:text-[#00ff41] transition-none">
                          {ev.name}
                        </p>
                        {ev.description && (
                          <p className="mt-1 text-[8px] text-[#e8f5e9]/55 line-clamp-2">
                            {ev.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-1 text-[8px] text-[#4caf50]">
                          <Layers size={10} /> {ev.totalChallenges} challenges
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/writeups"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[10px] text-[#00ff41] hover:text-[#00e5ff] transition-none"
              >
                Browse all writeups <ArrowRight size={12} />
              </Link>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, delay: 0.1, ease: [1, 0, 0, 1] }}
          >
            <GlowCard accent="green" className="h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-8 w-8 items-center justify-center border-2 border-[#4caf50] bg-[#0a140a] text-[#4caf50] shadow-[2px_2px_0_0_#4caf50]">
                  <GitCommitHorizontal size={12} />
                </span>
                <h3 className="text-[12px] font-bold text-[#00ff41]">GitHub Activity</h3>
              </div>
              <p className="text-[10px] text-[#e8f5e9]/60 mb-4">
                Fresh push logs from GitHub so this section never goes stale.
              </p>

              {activity.length === 0 ? (
                <p className="text-[10px] text-[#4caf50]">
                  [SYS] GitHub activity unavailable right now. Check back in a bit.
                </p>
              ) : (
                <ul className="space-y-2">
                  {activity.slice(0, 5).map((item, idx) => (
                    <li key={`${item.repo}-${item.date}-${idx}`} className={cardLink}>
                      <p className="text-[8px] tracking-widest uppercase text-[#4caf50]">[{item.date}]</p>
                      <p className="mt-1 text-[10px] text-[#e8f5e9]">Pushed to {item.repo}</p>
                      <p className="mt-1 text-[8px] text-[#00e5ff] line-clamp-2">&quot;{item.message}&quot;</p>
                    </li>
                  ))}
                </ul>
              )}
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
