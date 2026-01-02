'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ctfs } from '@/data/portfolio';
import { Trophy } from 'lucide-react';
import { GlitchEffect } from '../effects/GlitchEffect';

export function CTFShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          CTF Achievements
        </GlitchEffect>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {ctfs.map((ctf, index) => (
          <motion.div
            key={ctf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 md:p-6 hover:border-cyan-500/60 transition-colors"
          >
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <Trophy className="text-yellow-400 flex-shrink-0 w-6 h-6 md:w-8 md:h-8" />
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-2">
                  <GlitchEffect>
                    {ctf.name}
                  </GlitchEffect>
                </h3>
                <p className="text-cyan-400 text-sm mb-1">{ctf.platform}</p>
                <p className="text-gray-300 text-sm mb-2">{ctf.year}</p>
                {ctf.ranking && (
                  <p className="text-green-400 text-sm font-semibold mb-2">Ranking: {ctf.ranking}</p>
                )}
              </div>
            </div>

            {ctf.description && (
              <p className="text-gray-200 mb-4 leading-relaxed">{ctf.description}</p>
            )}
            
            <div className="mb-4">
              <p className="text-green-400 font-semibold mb-2">Achievements:</p>
              <ul className="space-y-2">
                {ctf.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="text-gray-200 flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {ctf.domains && ctf.domains.length > 0 && (
              <div>
                <p className="text-green-400 font-semibold mb-2">Domains:</p>
                <div className="flex flex-wrap gap-2">
                  {ctf.domains.map((domain, domIndex) => (
                    <span
                      key={domIndex}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm border border-cyan-500/30"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


