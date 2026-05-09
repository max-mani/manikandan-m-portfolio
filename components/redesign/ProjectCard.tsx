'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import type { Project } from '@/data/portfolio';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { name, description, technologies, github, live, image, featured, year, categories } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: Math.min(index, 6) * 0.04 }}
      whileHover={{ y: -4 }}
      className="group relative h-full rounded-2xl overflow-hidden border border-fuchsia-400/15 bg-gradient-to-b from-[rgba(20,22,40,0.85)] to-[rgba(8,10,22,0.95)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/55 hover:shadow-[0_8px_30px_rgba(0,229,255,0.18),0_0_40px_rgba(168,85,247,0.18)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-fuchsia-500/15 via-cyan-500/10 to-transparent">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(0,229,255,0.18), transparent 50%), radial-gradient(circle at 70% 70%, rgba(168,85,247,0.22), transparent 55%)',
              }}
            />
            <span className="relative font-[family-name:var(--font-display)] font-bold text-3xl text-gradient-cyber px-6 text-center leading-tight">
              {name.split(' ')[0]}
            </span>
          </div>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(5,6,10,0.85)]"
        />

        {featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-[family-name:var(--font-share-tech-mono)] tracking-[0.2em] text-amber-200 bg-amber-400/15 border border-amber-300/40">
            <Star size={10} className="fill-amber-300 text-amber-300" />
            FEATURED
          </span>
        )}

        {year && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[0.65rem] font-[family-name:var(--font-share-tech-mono)] tracking-widest text-cyan-200 bg-cyan-500/10 border border-cyan-400/40">
            {year}
          </span>
        )}
      </div>

      <div className="relative p-5">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-white font-bold leading-tight group-hover:text-cyan-200 transition-colors">
          {name}
        </h3>
        <p className="mt-2 text-sm text-white/65 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[0.7rem] font-[family-name:var(--font-share-tech-mono)] text-fuchsia-200 bg-fuchsia-500/10 border border-fuchsia-400/25"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 6 && (
            <span className="px-2 py-0.5 rounded text-[0.7rem] font-[family-name:var(--font-share-tech-mono)] text-white/55 bg-white/5 border border-white/10">
              +{technologies.length - 6}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-1">
            {(categories || []).map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded-full text-[0.6rem] font-[family-name:var(--font-share-tech-mono)] tracking-widest uppercase text-cyan-200/85 bg-cyan-400/5 border border-cyan-400/20"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} GitHub repository`}
                title="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-cyan-300 hover:border-cyan-400/55 hover:bg-cyan-400/5 transition-colors"
              >
                <Github size={14} />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} live site`}
                title="Live"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-fuchsia-400/45 text-fuchsia-200 text-xs font-[family-name:var(--font-share-tech-mono)] hover:border-fuchsia-300 hover:bg-fuchsia-400/10 hover:shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all"
              >
                <ExternalLink size={12} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
