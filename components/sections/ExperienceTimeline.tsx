'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '@/data/portfolio';
import { GlitchEffect } from '../effects/GlitchEffect';

export function ExperienceTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          Experience
        </GlitchEffect>
      </h2>
      
      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-cyan-500/30" />
        
        <div className="space-y-6 md:space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-12 md:pl-20"
            >
              <div className="absolute left-2 md:left-6 top-2 w-3 h-3 md:w-4 md:h-4 bg-cyan-500 rounded-full border-2 md:border-4 border-black" />
              
              <div className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-green-400">
                    <GlitchEffect>
                      {exp.role}
                    </GlitchEffect>
                  </h3>
                  <span className="text-cyan-400 text-xs md:text-sm mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                
                <h4 className="text-lg md:text-xl text-cyan-400 mb-4">
                  <GlitchEffect>
                    {exp.company}
                  </GlitchEffect>
                </h4>
                
                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-gray-200 text-sm md:text-base flex items-start">
                      <span className="text-cyan-400 mr-2 flex-shrink-0">▸</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={`${exp.id}-${tech}-${techIndex}`}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


