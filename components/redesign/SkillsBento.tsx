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

const BAR_COLOR: Record<Accent, string> = {
  cyan: '#00e5ff',
  violet: '#00ff41',
  green: '#4caf50',
  magenta: '#ff00ff',
};

const ICON_BOX: Record<Accent, string> = {
  cyan: 'border-[#00e5ff] text-[#00e5ff] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff]',
  violet: 'border-[#00ff41] text-[#00ff41] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41]',
  green: 'border-[#4caf50] text-[#4caf50] bg-[#0a140a] shadow-[2px_2px_0_0_#4caf50]',
  magenta: 'border-[#ff00ff] text-[#ff00ff] bg-[#0a140a] shadow-[2px_2px_0_0_#ff00ff]',
};

export function SkillsBento() {
  const categories = Object.entries(skills.categories);

  return (
    <section id="skills" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <SectionHeading
          eyebrow="> ./skills --tree"
          title="The Loadout"
          description="Built by shipping side-by-side: production code on the dev side, real attack surface on the security side. Bars show rough depth — not a flex score."
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
                transition={{ duration: 0.15, delay: idx * 0.03, ease: [1, 0, 0, 1] }}
                className={span}
              >
                <GlowCard accent={meta.accent} className="h-full">
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        'inline-flex h-8 w-8 items-center justify-center border-2',
                        ICON_BOX[meta.accent],
                      ].join(' ')}
                    >
                      <Icon size={14} />
                    </span>
                    <div>
                      <h3 className="text-[12px] font-bold text-[#00ff41] leading-tight">{category}</h3>
                      <p className="text-[8px] uppercase tracking-[0.2em] text-[#4caf50]">
                        {items.length} entries
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {items.map((item) => {
                      const pct = item.percentage ?? null;
                      return (
                        <li key={item.name}>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-[#e8f5e9]/85">{item.name}</span>
                            <span className="text-[8px] tracking-wider text-[#4caf50]">
                              {pct ? `${pct}%` : item.level}
                            </span>
                          </div>
                          {pct !== null && (
                            <div className="mt-1 h-1 bg-[#1a2e1a] overflow-hidden border border-[#050a05]">
                              <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: `${pct}%` }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.25, ease: [1, 0, 0, 1] }}
                                className="block h-full"
                                style={{
                                  backgroundColor: BAR_COLOR[meta.accent],
                                  boxShadow: `0 0 6px ${BAR_COLOR[meta.accent]}`,
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
