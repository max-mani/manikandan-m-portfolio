'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Github, ArrowUpRight } from 'lucide-react';
import { about, hero, stats, contact } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';
import { CountUpStat } from '@/components/shared/CountUpStat';
import { STEP_EASE, VIEWPORT_ONCE } from '@/lib/pixelMotion';

export function AboutSection() {
  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <SectionHeading
          eyebrow="> ./about --verbose"
          title="Holding Two Worlds Together"
          description="Pre-final year CSE student living at the intersection of building real-world software products and breaking / securing them. Both halves feed each other every day."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.12, ease: STEP_EASE }}
            className="lg:col-span-7"
          >
            <GlowCard accent="violet" className="h-full">
              <p className="term-label uppercase tracking-[0.25em]">&gt; cat /home/maxim/bio.md</p>
              <p className="mt-3 text-[10px] leading-[2em] text-[#e8f5e9]/85">{about.bio}</p>
              <ul className="mt-5 space-y-2">
                {about.summary.map((s) => (
                  <li key={s} className="flex gap-2 text-[10px] leading-[2em] text-[#e8f5e9]/80">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-[#00ff41]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 border-2 border-[#00e5ff] text-[#00e5ff] text-[10px] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff] hover:text-[#00ff41] hover:border-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41] transition-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <Github size={12} />
                  github.com/max-mani
                  <ArrowUpRight size={12} />
                </a>
                <span className="inline-flex items-center gap-2 text-[10px] text-[#4caf50]">
                  <MapPin size={12} className="text-[#00e5ff]" />
                  Madurai · Coimbatore · Chennai, IN
                </span>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.12, delay: 0.05, ease: STEP_EASE }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((s, idx) => (
              <GlowCard
                key={s.label}
                accent={
                  idx === 0 ? 'magenta' : idx === 1 ? 'cyan' : idx === 2 ? 'green' : 'violet'
                }
                interactive
                className="!p-0"
              >
                <div className="p-4">
                  <CountUpStat value={s.value} className="text-[14px] font-bold text-[#00ff41]" />
                  <div className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#4caf50]">
                    {s.label}
                  </div>
                  {s.hint && <p className="mt-2 text-[8px] text-[#e8f5e9]/55 leading-snug">{s.hint}</p>}
                </div>
              </GlowCard>
            ))}

            <GlowCard accent="cyan" className="col-span-2">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center border-2 border-[#00e5ff] bg-[#0a140a] text-[#00e5ff] shadow-[2px_2px_0_0_#00e5ff] flex-shrink-0">
                  <GraduationCap size={14} />
                </span>
                <div>
                  <p className="text-[8px] tracking-[0.25em] text-[#4caf50] uppercase">Education</p>
                  <p className="mt-1 font-bold text-[10px] text-[#e8f5e9]">{about.education.degree}</p>
                  <p className="text-[10px] text-[#e8f5e9]/70">{about.education.institution}</p>
                  <p className="text-[8px] text-[#4caf50] mt-1">
                    {about.education.period} · {about.education.status}
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.12, delay: 0.1, ease: STEP_EASE }}
          className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          {hero.focusAreas.map((area, i) => (
            <div
              key={area}
              className="cyber-card-static px-3 py-3 hover:border-[#00ff41] transition-none"
            >
              <span className="block text-[8px] tracking-[0.2em] text-[#00e5ff] uppercase">
                {String(i + 1).padStart(2, '0')} / FOCUS
              </span>
              <span className="block mt-1 text-[10px] text-[#e8f5e9]/85 leading-snug">{area}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
