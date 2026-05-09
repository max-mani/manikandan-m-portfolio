'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, TerminalSquare, FileText, Sparkles } from 'lucide-react';
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

interface HeroSectionProps {
  onOpenTerminal?: () => void;
}

export function HeroSection({ onOpenTerminal }: HeroSectionProps) {
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
      className="relative isolate min-h-[calc(100vh-4rem)] flex items-center overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20"
    >
      <span aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px -z-10 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
      />
      <span
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-80 w-[80%] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(168,85,247,0.35), rgba(0,229,255,0.18) 50%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-400/30 mb-6"
          >
            <span className="relative h-2 w-2 rounded-full bg-emerald-400">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
            </span>
            <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.28em] text-emerald-300/90">
              ONLINE · CHENNAI, IN
            </span>
            <span className="text-white/30">·</span>
            <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.28em] text-fuchsia-300">
              AVAILABLE FOR HIRE
            </span>
          </motion.div>

          <p className="font-[family-name:var(--font-share-tech-mono)] text-cyan-300/90 text-sm md:text-base tracking-widest uppercase mb-3">
            &gt; whoami
          </p>

          <h1 className="font-[family-name:var(--font-display)] font-extrabold leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white">Hi, I&apos;m</span>
            <span className="block text-gradient-cyber animate-gradient-shift bg-[length:200%_200%]">
              Manikandan M
            </span>
          </h1>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <span className="font-[family-name:var(--font-share-tech-mono)] text-base md:text-lg text-fuchsia-300">
              I&apos;m a
            </span>
            <span className="relative inline-flex items-center px-3 py-1 rounded-md neon-border-cyan font-[family-name:var(--font-share-tech-mono)] text-base md:text-lg text-cyan-200">
              {typed}
              <span className="ml-0.5 w-[2px] h-[1em] bg-cyan-300 animate-blink" />
            </span>
          </div>

          <p className="mt-6 max-w-xl text-base md:text-lg text-white/75 leading-relaxed font-[family-name:var(--font-body)]">
            Pre-final year CSE student at Kumaraguru College of Technology.
            I build <span className="text-cyan-300 font-medium">scalable products</span>{' '}
            on one side and break / defend{' '}
            <span className="text-fuchsia-300 font-medium">application systems</span>{' '}
            on the other — holding both like Spidey holds the ferry.
            <span className="text-emerald-300"> HackX CTF 2025 — 2nd Place.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <NeonButton href="#projects" variant="primary" icon={<ArrowDown size={16} />}>
              View My Work
            </NeonButton>
            <NeonButton
              href={contact.social.github}
              external
              variant="violet"
              icon={<Github size={16} />}
            >
              GitHub @max-mani
            </NeonButton>
            <NeonButton
              onClick={onOpenTerminal}
              variant="green"
              icon={<TerminalSquare size={16} />}
            >
              Open Terminal
            </NeonButton>
            <NeonButton
              href={contact.social.resume}
              external
              variant="ghost"
              icon={<FileText size={16} />}
            >
              Resume
            </NeonButton>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {hero.skills.slice(0, 8).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-[family-name:var(--font-share-tech-mono)] text-white/75 bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:text-cyan-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-6 order-1 lg:order-2 relative"
        >
          <div className="absolute -top-2 -right-2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-fuchsia-400/30 z-30">
            <Sparkles size={12} className="text-fuchsia-300" />
            <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] text-fuchsia-300">
              CYBER + CODE
            </span>
          </div>
          <HeroHoldingIllustration />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 flex flex-col items-center gap-1 text-white/50 hover:text-cyan-300 transition-colors"
        aria-label="Scroll to about"
      >
        <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em]">
          SCROLL
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
