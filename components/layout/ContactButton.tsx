'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { contact } from '@/data/portfolio';
import { GlitchEffect } from '../effects/GlitchEffect';

export function ContactButton() {
  const [showContact, setShowContact] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">
      <motion.button
        onClick={() => setShowContact(!showContact)}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-4 py-3 rounded-lg shadow-lg transition-colors text-sm md:text-base flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <GlitchEffect>
          Contact
        </GlitchEffect>
      </motion.button>

      {showContact && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 w-full"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-green-400">
              <Mail size={20} />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-cyan-400 transition-colors"
              >
                {contact.email}
              </a>
            </div>

            {contact.social.github && (
              <div className="flex items-center space-x-3 text-green-400">
                <Github size={20} />
                <a
                  href={contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  GitHub
                </a>
              </div>
            )}

            {contact.social.linkedin && (
              <div className="flex items-center space-x-3 text-green-400">
                <Linkedin size={20} />
                <a
                  href={contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            )}

            {contact.social.portfolio && (
              <div className="flex items-center space-x-3 text-green-400">
                <Github size={20} />
                <a
                  href={contact.social.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
