'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { contact } from '@/data/portfolio';
import { Mail, Github, Linkedin } from 'lucide-react';
import { GlitchEffect } from '../effects/GlitchEffect';

export function ContactModal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
        <GlitchEffect>
          Contact
        </GlitchEffect>
      </h2>
      
      <div className="bg-gray-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 md:p-8 space-y-4 md:space-y-6">
        <div className="flex items-center space-x-4 text-green-400">
          <Mail size={24} />
          <div>
              <p className="text-sm text-gray-300 mb-1">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-lg hover:text-cyan-400 transition-colors"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {contact.social.github && (
          <div className="flex items-center space-x-4 text-green-400">
            <Github size={24} />
            <div>
              <p className="text-sm text-gray-300 mb-1">GitHub</p>
              <a
                href={contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-cyan-400 transition-colors"
              >
                {contact.social.github.replace('https://', '')}
              </a>
            </div>
          </div>
        )}

        {contact.social.linkedin && (
          <div className="flex items-center space-x-4 text-green-400">
            <Linkedin size={24} />
            <div>
              <p className="text-sm text-gray-300 mb-1">LinkedIn</p>
              <a
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-cyan-400 transition-colors"
              >
                {contact.social.linkedin.replace('https://', '')}
              </a>
            </div>
          </div>
        )}

        {contact.social.portfolio && (
          <div className="flex items-center space-x-4 text-green-400">
            <Github size={24} />
            <div>
              <p className="text-sm text-gray-300 mb-1">Portfolio</p>
              <a
                href={contact.social.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-cyan-400 transition-colors"
              >
                {contact.social.portfolio.replace('https://', '')}
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}


