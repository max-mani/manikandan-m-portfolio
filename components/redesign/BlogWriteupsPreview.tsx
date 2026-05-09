'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, NotebookPen, Flag, Clock, Layers } from 'lucide-react';
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

interface BlogWriteupsPreviewProps {
  posts: BlogPostPreview[];
  events: EventPreview[];
}

export function BlogWriteupsPreview({ posts, events }: BlogWriteupsPreviewProps) {
  return (
    <section id="logbook" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <SectionHeading
          eyebrow="> ./logbook --tail"
          title="Logbook & Writeups"
          description="Where I think out loud and where I document the CTF challenges I've solved. Both are kept raw and honest."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <GlowCard accent="cyan" className="h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-cyan-400/45 bg-cyan-400/10 text-cyan-300">
                  <NotebookPen size={14} />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  Latest Blogs
                </h3>
              </div>
              <p className="text-sm text-white/60 mb-5">
                Reflections on freelancing, building, and the developer mindset.
              </p>

              {posts.length === 0 ? (
                <p className="text-sm text-white/55 font-[family-name:var(--font-share-tech-mono)]">
                  &gt; No posts yet — first one&apos;s queued.
                </p>
              ) : (
                <ul className="space-y-3">
                  {posts.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blogs/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group rounded-lg border border-white/[0.06] hover:border-cyan-400/45 hover:bg-cyan-400/[0.04] p-3 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1 text-[0.65rem] tracking-widest uppercase font-[family-name:var(--font-share-tech-mono)] text-fuchsia-300/85">
                          <span>{p.date}</span>
                          <span className="text-white/30">·</span>
                          <span className="text-cyan-300/85">[{p.tag}]</span>
                        </div>
                        <p className="text-sm font-medium text-white group-hover:text-cyan-200 transition-colors">
                          {p.title}
                        </p>
                        <p className="mt-1 text-xs text-white/55 line-clamp-2">
                          {p.excerpt}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[0.7rem] text-white/45">
                          <Clock size={11} /> {p.readTime} min read
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
                className="mt-5 inline-flex items-center gap-2 text-sm font-[family-name:var(--font-share-tech-mono)] text-cyan-300 hover:text-cyan-200"
              >
                Read all posts <ArrowRight size={14} />
              </Link>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <GlowCard accent="violet" className="h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-fuchsia-400/45 bg-fuchsia-400/10 text-fuchsia-300">
                  <Flag size={14} />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  CTF Writeups
                </h3>
              </div>
              <p className="text-sm text-white/60 mb-5">
                Challenges I&apos;ve cracked, end-to-end attack chains, written so you can replay them.
              </p>

              {events.length === 0 ? (
                <p className="text-sm text-white/55 font-[family-name:var(--font-share-tech-mono)]">
                  &gt; No events published yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {events.slice(0, 3).map((ev) => (
                    <li key={ev.slug}>
                      <Link
                        href={`/wirteups/event/${ev.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group rounded-lg border border-white/[0.06] hover:border-fuchsia-400/45 hover:bg-fuchsia-400/[0.04] p-3 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1 text-[0.65rem] tracking-widest uppercase font-[family-name:var(--font-share-tech-mono)] text-cyan-300/85">
                          <span>EVENT · {ev.year ?? ''}</span>
                          <span className="text-white/30">·</span>
                          <span className="text-fuchsia-300/85">
                            {ev.totalChallenges} chals · {ev.totalPoints} pts
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white group-hover:text-fuchsia-200 transition-colors">
                          {ev.name}
                        </p>
                        {ev.description && (
                          <p className="mt-1 text-xs text-white/55 line-clamp-2">
                            {ev.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-1 text-[0.7rem] text-white/45">
                          <Layers size={11} /> {ev.totalChallenges} challenges
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/wirteups"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-[family-name:var(--font-share-tech-mono)] text-fuchsia-300 hover:text-fuchsia-200"
              >
                Browse all writeups <ArrowRight size={14} />
              </Link>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
