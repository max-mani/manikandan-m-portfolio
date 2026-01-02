'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { GlitchEffect } from '../effects/GlitchEffect';

interface ProjectDetailsProps {
  projectId: string;
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const project = projects.find((p) => p.id.toLowerCase() === projectId.toLowerCase());

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-400"
      >
        Project not found: {projectId}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          {project.name}
        </GlitchEffect>
      </h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-200 text-base md:text-lg leading-relaxed"
      >
        {project.description}
      </motion.p>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-xl md:text-2xl font-bold text-green-400">
            <GlitchEffect>
              Key Features
            </GlitchEffect>
          </h3>
          <ul className="space-y-2">
            {project.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start text-gray-200">
                <span className="text-cyan-400 mr-2">▸</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-xl md:text-2xl font-bold text-green-400">
          <GlitchEffect>
            Technologies
          </GlitchEffect>
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4"
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm md:text-base"
          >
            <Github size={18} className="md:w-5 md:h-5" />
            <span>View on GitHub</span>
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm md:text-base"
          >
            <ExternalLink size={18} className="md:w-5 md:h-5" />
            <span>Live Demo</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}


