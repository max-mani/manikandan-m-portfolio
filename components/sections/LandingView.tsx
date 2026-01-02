'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hero } from '@/data/portfolio';
import { GlitchEffect } from '../effects/GlitchEffect';

export function LandingView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4"
      >
        <GlitchEffect>
          {hero.name}
        </GlitchEffect>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg md:text-xl text-green-400 mb-6"
      >
        <GlitchEffect>
          {hero.title}
        </GlitchEffect>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-200 text-base md:text-lg leading-relaxed mb-6"
      >
        {hero.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-3">
          <GlitchEffect>
            Core Focus Areas
          </GlitchEffect>
        </h3>
        <ul className="space-y-2">
          {hero.focusAreas.map((area, index) => (
            <li key={index} className="flex items-start text-gray-200">
              <span className="text-cyan-400 mr-2">▸</span>
              <span>{area}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="pt-4"
      >
        <h3 className="text-lg md:text-xl font-bold text-green-400 mb-3">
          <GlitchEffect>
            Skills & Technologies
          </GlitchEffect>
        </h3>
        <div className="flex flex-wrap gap-2">
          {hero.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm border border-cyan-500/30"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}


