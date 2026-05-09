'use client';

import React, { useState } from 'react';
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
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(image) && !imageFailed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.15, delay: Math.min(index, 6) * 0.03, ease: [1, 0, 0, 1] }}
      whileHover={{ x: -2, y: -2 }}
      className="group relative h-full overflow-hidden border-2 border-[#1a2e1a] bg-[#0a140a] shadow-[4px_4px_0_0_#1a2e1a] transition-none hover:border-[#00e5ff] hover:shadow-[4px_4px_0_0_#00e5ff]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050a05]">
        {showImage ? (
          <Image
            src={image!}
            alt={name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
            <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
            <span className="relative text-[9px] sm:text-[10px] tracking-wide text-[#00ff41] text-center leading-tight border-2 border-[#00ff41] px-3 py-2 bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41]">
              [ SCREENSHOT ]
            </span>
            <span className="relative text-[10px] font-bold text-center text-[#00e5ff] leading-tight line-clamp-2">
              {name.split(' ')[0]}
            </span>
          </div>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#050a05]/90"
        />

        {featured && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 text-[8px] tracking-[0.15em] text-[#ffb300] bg-[#0a140a] border-2 border-[#ffb300] shadow-[2px_2px_0_0_#ffb300]">
            <Star size={8} className="text-[#ffb300]" />
            FEATURED
          </span>
        )}

        {year && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-[8px] tracking-widest text-[#00e5ff] bg-[#0a140a] border-2 border-[#00e5ff]">
            {year}
          </span>
        )}
      </div>

      <div className="relative p-4">
        <h3 className="text-[12px] font-bold text-[#00ff41] leading-tight group-hover:text-[#00e5ff] transition-none">
          {name}
        </h3>
        <p className="mt-2 text-[10px] leading-[2em] text-[#e8f5e9]/65 line-clamp-3">{description}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[8px] text-[#00e5ff] bg-[#050a05] border border-[#1a2e1a]"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 6 && (
            <span className="px-1.5 py-0.5 text-[8px] text-[#4caf50] bg-[#050a05] border border-[#1a2e1a]">
              +{technologies.length - 6}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t-2 border-[#1a2e1a]">
          <div className="flex flex-wrap gap-1">
            {(categories || []).map((c) => (
              <span
                key={c}
                className="px-1.5 py-0.5 text-[7px] tracking-widest uppercase text-[#4caf50] border border-[#1a2e1a] bg-[#050a05]"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} GitHub repository`}
                title="GitHub"
                className="inline-flex h-8 w-8 items-center justify-center border-2 border-[#1a2e1a] text-[#e8f5e9]/75 hover:text-[#00ff41] hover:border-[#00ff41] transition-none"
              >
                <Github size={12} />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} live site`}
                title="Live"
                className="inline-flex items-center gap-1 px-2 py-1.5 border-2 border-[#00ff41] text-[#00ff41] text-[8px] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41] hover:border-[#00e5ff] hover:text-[#00e5ff] hover:shadow-[2px_2px_0_0_#00e5ff] transition-none"
              >
                <ExternalLink size={10} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
