'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, ChevronDown } from 'lucide-react';
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
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.categories?.includes(filter));
  }, [filter]);

  const visibleProjects = useMemo(() => {
    if (showAll) return filtered;
    return filtered.slice(0, 6);
  }, [filtered, showAll]);

  const hasMoreProjects = filtered.length > 6;

  return (
    <section id="projects" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="> ./projects --pinned"
            title={<>Things I&apos;ve Shipped</>}
            description="Production apps, hackathon builds, AI experiments and security tools. Every card links straight to the source on GitHub."
          />
          <a
            href={contact.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 px-3 py-2 border-2 border-[#00e5ff] text-[#00e5ff] text-[10px] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff] hover:text-[#00ff41] hover:border-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41] transition-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <Github size={12} />
            All repos on GitHub
            <ArrowUpRight size={12} />
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
                type="button"
                onClick={() => {
                  setFilter(f.id);
                  setShowAll(false);
                }}
                className={[
                  'px-3 py-1.5 text-[10px] tracking-wide border-2 transition-none',
                  active
                    ? 'border-[#00ff41] bg-[#0a140a] text-[#00ff41] shadow-[2px_2px_0_0_#00ff41]'
                    : 'border-[#1a2e1a] bg-[#050a05] text-[#e8f5e9]/70 hover:border-[#00e5ff] hover:text-[#00e5ff]',
                ].join(' ')}
              >
                {f.label}
                <span className="ml-1.5 text-[8px] text-[#4caf50]">[{count}]</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.12, ease: [1, 0, 0, 1] }}
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMoreProjects && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3 py-2 border-2 border-[#00e5ff] text-[#00e5ff] text-[10px] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff] hover:text-[#00ff41] hover:border-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41] transition-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <ChevronDown size={12} className={showAll ? 'rotate-180' : ''} />
              {showAll ? 'View less' : `View more [${filtered.length - visibleProjects.length}]`}
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-[10px] text-[#4caf50]">
            &gt; No projects matched this filter yet. Check back soon — I&apos;m shipping fast.
          </div>
        )}
      </div>
    </section>
  );
}
