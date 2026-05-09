'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, FileText, Sparkles, TerminalSquare } from 'lucide-react';
import { hero, contact } from '@/data/portfolio';
import { HeroHoldingIllustration } from './HeroHoldingIllustration';
import { NeonButton } from './NeonButton';

const ROLES = [
  'Full-Stack Developer',
  'Application Security Analyst',
  'CTF Player',
  'Mobile App Builder',
  'AI/ML Engineer',
];

export function HeroSection({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (typed.length < target.length) {
        timeout = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1400);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('erasing'), 600);
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(target.slice(0, typed.length - 1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [typed, phase, roleIdx]);

  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100vh-4rem)] flex items-center overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20"
    >
      <span aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px -z-10 bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent"
      />
      <span
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-80 w-[80%] max-md:hidden"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,255,65,0.12), rgba(0,229,255,0.06) 50%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [1, 0, 0, 1] }}
          className="lg:col-span-6 order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.25, ease: [1, 0, 0, 1] }}
            className="inline-flex items-center gap-2 px-3 py-2 pixel-border-dim mb-5 sm:mb-6 max-w-full flex-wrap bg-[#0a140a]/90"
          >
            <span className="relative h-2 w-2 bg-[#00ff41] shrink-0">
              <span className="absolute inset-0 bg-[#00ff41] animate-ping opacity-60" />
            </span>
            <span className="text-[8px] tracking-[0.2em] text-[#4caf50] uppercase">
              ONLINE · CHENNAI, IN
            </span>
            <span className="text-[#1a2e1a] max-sm:hidden">·</span>
            <span className="text-[8px] tracking-[0.2em] text-[#00e5ff] uppercase">
              AVAILABLE FOR HIRE
            </span>
          </motion.div>

          <p className="text-[#00e5ff] text-[10px] tracking-widest uppercase mb-3">&gt; whoami</p>

          <h1 className="font-bold leading-snug text-[14px] text-[#00ff41] max-w-lg">
            <span className="block text-[#e8f5e9]">Hi, I&apos;m</span>
            <span className="block text-[#00e5ff]">Manikandan M</span>
          </h1>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-[#4caf50]">I&apos;m a</span>
            <span className="relative inline-flex items-center px-2 py-1 neon-border-cyan bg-[#0a140a] text-[10px] text-[#00e5ff]">
              {typed}
              <span className="ml-0.5 w-[2px] h-[1em] bg-[#00e5ff] animate-blink" />
            </span>
          </div>

          <p className="mt-5 max-w-xl text-[10px] leading-[2em] text-[#e8f5e9]/85">
            Pre-final year CSE student at Kumaraguru College of Technology. I build{' '}
            <span className="text-[#00e5ff]">scalable products</span> on one side and break / defend{' '}
            <span className="text-[#ffb300]">application systems</span> on the other — holding both like
            Spidey holds the ferry.
            <span className="text-[#00ff41]"> HackX CTF 2025 — 2nd Place.</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <NeonButton href="#projects" variant="primary" icon={<ArrowDown size={14} />}>
              View My Work
            </NeonButton>
            <NeonButton
              href={contact.social.github}
              external
              variant="violet"
              icon={<Github size={14} />}
            >
              GitHub @max-mani
            </NeonButton>
            <NeonButton
              onClick={() => onOpenTerminal?.()}
              variant="green"
              icon={<TerminalSquare size={14} />}
            >
              Floating TTY
            </NeonButton>
            <NeonButton href={contact.social.resume} external variant="ghost" icon={<FileText size={14} />}>
              Resume
            </NeonButton>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {hero.skills.slice(0, 8).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-[8px] text-[#e8f5e9]/80 bg-[#0a140a] border-2 border-[#1a2e1a] shadow-[2px_2px_0_0_#1a2e1a] hover:border-[#00e5ff] hover:text-[#00ff41] hover:shadow-[2px_2px_0_0_#00e5ff] transition-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [1, 0, 0, 1], delay: 0.15 }}
          className="lg:col-span-6 order-1 lg:order-2 relative"
        >
          <div className="absolute -top-2 -right-2 hidden md:flex items-center gap-2 px-3 py-1.5 pixel-border-dim bg-[#0a140a] z-30">
            <Sparkles size={12} className="text-[#00ff41]" />
            <span className="text-[8px] tracking-[0.25em] text-[#00e5ff] uppercase">CYBER + CODE</span>
          </div>
          <HeroHoldingIllustration />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 flex flex-col items-center gap-1 text-[#4caf50] hover:text-[#00ff41] transition-none"
        aria-label="Scroll to about"
      >
        <span className="text-[8px] tracking-[0.3em] uppercase">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
