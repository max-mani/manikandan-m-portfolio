'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Code2,
  ShieldCheck,
  TerminalSquare,
  FileText,
  Menu,
  X,
  Smartphone,
  Trophy,
} from 'lucide-react';
import { contact } from '@/data/portfolio';
import { AnimeBotAvatar } from './AnimeBotAvatar';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'ctf', label: 'CTF' },
  { id: 'certs', label: 'Certs' },
  { id: 'logbook', label: 'Logbook' },
  { id: 'contact', label: 'Contact' },
] as const;

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const opts: IntersectionObserverInit = {
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, opts);
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={[
          'fixed inset-x-0 top-0 z-[100] transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl bg-[rgba(5,6,10,0.7)] border-b border-fuchsia-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="#home" className="flex items-center gap-3 group">
            <AnimeBotAvatar size={40} withHalo />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-[family-name:var(--font-display)] font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                MANIKANDAN
              </span>
              <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] text-fuchsia-300/80">
                MAX // CYBER+CODE
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={[
                    'relative px-3 py-1.5 rounded-md text-sm font-[family-name:var(--font-share-tech-mono)] transition-colors',
                    active === s.id ? 'text-cyan-300' : 'text-white/65 hover:text-white',
                  ].join(' ')}
                >
                  {s.label}
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-cyan-400/10 ring-1 ring-cyan-400/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <SocialIcon href={contact.social.github} label="GitHub">
              <Github size={16} />
            </SocialIcon>
            <SocialIcon href={contact.social.linkedin} label="LinkedIn">
              <Linkedin size={16} />
            </SocialIcon>
            <SocialIcon href={contact.social.leetcode} label="LeetCode">
              <Code2 size={16} />
            </SocialIcon>
            <SocialIcon href={contact.social.hackthebox} label="HackTheBox">
              <ShieldCheck size={16} />
            </SocialIcon>
            <SocialIcon href={contact.social.tryhackme} label="TryHackMe">
              <Trophy size={16} />
            </SocialIcon>
            <SocialIcon href={contact.social.playstore} label="Play Store">
              <Smartphone size={16} />
            </SocialIcon>

            <a
              href={contact.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-md border border-cyan-400/50 text-cyan-300 text-xs font-[family-name:var(--font-share-tech-mono)] hover:bg-cyan-400/10 hover:border-cyan-300 hover:shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all"
            >
              <FileText size={14} />
              <span>Resume</span>
            </a>

            <button
              onClick={onOpenTerminal}
              className="hidden md:inline-flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-md border border-fuchsia-400/50 text-fuchsia-300 text-xs font-[family-name:var(--font-share-tech-mono)] hover:bg-fuchsia-400/10 hover:border-fuchsia-300 hover:shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all"
              aria-label="Open terminal"
            >
              <TerminalSquare size={14} />
              <span>TTY</span>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden ml-1 p-2 rounded-md border border-white/15 text-white/80 hover:text-white hover:border-cyan-400/60"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-white/5 bg-[rgba(5,6,10,0.95)] backdrop-blur-xl"
            >
              <ul className="px-4 py-3 flex flex-col gap-1">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'block px-3 py-2 rounded-md text-sm font-[family-name:var(--font-share-tech-mono)] transition-colors',
                        active === s.id
                          ? 'bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/40'
                          : 'text-white/75 hover:bg-white/5 hover:text-white',
                      ].join(' ')}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
                <li className="grid grid-cols-2 gap-2 mt-2">
                  <a
                    href={contact.social.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-cyan-400/50 text-cyan-300 text-xs font-[family-name:var(--font-share-tech-mono)]"
                  >
                    <FileText size={14} /> Resume
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenTerminal?.();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-fuchsia-400/50 text-fuchsia-300 text-xs font-[family-name:var(--font-share-tech-mono)]"
                  >
                    <TerminalSquare size={14} /> TTY
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-16" />
    </>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/70 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors"
    >
      {children}
    </a>
  );
}
