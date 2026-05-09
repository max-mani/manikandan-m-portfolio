'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ctfs } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

const RANK_STYLE = (rank: string) => {
  if (/2nd|second/i.test(rank)) return 'text-amber-300 border-amber-300/45 bg-amber-300/10';
  if (/1st|first|winner/i.test(rank)) return 'text-yellow-300 border-yellow-300/45 bg-yellow-300/10';
  if (/top 10/i.test(rank)) return 'text-fuchsia-300 border-fuchsia-300/45 bg-fuchsia-400/10';
  return 'text-cyan-300 border-cyan-300/45 bg-cyan-400/10';
};

export function CTFShowcase() {
  return (
    <section id="ctf" className="relative py-20 md:py-28">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="> ./ctf --tail -n 5"
            title="CTF Trophy Cabinet"
            description="Real, public competitions. Real, public scoreboards. Specialties: Reverse Engineering, Web Exploitation, Forensics, OSINT, Crypto, AI/ML security."
          />
          <Link
            href="/wirteups"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-md border border-fuchsia-400/45 text-fuchsia-200 text-sm font-[family-name:var(--font-share-tech-mono)] hover:bg-fuchsia-400/10 hover:border-fuchsia-300 hover:shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all"
          >
            Read writeups <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ctfs.map((ctf, idx) => {
            const ranking = ctf.ranking || ctf.achievements?.[0] || '';
            return (
              <motion.div
                key={ctf.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <GlowCard accent={idx % 2 === 0 ? 'magenta' : 'cyan'} className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-amber-300/40 bg-amber-300/10 text-amber-300">
                        <Trophy size={16} />
                      </span>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white leading-tight">
                          {ctf.name}
                        </h3>
                        <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-widest text-cyan-300/85 mt-0.5">
                          {ctf.platform} · {ctf.year}
                        </p>
                      </div>
                    </div>
                    {ranking && (
                      <span
                        className={[
                          'flex-shrink-0 px-2 py-1 rounded border text-[0.65rem] font-[family-name:var(--font-share-tech-mono)] tracking-widest uppercase',
                          RANK_STYLE(ranking),
                        ].join(' ')}
                      >
                        {ranking.length > 22 ? ranking.slice(0, 22) + '…' : ranking}
                      </span>
                    )}
                  </div>

                  {ctf.description && (
                    <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-3">
                      {ctf.description}
                    </p>
                  )}

                  {ctf.achievements && ctf.achievements.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {ctf.achievements.map((a) => (
                        <li
                          key={a}
                          className="flex items-center gap-2 text-sm text-white/75"
                        >
                          <Flag size={12} className="text-fuchsia-300 flex-shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {ctf.domains && ctf.domains.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                      {ctf.domains.map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded text-[0.65rem] font-[family-name:var(--font-share-tech-mono)] text-fuchsia-200 bg-fuchsia-500/10 border border-fuchsia-400/25"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
