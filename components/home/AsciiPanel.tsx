'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASCII_FACE } from '@/data/asciiArt';
import { hero, contact } from '@/data/portfolio';
import { GlitchEffect } from '@/components/shared/GlitchEffect';
import Image from 'next/image';

interface AsciiPanelProps {
  onOpenMessage?: () => void;
}

export function AsciiPanel({ onOpenMessage }: AsciiPanelProps) {
  const [display, setDisplay] = useState('');
  const [showContact, setShowContact] = useState(false);
  const typedRef = useRef(false);

  useEffect(() => {
    if (typedRef.current) return;
    typedRef.current = true;

    let index = 0;
    let cancelled = false;

    const interval = setInterval(() => {
      if (cancelled) return;
      index += 6;
      if (index >= ASCII_FACE.length) {
        index = ASCII_FACE.length;
        clearInterval(interval);
      }
      setDisplay(ASCII_FACE.slice(0, index));
    }, 3);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const shortRole = hero.title.split('|')[0]?.trim() || 'Full Stack Dev';

  return (
    <div
      className="flex flex-col w-full lg:w-[30%] overflow-hidden bg-black/95 border-r border-[var(--border)]"
      style={{ fontFamily: 'var(--font-share-tech-mono)' }}
    >
      {/* ASCII Art section */}
      <div className="flex-1 min-h-[120px] overflow-hidden p-2">
        <div
          className="h-full overflow-y-auto overflow-x-hidden rounded border p-2"
          style={{
            background: 'rgba(0,0,0,0.8)',
            borderColor: 'rgba(0,100,0,0.4)',
          }}
        >
          <pre
            className="text-[3.5px] md:text-[4px] leading-[1.05] mx-auto text-center text-green-400 whitespace-pre"
            style={{
              letterSpacing: '0.2px',
              textShadow: '0 0 3px var(--g)',
              animation: 'asciiGlow 4s ease-in-out infinite',
            }}
          >
            {display}
          </pre>
          <div className="mt-2 flex justify-center">
            <Image
              src="/images/ascii-name.png"
              alt="Manikandan M"
              width={360}
              height={72}
              className="w-full max-w-[360px] h-auto"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div
        className="px-[14px] py-2 border-t border-[var(--border)]"
        style={{ fontFamily: 'var(--font-share-tech-mono)' }}
      >
        <div
          className="font-[var(--font-vt323)] text-[1.9rem] text-[var(--c)]"
          style={{ textShadow: '0 0 10px var(--c)' }}
        >
          <GlitchEffect>{hero.name.split(' ')[0]}</GlitchEffect>
        </div>
        <div
          className="text-[0.8rem] text-[var(--gdim)]"
          style={{ letterSpacing: '1px' }}
        >
          &gt; MAXIM | {shortRole}
        </div>
        <div className="text-[0.8rem] mt-1.5 space-y-0.5">
          <div>
            <span className="text-[var(--gdim)]">OS:       </span>
            <span className="text-[var(--g)]">Ubuntu 24.04 LTS</span>
          </div>
          <div>
            <span className="text-[var(--gdim)]">Shell:    </span>
            <span className="text-[var(--g)]">bash 5.2</span>
          </div>
          <div>
            <span className="text-[var(--gdim)]">Location: </span>
            <span className="text-[var(--g)]">Chennai, IN</span>
          </div>
          <div>
            <span className="text-[var(--gdim)]">Status:   </span>
            <span className="text-[#00ff88]">● ONLINE</span>
          </div>
        </div>
      </div>

      {/* Button row */}
      <div
        className="flex gap-2 px-[14px] py-3 pt-2 border-t border-[var(--border)]"
        style={{ paddingBottom: 12 }}
      >
        <motion.button
          onClick={() => setShowContact(!showContact)}
          className="flex-1 py-[8px] px-2 text-[0.8rem] uppercase tracking-[1px] cursor-pointer rounded-sm bg-transparent border border-[var(--border)] text-[var(--g)] font-[var(--font-share-tech-mono)] hover:text-[var(--c)] hover:border-[var(--c)] hover:shadow-[0_0_8px_var(--c)] hover:bg-[rgba(0,229,255,0.07)] transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <GlitchEffect>[ CONTACT ]</GlitchEffect>
        </motion.button>
        <motion.button
          onClick={onOpenMessage}
          className="flex-1 py-[8px] px-2 text-[0.8rem] uppercase tracking-[1px] cursor-pointer rounded-sm bg-transparent border border-[var(--border)] text-[var(--g)] font-[var(--font-share-tech-mono)] hover:text-[var(--m)] hover:border-[var(--m)] hover:shadow-[0_0_8px_var(--m)] hover:bg-[rgba(255,0,255,0.07)] transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <GlitchEffect>[ MESSAGE ]</GlitchEffect>
        </motion.button>
      </div>

      {/* Contact expand panel */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--border)]"
          >
            <div
              className="px-[14px] py-3 space-y-2 text-[0.8rem]"
              style={{ fontFamily: 'var(--font-share-tech-mono)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[var(--c)]">&gt;</span>
                <span className="text-[var(--gdim)]">Email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[var(--g)] hover:text-[var(--c)] transition-colors truncate"
                >
                  {contact.email}
                </a>
              </div>
              {contact.social.github && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--c)]">&gt;</span>
                  <span className="text-[var(--gdim)]">GitHub</span>
                  <a
                    href={contact.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--g)] hover:text-[var(--c)] transition-colors truncate"
                  >
                    {contact.social.github.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {contact.social.linkedin && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--c)]">&gt;</span>
                  <span className="text-[var(--gdim)]">LinkedIn</span>
                  <a
                    href={contact.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--g)] hover:text-[var(--c)] transition-colors truncate"
                  >
                    {contact.social.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {contact.social.portfolio && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--c)]">&gt;</span>
                  <span className="text-[var(--gdim)]">Portfolio</span>
                  <a
                    href={contact.social.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--g)] hover:text-[var(--c)] transition-colors truncate"
                  >
                    {contact.social.portfolio.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
