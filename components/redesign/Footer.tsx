'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { contact } from '@/data/portfolio';
import { AnimeBotAvatar } from './AnimeBotAvatar';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-[#1a2e1a] py-10 mt-10">
      <div className="cyber-divider absolute top-0 inset-x-0" />
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <Link href="#home" className="inline-flex items-center gap-3">
            <AnimeBotAvatar size={48} />
            <div className="leading-tight">
              <p className="font-bold text-[12px] text-[#00ff41]">Manikandan M</p>
              <p className="text-[8px] tracking-[0.25em] text-[#00e5ff] uppercase">MAXIM_OS</p>
            </div>
          </Link>
          <p className="mt-3 text-[10px] text-[#e8f5e9]/65 max-w-sm leading-[2em]">
            Pre-final year CSE student holding development and cybersecurity together — the way Spidey
            held the ferry.
          </p>
        </div>

        <div className="md:text-center">
          <p className="text-[8px] tracking-[0.25em] uppercase text-[#4caf50] mb-2">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px] text-[#e8f5e9]/70 md:inline-grid md:place-items-start">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#ctf">CTF</a>
            </li>
            <li>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/wirteups" target="_blank" rel="noopener noreferrer">
                Writeups
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 items-start md:items-end">
          <p className="text-[8px] tracking-[0.25em] uppercase text-[#4caf50] w-full md:text-right">
            Connect
          </p>
          <div className="flex flex-row items-center justify-start md:justify-end gap-2 flex-wrap">
            <a
              href={contact.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#1a2e1a] text-[#e8f5e9]/75 hover:text-[#00ff41] hover:border-[#00ff41] transition-none"
            >
              <Github size={16} />
            </a>
            <a
              href={contact.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#1a2e1a] text-[#e8f5e9]/75 hover:text-[#00ff41] hover:border-[#00ff41] transition-none"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#1a2e1a] text-[#e8f5e9]/75 hover:text-[#00e5ff] hover:border-[#00e5ff] transition-none"
            >
              <Mail size={16} />
            </a>
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#4caf50] hover:text-[#00ff41] transition-none whitespace-nowrap pt-0.5 md:self-end"
          >
            Back to top
            <ArrowUp size={12} className="shrink-0" aria-hidden />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 mt-8 pt-6 border-t-2 border-[#1a2e1a] flex flex-col md:flex-row gap-3 items-center justify-between">
        <p className="text-[8px] text-[#4caf50]">© {year} Manikandan M. All systems nominal.</p>
        <p className="text-[8px] text-[#4caf50]/80 text-center md:text-right">
          Built in {year} · Next.js · Tailwind v4 · Framer Motion
        </p>
      </div>
    </footer>
  );
}
