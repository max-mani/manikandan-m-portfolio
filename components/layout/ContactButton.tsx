'use client';

import React from 'react';
import { contact } from '@/data/portfolio';
import { GlitchEffect } from '@/components/shared/GlitchEffect';

export function ContactButton() {
  return (
    <div className="w-full space-y-2">
      <a
        href={`mailto:${contact.email}`}
        className="block w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 px-4 py-3 rounded-lg text-center text-sm transition-colors"
      >
        <GlitchEffect>Contact</GlitchEffect>
      </a>
      {contact.social.github && (
        <a
          href={contact.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-green-400 hover:text-cyan-400 text-sm text-center"
        >
          GitHub
        </a>
      )}
      {contact.social.linkedin && (
        <a
          href={contact.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-green-400 hover:text-cyan-400 text-sm text-center"
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}
