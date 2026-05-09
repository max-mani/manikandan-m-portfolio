'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TerminalSquare, X } from 'lucide-react';
import { useFloatingTerminal, type TerminalLine } from './useFloatingTerminal';

type FloatingTerminalProps = {
  open: boolean;
  onClose: () => void;
};

/** One-click commands (same strings `runCommand` understands). */
const QUICK_COMMANDS: { label: string; cmd: string }[] = [
  { label: 'help', cmd: 'help' },
  { label: 'home', cmd: 'home' },
  { label: 'about', cmd: 'about' },
  { label: 'skills', cmd: 'skills' },
  { label: 'projects', cmd: 'projects' },
  { label: 'experience', cmd: 'experience' },
  { label: 'ctf', cmd: 'ctf' },
  { label: 'certs', cmd: 'certs' },
  { label: 'logbook', cmd: 'logbook' },
  { label: 'contact', cmd: 'contact' },
  { label: 'email', cmd: 'email' },
  { label: 'clear', cmd: 'clear' },
];

function LineView({ line }: { line: TerminalLine }) {
  if (line.type === 'input') {
    return <div className="text-emerald-300/95 whitespace-pre-wrap break-words">{line.text}</div>;
  }
  if (line.type === 'system') {
    return <div className="text-cyan-200/70 text-[0.72rem] whitespace-pre-wrap break-words">{line.text}</div>;
  }
  return <div className="text-white/85 whitespace-pre-wrap break-words">{line.text}</div>;
}

export function FloatingTerminal({ open, onClose }: FloatingTerminalProps) {
  const { lines, runCommand } = useFloatingTerminal();
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, open]);

  const submit = () => {
    const v = draft.trim();
    setDraft('');
    if (!v) return;
    runCommand(v);
  };

  const onQuick = (cmd: string) => {
    runCommand(cmd);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="floating-terminal"
          initial={{ x: 28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          className="fixed right-0 top-14 bottom-0 z-[260] w-1/2 pointer-events-none pr-[max(0px,env(safe-area-inset-right))] pb-[max(0.5rem,env(safe-area-inset-bottom))] pl-2 pt-2 sm:pl-3 sm:pb-3 sm:pt-3"
        >
          <div
            className="pointer-events-auto flex h-full min-h-0 flex-col overflow-hidden rounded-l-xl border border-cyan-400/35 border-r-0 bg-[rgba(5,6,12,0.94)] shadow-[-8px_0_48px_rgba(0,0,0,0.5)] ring-1 ring-fuchsia-500/15 backdrop-blur-xl"
            role="dialog"
            aria-label="Floating terminal"
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[rgba(0,229,255,0.06)] px-3 py-2.5">
              <TerminalSquare size={14} className="text-cyan-300 shrink-0" />
              <span className="min-w-0 flex-1 truncate font-[family-name:var(--font-share-tech-mono)] text-[0.68rem] text-cyan-200/90">
                maxim@portfolio:~ bash · floating TTY
              </span>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 hover:text-fuchsia-100"
                aria-label="Close terminal"
              >
                <X size={17} strokeWidth={2} />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div
                className="min-h-0 flex-1 overflow-y-auto px-3 py-2 space-y-1.5 font-[family-name:var(--font-share-tech-mono)] text-[0.78rem] leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line: TerminalLine) => (
                  <LineView key={line.id} line={line} />
                ))}
                <div ref={endRef} />
              </div>

              <div className="shrink-0 border-t border-white/10 bg-[rgba(8,10,18,0.88)] px-2 py-2">
                <p className="mb-1.5 font-[family-name:var(--font-share-tech-mono)] text-[0.62rem] uppercase tracking-wide text-cyan-200/45">
                  Quick commands
                </p>
                <div className="flex max-h-[4.5rem] flex-wrap gap-1.5 overflow-y-auto sm:max-h-[5rem]">
                  {QUICK_COMMANDS.map(({ label, cmd }) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => onQuick(cmd)}
                      className="rounded-md border border-cyan-400/25 bg-cyan-500/5 px-2 py-1 font-[family-name:var(--font-share-tech-mono)] text-[0.65rem] text-cyan-100/90 transition-colors hover:border-fuchsia-400/45 hover:bg-fuchsia-500/10 hover:text-fuchsia-100"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 border-t border-white/10 bg-[rgba(8,10,18,0.95)] px-3 py-2.5">
                <span className="text-cyan-300 text-sm shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent font-[family-name:var(--font-share-tech-mono)] text-sm text-white/95 outline-none placeholder:text-white/25"
                  placeholder="help"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingTerminalLauncher({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[250] inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-fuchsia-400/45 bg-[rgba(5,6,10,0.85)] backdrop-blur-md text-fuchsia-200 text-xs font-[family-name:var(--font-share-tech-mono)] shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:bg-fuchsia-500/10 hover:border-fuchsia-300 hover:text-white transition-all"
      aria-label="Open floating terminal"
    >
      <TerminalSquare size={16} />
      <span className="hidden sm:inline">TTY</span>
    </button>
  );
}
