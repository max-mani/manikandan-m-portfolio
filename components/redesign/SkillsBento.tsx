'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Brain,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { skills } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

type Accent = 'cyan' | 'violet' | 'green' | 'magenta';

const CATEGORY_META: {
  [key: string]: { icon: React.ComponentType<{ size?: number; className?: string }>; accent: Accent };
} = {
  'DAILY DRIVER': { icon: Code2, accent: 'cyan' },
  'SHIPPED TO PRODUCTION': { icon: Smartphone, accent: 'violet' },
  'SECURITY TOOLS': { icon: ShieldCheck, accent: 'green' },
  'CTF TOOLKIT': { icon: Brain, accent: 'magenta' },
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
          description="No fake scoring. Just the stack I use daily, what I have shipped, and the tools I reach for during security work and CTF rounds."
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
                    {items.map((item) => (
                      <li key={item}>
                        <div className="text-[10px] text-[#e8f5e9]/85">{item}</div>
                      </li>
                    ))}
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
