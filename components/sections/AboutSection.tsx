'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { about } from '@/data/portfolio';
import { GlitchEffect } from '../effects/GlitchEffect';

export function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          About
        </GlitchEffect>
      </h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-200 text-base md:text-lg leading-relaxed mb-6"
      >
        {about.bio}
      </motion.p>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 mb-6"
      >
        {about.details.map((detail, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start text-gray-200"
          >
            <span className="text-cyan-400 mr-3">▸</span>
            <span>{detail}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 md:p-6 mb-6"
      >
        <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-4">
          <GlitchEffect>
            Education
          </GlitchEffect>
        </h3>
        <p className="text-cyan-400 font-semibold mb-2">{about.education.degree}</p>
        <p className="text-gray-200 mb-1">{about.education.institution}</p>
        <p className="text-gray-300 text-sm">{about.education.period} • {about.education.status}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-xl md:text-2xl font-bold text-green-400">
          <GlitchEffect>
            Tech Stack Highlights
          </GlitchEffect>
        </h3>
        {Object.entries(about.techStack).map(([category, techs], catIndex) => (
          <div key={category} className="space-y-2">
            <h4 className="text-lg md:text-xl font-semibold text-cyan-400">
              <GlitchEffect>
                {category}
              </GlitchEffect>
            </h4>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}


