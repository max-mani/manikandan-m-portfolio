'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Github, ArrowUpRight } from 'lucide-react';
import { about, hero, stats, contact } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <GlowCard accent="violet" className="h-full">
              <p className="font-[family-name:var(--font-share-tech-mono)] text-xs uppercase tracking-[0.3em] text-fuchsia-300/85">
                &gt; cat /home/maxim/bio.md
              </p>
              <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed font-[family-name:var(--font-body)]">
                {about.bio}
              </p>
              <ul className="mt-6 space-y-3">
                {about.summary.map((s) => (
                  <li key={s} className="flex gap-3 text-sm md:text-base text-white/75">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00e5ff] flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href={contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-400/40 text-cyan-300 text-sm font-[family-name:var(--font-share-tech-mono)] hover:bg-cyan-400/10 hover:border-cyan-300 hover:shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all"
                >
                  <Github size={14} />
                  github.com/max-mani
                  <ArrowUpRight size={14} />
                </a>
                <span className="inline-flex items-center gap-2 text-sm text-white/55 font-[family-name:var(--font-share-tech-mono)]">
                  <MapPin size={14} className="text-fuchsia-300" />
                  Madurai · Coimbatore · Chennai, IN
                </span>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((s, idx) => (
              <GlowCard
                key={s.label}
                accent={
                  idx === 0
                    ? 'magenta'
                    : idx === 1
                    ? 'cyan'
                    : idx === 2
                    ? 'green'
                    : 'violet'
                }
                interactive
                className="!p-0"
              >
                <div className="p-5">
                  <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-gradient-cyber">
                    {s.value}
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] uppercase tracking-[0.25em] text-cyan-300/85">
                    {s.label}
                  </div>
                  {s.hint && (
                    <p className="mt-2 text-xs text-white/55 leading-snug">{s.hint}</p>
                  )}
                </div>
              </GlowCard>
            ))}

            <GlowCard accent="cyan" className="col-span-2">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/50 bg-cyan-400/10 text-cyan-300 flex-shrink-0">
                  <GraduationCap size={16} />
                </span>
                <div>
                  <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.68rem] tracking-[0.3em] text-cyan-300/85 uppercase">
                    Education
                  </p>
                  <p className="mt-1 font-medium text-white">
                    {about.education.degree}
                  </p>
                  <p className="text-sm text-white/65">
                    {about.education.institution}
                  </p>
                  <p className="text-xs text-white/45 mt-1 font-[family-name:var(--font-share-tech-mono)]">
                    {about.education.period} · {about.education.status}
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          {hero.focusAreas.map((area, i) => (
            <div
              key={area}
              className="cyber-card-static px-4 py-3 hover:border-cyan-400/40 transition-colors"
            >
              <span className="block font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] text-fuchsia-300/85">
                {String(i + 1).padStart(2, '0')} / FOCUS
              </span>
              <span className="block mt-1 text-sm text-white/85 leading-snug">
                {area}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
