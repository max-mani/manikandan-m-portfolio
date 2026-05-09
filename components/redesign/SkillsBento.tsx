'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Brain,
  ShieldCheck,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { skills } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

type Accent = 'cyan' | 'violet' | 'green' | 'magenta';

const CATEGORY_META: {
  [key: string]: { icon: React.ComponentType<{ size?: number; className?: string }>; accent: Accent };
} = {
  'Programming Languages': { icon: Code2, accent: 'cyan' },
  'Web & Mobile Development': { icon: Smartphone, accent: 'violet' },
  'AI / Machine Learning': { icon: Brain, accent: 'magenta' },
  Cybersecurity: { icon: ShieldCheck, accent: 'green' },
  'Tools & Platforms': { icon: Wrench, accent: 'cyan' },
  'Soft Skills': { icon: Sparkles, accent: 'violet' },
};

const ACCENT_BAR: Record<Accent, string> = {
  cyan: 'from-cyan-400 to-cyan-200',
  violet: 'from-fuchsia-500 to-violet-300',
  green: 'from-emerald-400 to-emerald-200',
  magenta: 'from-pink-500 to-fuchsia-300',
};

export function SkillsBento() {
  const categories = Object.entries(skills.categories);

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="> ./skills --tree"
          title="The Loadout"
          description="Built by shipping side-by-side: production code on the dev side, real attack surface on the security side. Every percentage is what I can ship right now, not aspirational."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-fr">
          {categories.map(([category, items], idx) => {
            const meta = CATEGORY_META[category] ?? {
              icon: Sparkles,
              accent: 'cyan' as Accent,
            };
            const Icon = meta.icon;

            const span =
              idx === 0
                ? 'md:col-span-3'
                : idx === 1
                ? 'md:col-span-3'
                : idx === 2
                ? 'md:col-span-2'
                : idx === 3
                ? 'md:col-span-4'
                : idx === 4
                ? 'md:col-span-3'
                : 'md:col-span-3';

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                className={span}
              >
                <GlowCard accent={meta.accent} className="h-full">
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        'inline-flex h-9 w-9 items-center justify-center rounded-md border',
                        meta.accent === 'cyan' &&
                          'border-cyan-400/45 text-cyan-300 bg-cyan-400/10',
                        meta.accent === 'violet' &&
                          'border-fuchsia-400/45 text-fuchsia-300 bg-fuchsia-400/10',
                        meta.accent === 'green' &&
                          'border-emerald-400/45 text-emerald-300 bg-emerald-400/10',
                        meta.accent === 'magenta' &&
                          'border-pink-400/45 text-pink-300 bg-pink-400/10',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg text-white font-bold leading-tight">
                        {category}
                      </h3>
                      <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
                        {items.length} entries
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {items.map((item) => {
                      const pct = item.percentage ?? null;
                      return (
                        <li key={item.name}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/85">{item.name}</span>
                            <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-wider text-white/55">
                              {pct ? `${pct}%` : item.level}
                            </span>
                          </div>
                          {pct !== null && (
                            <div className="mt-1.5 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                              <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: `${pct}%` }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.9, ease: 'easeOut' }}
                                className={[
                                  'block h-full rounded-full bg-gradient-to-r',
                                  ACCENT_BAR[meta.accent],
                                ].join(' ')}
                                style={{
                                  boxShadow:
                                    meta.accent === 'cyan'
                                      ? '0 0 8px rgba(0,229,255,0.55)'
                                      : meta.accent === 'violet'
                                      ? '0 0 8px rgba(168,85,247,0.55)'
                                      : meta.accent === 'green'
                                      ? '0 0 8px rgba(0,255,65,0.45)'
                                      : '0 0 8px rgba(255,0,255,0.45)',
                                }}
                              />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
