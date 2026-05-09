'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experience } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <SectionHeading
          eyebrow="> ./experience --tail"
          title="Where I've Built Things"
          description="From the Aeromodelling Club workbench to live AI/safety projects, and a Play-Store-published mobile app — here's the run history."
        />

        <ol className="mt-12 relative">
          <span
            aria-hidden
            className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-fuchsia-400/40 to-transparent"
          />

          {experience.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                className={[
                  'relative pl-12 md:pl-0 mb-10 md:mb-14 md:grid md:grid-cols-2 md:gap-10',
                ].join(' ')}
              >
                <span
                  aria-hidden
                  className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/60 bg-[#080a16] shadow-[0_0_18px_rgba(0,229,255,0.45)]"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                </span>

                <div
                  className={[
                    'cyber-card-static p-5 md:p-6 transition-colors hover:border-cyan-400/45',
                    isLeft ? 'md:col-start-1' : 'md:col-start-2',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-fuchsia-400/45 bg-fuchsia-400/10 text-fuchsia-300">
                      <Briefcase size={12} />
                    </span>
                    <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.3em] uppercase text-fuchsia-300/85">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-cyan-300/90 font-[family-name:var(--font-share-tech-mono)]">
                    @ {exp.company}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {exp.description.slice(0, 4).map((d, i) => (
                      <li
                        key={i}
                        className="text-sm text-white/70 leading-relaxed flex gap-2"
                      >
                        <span className="mt-2 inline-block h-1 w-1 rounded-full bg-cyan-300/80 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[0.7rem] font-[family-name:var(--font-share-tech-mono)] text-cyan-200 bg-cyan-500/10 border border-cyan-400/25"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
