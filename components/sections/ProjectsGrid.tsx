'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';
import { ExternalLink, Github } from 'lucide-react';
import { GlitchEffect } from '../effects/GlitchEffect';

export function ProjectsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          Projects
        </GlitchEffect>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 md:p-6 hover:border-cyan-500/60 transition-colors"
          >
            <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-3">
              <GlitchEffect>
                {project.name}
              </GlitchEffect>
            </h3>
            <p className="text-gray-200 text-sm md:text-base mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={`${project.id}-${tech}-${techIndex}`}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-cyan-400 transition-colors text-sm md:text-base"
                >
                  <Github size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>GitHub</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-cyan-400 transition-colors text-sm md:text-base"
                >
                  <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>Live</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


