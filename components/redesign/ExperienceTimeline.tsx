'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { STEP_EASE, VIEWPORT_ONCE } from '@/lib/pixelMotion';
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
            className="absolute left-5 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#00ff41]/70 via-[#00e5ff]/50 to-transparent"
          />

          {experience.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.12, delay: idx * 0.06, ease: STEP_EASE }}
                className="relative pl-12 md:pl-0 mb-8 md:mb-12 md:grid md:grid-cols-2 md:gap-10"
              >
                <span
                  aria-hidden
                  className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-1.5 inline-flex h-5 w-5 items-center justify-center border-2 border-[#00e5ff] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff]"
                >
                  <span className="h-1.5 w-1.5 bg-[#00ff41] animate-pulse" />
                </span>

                <div
                  className={[
                    'cyber-card-static p-4 md:p-5 hover:border-[#00ff41] transition-none',
                    isLeft ? 'md:col-start-1' : 'md:col-start-2',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-[#00ff41] bg-[#0a140a] text-[#00ff41] shadow-[2px_2px_0_0_#00ff41]">
                      <Briefcase size={11} />
                    </span>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#00e5ff]">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-[12px] font-bold text-[#00ff41]">{exp.role}</h3>
                  <p className="text-[10px] text-[#4caf50]">@ {exp.company}</p>

                  <ul className="mt-3 space-y-1">
                    {exp.description.slice(0, 4).map((d, i) => (
                      <li key={i} className="text-[10px] text-[#e8f5e9]/75 leading-[2em] flex gap-2">
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 bg-[#00e5ff]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 text-[8px] text-[#00e5ff] bg-[#050a05] border border-[#1a2e1a]"
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
