'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, TerminalSquare } from 'lucide-react';
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
      {/* Fixed shell has no Framer transform — chaos animates inner bar only (syncs with rest of page). */}
      <header className="fixed inset-x-0 top-0 z-[100] transition-none">
        <div
          data-chaos-fall-root="navbar"
          className={[
            'overflow-hidden border-b-2 transition-none',
            scrolled
              ? 'bg-[#050a05]/95 border-[#1a2e1a] shadow-[0_4px_0_0_#0a140a]'
              : 'bg-[#050a05]/80 border-transparent',
          ].join(' ')}
        >
          <nav
            data-chaos-include
            className="max-w-7xl mx-auto px-2 sm:px-3 md:px-5 min-h-16 py-2 flex items-center gap-2 sm:gap-3"
          >
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
            <AnimeBotAvatar
              size={48}
              variant="portrait"
              alt="Manikandan M — pixel art profile photo"
              withHalo
              chaosClicks
              onNonChaosClick={() =>
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
              }
            />
            <a
              href="#home"
              data-chaos-include
              className="group hidden sm:flex flex-col leading-tight min-w-0"
            >
              <span className="font-bold text-[10px] text-[#e8f5e9] group-hover:text-[#00ff41] transition-none truncate">
                MANIKANDAN
              </span>
              <span className="text-[8px] tracking-[0.2em] sm:tracking-[0.25em] text-[#00e5ff] truncate uppercase">
                MAXIM
              </span>
            </a>
          </div>

          <ul
            data-chaos-include
            className="hidden lg:flex flex-1 min-w-0 max-w-full items-center justify-center gap-x-1.5 xl:gap-x-2.5 list-none px-1 xl:px-2 lg:flex-nowrap lg:overflow-x-auto [scrollbar-width:thin] py-0.5"
          >
            {SECTIONS.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className={[
                    'flex min-h-9 items-center justify-center whitespace-nowrap px-2.5 xl:px-3',
                    'text-center text-[9px] xl:text-[10px] leading-tight tracking-tight transition-none border-2',
                    active === s.id
                      ? 'font-bold text-[#00ff41] border-[#00ff41] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41]'
                      : 'font-medium text-[#e8f5e9]/70 border-transparent hover:text-[#00e5ff]',
                  ].join(' ')}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-1 sm:gap-1.5 shrink-0 ml-auto lg:ml-0">
            <a
              href={contact.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-chaos-include
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1.5 border-2 border-[#00e5ff] text-[#00e5ff] text-[8px] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff] hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41] transition-none whitespace-nowrap"
            >
              <FileText size={12} />
              <span className="hidden md:inline">Resume</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenTerminal?.()}
              data-chaos-include
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1.5 border-2 border-[#00ff41] text-[#00ff41] text-[8px] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41] hover:border-[#00e5ff] hover:text-[#00e5ff] transition-none whitespace-nowrap"
              aria-label="Open floating terminal"
            >
              <TerminalSquare size={12} />
              <span className="hidden md:inline">TTY</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2.5 min-h-11 min-w-11 border-2 border-[#1a2e1a] text-[#e8f5e9]/80 hover:text-[#00ff41] hover:border-[#00ff41] shrink-0 transition-none"
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
              transition={{ duration: 0.1 }}
              className="lg:hidden border-t-2 border-[#1a2e1a] bg-[#050a05] max-h-[min(70vh,28rem)] overflow-y-auto"
            >
              <ul className="px-3 py-2 flex flex-col gap-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'block px-3 py-3 min-h-12 border-2 transition-none',
                        active === s.id
                          ? 'border-[#00ff41] bg-[#0a140a] text-[#00ff41] font-bold shadow-[2px_2px_0_0_#00ff41]'
                          : 'border-transparent text-[#e8f5e9]/75 font-medium hover:border-[#1a2e1a]',
                      ].join(' ')}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 pt-2 border-t-2 border-[#1a2e1a] grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenTerminal?.();
                    }}
                    className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-[#00ff41] text-[#00ff41] text-[10px] bg-[#0a140a] shadow-[2px_2px_0_0_#00ff41]"
                  >
                    <TerminalSquare size={14} /> Floating TTY
                  </button>
                  <a
                    href={contact.social.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 border-2 border-[#00e5ff] text-[#00e5ff] text-[10px] bg-[#0a140a] shadow-[2px_2px_0_0_#00e5ff]"
                  >
                    <FileText size={14} /> Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </header>

      <div className="h-16 sm:h-[4.25rem] lg:h-16" />
    </>
  );
}
