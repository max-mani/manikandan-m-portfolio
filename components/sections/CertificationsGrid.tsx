'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';
import { Award, ExternalLink } from 'lucide-react';
import { GlitchEffect } from '../effects/GlitchEffect';

export function CertificationsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          Certifications
        </GlitchEffect>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 md:p-6 hover:border-cyan-500/60 transition-colors"
          >
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <Award className="text-cyan-400 flex-shrink-0 w-6 h-6 md:w-8 md:h-8" />
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-2">
                  <GlitchEffect>
                    {cert.name}
                  </GlitchEffect>
                </h3>
                <p className="text-cyan-400 mb-2">{cert.issuer}</p>
                {cert.level && (
                  <p className="text-green-400 text-sm mb-1">Level: {cert.level}</p>
                )}
                {cert.status && (
                  <p className="text-yellow-400 text-sm mb-1">Status: {cert.status}</p>
                )}
                <p className="text-gray-300 text-sm mb-2">{cert.date}</p>
                {cert.credentialId && (
                  <p className="text-gray-400 text-xs font-mono mb-2">
                    ID: {cert.credentialId}
                  </p>
                )}
                {cert.description && (
                  <p className="text-gray-200 text-sm leading-relaxed">{cert.description}</p>
                )}
              </div>
            </div>
            
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-cyan-400 transition-colors"
              >
                <ExternalLink size={18} />
                <span>Verify</span>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


