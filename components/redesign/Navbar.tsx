'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Code2,
  ShieldCheck,
  FileText,
  Menu,
  X,
  Smartphone,
  Trophy,
  TerminalSquare,
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

export function Navbar({ onOpenTerminal }: { onOpenTerminal?: () => void }) {
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
    const ids = SECTIONS.map((s) => s.id);
    const updateActive = () => {
      const markerY = window.innerHeight * 0.36;
      let best = ids[0];
      let bestDist = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const anchorY = r.top + Math.min(100, r.height * 0.32);
        const d = Math.abs(anchorY - markerY);
        if (d < bestDist) {
          bestDist = d;
          best = id;
        }
      }
      setActive(best);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={[
          'fixed inset-x-0 top-0 z-[100] transition-all duration-300 overflow-hidden',
          scrolled
            ? 'backdrop-blur-xl bg-[rgba(5,6,10,0.75)] border-b border-fuchsia-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
            : 'bg-[rgba(5,6,10,0.35)] border-b border-transparent',
        ].join(' ')}
      >
        <nav className="max-w-7xl mx-auto px-2 sm:px-3 md:px-5 min-h-14 py-2 flex items-center justify-between gap-1.5 sm:gap-2 lg:gap-3">
          <Link
            href="#home"
            className="flex items-center gap-1.5 sm:gap-3 group shrink-0 min-w-0 max-w-[42%] sm:max-w-none"
          >
            <AnimeBotAvatar size={36} withHalo />
            <div className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="font-[family-name:var(--font-display)] font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                MANIKANDAN
              </span>
              <span className="font-[family-name:var(--font-share-tech-mono)] text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.28em] text-fuchsia-300/80 truncate">
                MAXIM // CYBER
              </span>
            </div>
          </Link>

          {/* Section links: lg+ uses full width between brand and actions */}
          <ul className="hidden lg:grid flex-1 min-w-0 grid-cols-9 items-center gap-x-0.5 px-1 min-[1100px]:px-2 mx-1 min-[1100px]:mx-2 max-w-none list-none">
            {SECTIONS.map((s) => (
              <li key={s.id} className="min-w-0">
                <a
                  href={`#${s.id}`}
                  className={[
                    'flex h-9 min-h-9 w-full items-center justify-center rounded-md px-1 min-[1100px]:px-1.5',
                    'text-center font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] xl:text-[0.8125rem]',
                    'leading-none whitespace-nowrap tracking-tight transition-colors',
                    active === s.id
                      ? 'font-semibold text-cyan-300 bg-cyan-400/10 ring-1 ring-inset ring-cyan-400/45'
                      : 'font-medium text-white/70 hover:text-white',
                  ].join(' ')}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1 md:gap-1.5 shrink-0">
            <SocialIcon href={contact.social.github} label="GitHub" show="always">
              <Github size={15} />
            </SocialIcon>
            <SocialIcon href={contact.social.linkedin} label="LinkedIn" show="always">
              <Linkedin size={15} />
            </SocialIcon>
            <SocialIcon href={contact.social.leetcode} label="LeetCode" show="wide">
              <Code2 size={15} />
            </SocialIcon>
            <SocialIcon href={contact.social.hackthebox} label="HackTheBox" show="wide">
              <ShieldCheck size={15} />
            </SocialIcon>
            <SocialIcon href={contact.social.tryhackme} label="TryHackMe" show="wide">
              <Trophy size={15} />
            </SocialIcon>
            <SocialIcon href={contact.social.playstore} label="Play Store" show="wide">
              <Smartphone size={15} />
            </SocialIcon>

            <a
              href={contact.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 ml-0.5 px-2 py-1.5 rounded-md border border-cyan-400/50 text-cyan-300 text-[0.65rem] xl:text-xs font-[family-name:var(--font-share-tech-mono)] hover:bg-cyan-400/10 hover:border-cyan-300 hover:shadow-[0_0_14px_rgba(0,229,255,0.35)] transition-all whitespace-nowrap"
            >
              <FileText size={13} />
              <span className="hidden md:inline">Resume</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenTerminal?.()}
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-fuchsia-400/50 text-fuchsia-300 text-[0.65rem] xl:text-xs font-[family-name:var(--font-share-tech-mono)] hover:bg-fuchsia-400/10 hover:border-fuchsia-300 hover:shadow-[0_0_14px_rgba(168,85,247,0.4)] transition-all whitespace-nowrap"
              aria-label="Open floating terminal"
            >
              <TerminalSquare size={13} />
              <span className="hidden md:inline">TTY</span>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden ml-0.5 p-2.5 min-h-11 min-w-11 rounded-md border border-white/15 text-white/80 hover:text-white hover:border-cyan-400/60 shrink-0"
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
              className="lg:hidden border-t border-white/5 bg-[rgba(5,6,10,0.97)] backdrop-blur-xl max-h-[min(70vh,28rem)] overflow-y-auto"
            >
              <ul className="px-3 py-2 flex flex-col gap-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'block px-3 py-3 min-h-12 rounded-md font-[family-name:var(--font-share-tech-mono)] transition-colors',
                        active === s.id
                          ? 'bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-400/45 font-semibold'
                          : 'text-white/75 font-medium hover:bg-white/5 hover:text-white',
                      ].join(' ')}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 pt-2 border-t border-white/10 grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenTerminal?.();
                    }}
                    className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-fuchsia-400/50 text-fuchsia-300 text-xs font-[family-name:var(--font-share-tech-mono)]"
                  >
                    <TerminalSquare size={14} /> Floating TTY
                  </button>
                  <a
                    href={contact.social.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-cyan-400/50 text-cyan-300 text-xs font-[family-name:var(--font-share-tech-mono)]"
                  >
                    <FileText size={14} /> Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-14 sm:h-[3.75rem] lg:h-14" />
    </>
  );
}

function SocialIcon({
  href,
  label,
  children,
  show,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
  show: 'always' | 'wide';
}) {
  if (!href) return null;
  const wideOnly = show === 'wide';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={[
        'inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors shrink-0',
        wideOnly ? 'hidden lg:inline-flex' : 'inline-flex',
      ].join(' ')}
    >
      {children}
    </a>
  );
}
