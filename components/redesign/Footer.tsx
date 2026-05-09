'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { contact } from '@/data/portfolio';
import { AnimeBotAvatar } from './AnimeBotAvatar';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] py-10 mt-10">
      <div className="cyber-divider absolute top-0 inset-x-0" />
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <Link href="#home" className="inline-flex items-center gap-3">
            <AnimeBotAvatar size={36} />
            <div className="leading-tight">
              <p className="font-[family-name:var(--font-display)] font-bold text-white">
                Manikandan M
              </p>
              <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] text-fuchsia-300/85">
                MAXIM // CYBER+CODE
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
            <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">Blogs</Link></li>
            <li><Link href="/wirteups" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">Writeups</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 items-start md:items-end">
          <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] tracking-[0.3em] uppercase text-cyan-300/80 w-full md:text-right">
            Connect
          </p>
          <div className="flex flex-row items-center justify-start md:justify-end gap-2 flex-wrap">
            <a
              href={contact.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-cyan-300 hover:border-cyan-400/55 transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href={contact.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-cyan-300 hover:border-cyan-400/55 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 text-white/75 hover:text-fuchsia-300 hover:border-fuchsia-400/55 transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-xs font-[family-name:var(--font-share-tech-mono)] tracking-widest uppercase text-white/55 hover:text-cyan-300 transition-colors whitespace-nowrap pt-0.5 md:self-end"
          >
            Back to top
            <ArrowUp size={12} className="shrink-0" aria-hidden />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 mt-8 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row gap-3 items-center justify-between">
        <p className="text-xs text-white/45 font-[family-name:var(--font-share-tech-mono)]">
          © {year} Manikandan M. All systems nominal.
        </p>
        <p className="text-xs text-white/40 font-[family-name:var(--font-share-tech-mono)] text-center md:text-right">
          Built in {year} · Next.js · Tailwind v4 · Framer Motion
        </p>
      </div>
    </footer>
  );
}
