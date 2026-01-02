'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import { GlitchEffect } from '../effects/GlitchEffect';

export function SkillsMatrix() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          Skills
        </GlitchEffect>
      </h2>
      
      <div className="space-y-6 md:space-y-8">
        {Object.entries(skills.categories).map(([category, techs], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            className="space-y-3 md:space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-green-400">
              <GlitchEffect>
                {category}
              </GlitchEffect>
            </h3>
            <div className="space-y-4">
              {techs.map((tech, techIndex) => {
                const skillName = typeof tech === 'string' ? tech : tech.name;
                const skillLevel = typeof tech === 'object' ? tech.level : undefined;
                
                return (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:border-cyan-500/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span>{skillName}</span>
                      {skillLevel && (
                        <span className="text-xs text-green-400">({skillLevel})</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


