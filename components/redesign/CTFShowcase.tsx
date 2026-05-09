'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ctfs } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

const RANK_STYLE = (rank: string) => {
  if (/2nd|second/i.test(rank))
    return 'text-[#ffb300] border-[#ffb300] bg-[#0a140a] shadow-[2px_2px_0_0_#ffb300]';
  if (/1st|first|winner/i.test(rank))
    return 'text-[#00ff41] border-[#00ff41] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41]';
  if (/top 10/i.test(rank))
    return 'text-[#ff00ff] border-[#ff00ff] bg-[#0a140a] shadow-[2px_2px_0_0_#ff00ff]';
  return 'text-[#00e5ff] border-[#00e5ff] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff]';
};

export function CTFShowcase() {
  return (
    <section id="ctf" className="relative py-14 sm:py-20 md:py-28">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="> ./ctf --tail -n 5"
            title="CTF Trophy Cabinet"
            description="Real, public competitions. Real, public scoreboards. Specialties: Reverse Engineering, Web Exploitation, Forensics, OSINT, Crypto, AI/ML security."
          />
          <Link
            href="/wirteups"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 px-3 py-2 border-2 border-[#00ff41] text-[#00ff41] text-[10px] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41] hover:border-[#00e5ff] hover:text-[#00e5ff] hover:shadow-[2px_2px_0_0_#00e5ff] transition-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Read writeups <ArrowRight size={12} />
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
                transition={{ duration: 0.15, delay: idx * 0.04, ease: [1, 0, 0, 1] }}
              >
                <GlowCard accent={idx % 2 === 0 ? 'magenta' : 'cyan'} className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-[#ffb300] bg-[#0a140a] text-[#ffb300] shadow-[2px_2px_0_0_#ffb300]">
                        <Trophy size={14} />
                      </span>
                      <div>
                        <h3 className="text-[12px] font-bold text-[#00ff41] leading-tight">{ctf.name}</h3>
                        <p className="text-[8px] tracking-widest text-[#4caf50] mt-0.5 uppercase">
                          {ctf.platform} · {ctf.year}
                        </p>
                      </div>
                    </div>
                    {ranking && (
                      <span
                        className={[
                          'flex-shrink-0 px-2 py-1 border-2 text-[7px] tracking-widest uppercase',
                          RANK_STYLE(ranking),
                        ].join(' ')}
                      >
                        {ranking.length > 22 ? ranking.slice(0, 22) + '…' : ranking}
                      </span>
                    )}
                  </div>

                  {ctf.description && (
                    <p className="mt-3 text-[10px] leading-[2em] text-[#e8f5e9]/70 line-clamp-3">
                      {ctf.description}
                    </p>
                  )}

                  {ctf.achievements && ctf.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {ctf.achievements.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-[10px] text-[#e8f5e9]/75">
                          <Flag size={10} className="text-[#00e5ff] flex-shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {ctf.domains && ctf.domains.length > 0 && (
                    <div className="mt-3 pt-3 border-t-2 border-[#1a2e1a] flex flex-wrap gap-1">
                      {ctf.domains.map((d) => (
                        <span
                          key={d}
                          className="px-1.5 py-0.5 text-[8px] text-[#00e5ff] bg-[#050a05] border border-[#1a2e1a]"
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
