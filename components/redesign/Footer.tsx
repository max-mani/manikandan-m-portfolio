'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, TerminalSquare, ArrowUp } from 'lucide-react';
import { contact } from '@/data/portfolio';
import { AnimeBotAvatar } from './AnimeBotAvatar';

interface FooterProps {
  onOpenTerminal?: () => void;
}

export function Footer({ onOpenTerminal }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] py-10 mt-10">
      <div className="cyber-divider absolute top-0 inset-x-0" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <Link href="#home" className="inline-flex items-center gap-3">
            <AnimeBotAvatar size={36} />
            <div className="leading-tight">
              <p className="font-[family-name:var(--font-display)] font-bold text-white">
                Manikandan M
              </p>
              <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] text-fuchsia-300/85">
                MAX // CYBER+CODE
              </p>
            </div>
          </Link>
          <p className="mt-3 text-sm text-white/55 max-w-sm">
            Pre-final year CSE student holding development and cybersecurity together — the way Spidey held the ferry.
          </p>
        </div>

        <div className="md:text-center">
          <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] uppercase text-cyan-300/80 mb-2">
            Navigate
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-white/65 md:inline-grid md:place-items-start">
            <li><a href="#about" className="hover:text-cyan-300">About</a></li>
            <li><a href="#projects" className="hover:text-cyan-300">Projects</a></li>
            <li><a href="#skills" className="hover:text-cyan-300">Skills</a></li>
            <li><a href="#experience" className="hover:text-cyan-300">Experience</a></li>
            <li><a href="#ctf" className="hover:text-cyan-300">CTF</a></li>
            <li><Link href="/blogs" className="hover:text-cyan-300">Blogs</Link></li>
            <li><Link href="/wirteups" className="hover:text-cyan-300">Writeups</Link></li>
            <li><Link href="/terminal" className="hover:text-cyan-300">Terminal</Link></li>
          </ul>
        </div>

        <div className="md:text-right">
          <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] uppercase text-cyan-300/80 mb-3">
            Connect
          </p>
          <div className="inline-flex items-center gap-2 md:justify-end flex-wrap">
            <a
              href={contact.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-cyan-300 hover:border-cyan-400/55"
            >
              <Github size={14} />
            </a>
            <a
              href={contact.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-cyan-300 hover:border-cyan-400/55"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-fuchsia-300 hover:border-fuchsia-400/55"
            >
              <Mail size={14} />
            </a>
            <button
              onClick={onOpenTerminal}
              aria-label="Open terminal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-emerald-300 hover:border-emerald-400/55"
            >
              <TerminalSquare size={14} />
            </button>
          </div>
          <a
            href="#home"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-[family-name:var(--font-share-tech-mono)] tracking-widest uppercase text-white/55 hover:text-cyan-300"
          >
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row gap-3 items-center justify-between">
        <p className="text-xs text-white/45 font-[family-name:var(--font-share-tech-mono)]">
          © {year} Manikandan M. All systems nominal.
        </p>
        <p className="text-xs text-white/40 font-[family-name:var(--font-share-tech-mono)]">
          Built with Next.js · Tailwind v4 · Framer Motion
        </p>
      </div>
    </footer>
  );
}
