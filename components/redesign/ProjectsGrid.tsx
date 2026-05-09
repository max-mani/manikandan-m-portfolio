'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { projects, contact } from '@/data/portfolio';
import type { ProjectCategory } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';

const FILTERS: Array<{ id: 'All' | ProjectCategory; label: string }> = [
  { id: 'All', label: 'All' },
  { id: 'Dev', label: 'Dev' },
  { id: 'Cybersec', label: 'Cybersec' },
  { id: 'AI', label: 'AI / ML' },
  { id: 'Mobile', label: 'Mobile' },
];

export function ProjectsGrid() {
  const [filter, setFilter] = useState<typeof FILTERS[number]['id']>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.categories?.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="> ./projects --pinned"
            title={
              <>
                Things I&apos;ve Shipped
              </>
            }
            description="Production apps, hackathon builds, AI experiments and security tools. Every card links straight to the source on GitHub."
          />
          <a
            href={contact.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-400/45 text-cyan-200 text-sm font-[family-name:var(--font-share-tech-mono)] hover:bg-cyan-400/10 hover:border-cyan-300 hover:shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all"
          >
            <Github size={14} />
            All repos on GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const fid = f.id;
            const count =
              fid === 'All'
                ? projects.length
                : projects.filter((p) => p.categories?.includes(fid)).length;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={[
                  'px-3.5 py-1.5 rounded-full text-sm font-[family-name:var(--font-share-tech-mono)] tracking-wide transition-all border',
                  active
                    ? 'border-cyan-400/70 bg-cyan-400/15 text-cyan-200 shadow-[0_0_18px_rgba(0,229,255,0.35)]'
                    : 'border-white/10 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/30',
                ].join(' ')}
              >
                {f.label}
                <span className="ml-2 text-[0.7rem] text-white/45">[{count}]</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-white/55 font-[family-name:var(--font-share-tech-mono)] text-sm">
            &gt; No projects matched this filter yet. Check back soon — I&apos;m
            shipping fast.
          </div>
        )}
      </div>
    </section>
  );
}
