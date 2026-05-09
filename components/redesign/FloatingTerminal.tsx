'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TerminalSquare,
  X,
  Minus,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import Link from 'next/link';
import { UIProvider } from '@/context/UIContext';
import { useTerminal } from '@/components/terminal/useTerminal';

interface FloatingTerminalProps {
  open: boolean;
  onClose: () => void;
  onOpenMessage?: () => void;
}

export function FloatingTerminal({ open, onClose, onOpenMessage }: FloatingTerminalProps) {
  return (
    <UIProvider>
      <FloatingTerminalInner open={open} onClose={onClose} onOpenMessage={onOpenMessage} />
    </UIProvider>
  );
}

function FloatingTerminalInner({ open, onClose, onOpenMessage }: FloatingTerminalProps) {
  const [maximized, setMaximized] = useState(false);
  const {
    lines,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    inputRef,
    executeCommand,
  } = useTerminal({ onOpenMessage });

  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open, inputRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const HINTS = ['whoami', 'projects', 'skills', 'ctfs', 'contact', 'help', 'clear'];

  const lineColor = (line: { type: string }, trimmed: string) => {
    if (line.type === 'error') return 'text-red-400';
    if (line.type === 'input') return 'text-emerald-300';
    if (
      trimmed.startsWith('+') ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('|') ||
      trimmed.startsWith('=') ||
      trimmed.startsWith('==')
    ) return 'text-amber-300';
    if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('->')) return 'text-cyan-300';
    if (trimmed.toLowerCase().startsWith('tip:')) return 'text-fuchsia-300';
    return 'text-cyan-200';
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="floating-terminal"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={[
            'fixed z-[300] flex flex-col rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_50px_rgba(168,85,247,0.25)]',
            'bg-[rgba(5,7,15,0.96)] backdrop-blur-xl',
            'font-[family-name:var(--font-share-tech-mono)]',
            maximized
              ? 'inset-2 sm:inset-4 md:inset-8'
              : 'bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[560px] md:w-[620px] h-[480px] sm:h-[520px]',
          ].join(' ')}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[rgba(8,10,22,0.95)] border-b border-white/[0.06]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-cyan-400/45 bg-cyan-400/10 text-cyan-300">
                <TerminalSquare size={12} />
              </span>
              <span className="text-[0.7rem] tracking-[0.25em] uppercase text-cyan-300/85 truncate">
                maxim@portfolio: ~ bash · TTY
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMaximized((v) => !v)}
                aria-label={maximized ? 'Restore' : 'Maximize'}
                className="inline-flex h-6 w-6 items-center justify-center rounded text-white/55 hover:text-cyan-300 hover:bg-white/5"
              >
                {maximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              </button>
              <button
                onClick={onClose}
                aria-label="Minimize"
                className="inline-flex h-6 w-6 items-center justify-center rounded text-white/55 hover:text-amber-300 hover:bg-white/5"
              >
                <Minus size={12} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close terminal"
                className="inline-flex h-6 w-6 items-center justify-center rounded text-white/55 hover:text-red-300 hover:bg-white/5"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto px-4 py-3 text-sm leading-relaxed cursor-text"
            onClick={() => inputRef.current?.focus()}
            style={{ background: 'transparent' }}
          >
            <div className="space-y-1">
              {lines.map((line) => {
                if (line.id === 'banner-ascii') {
                  return (
                    <div key={line.id} className="mb-2">
                      <span className="font-[family-name:var(--font-display)] text-base text-gradient-cyber">
                        MAXIM // CYBER+CODE TERMINAL
                      </span>
                    </div>
                  );
                }

                const contentLines = line.content.split('\n');
                return (
                  <div key={line.id}>
                    {contentLines.map((cl, i) => {
                      const trimmed = cl.trim();
                      const color = lineColor(line, trimmed);
                      return (
                        <div key={i} className="flex items-start break-words">
                          {line.type === 'input' && i === 0 && (
                            <span className="text-cyan-300 mr-2 flex-shrink-0">
                              maxim@terminal:~$
                            </span>
                          )}
                          <span
                            className={[
                              color,
                              'whitespace-pre-wrap break-words',
                            ].join(' ')}
                          >
                            {cl || ' '}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hint chips */}
          <div className="px-3 py-2 border-t border-white/[0.06] flex flex-wrap gap-1.5">
            {HINTS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="text-[0.7rem] text-white/60 border border-white/10 px-2 py-0.5 rounded hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-colors"
              >
                {cmd}
              </button>
            ))}
            <Link
              href="/terminal"
              className="ml-auto text-[0.7rem] text-fuchsia-300/85 hover:text-fuchsia-200 underline-offset-4 hover:underline"
            >
              open full terminal →
            </Link>
          </div>

          {/* Input */}
          <div className="px-3 py-2 border-t border-white/[0.06] bg-[rgba(8,10,22,0.95)] flex items-center gap-2">
            <span className="text-cyan-300 text-sm shrink-0">maxim@terminal:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-cyan-100 text-sm caret-cyan-300 placeholder:text-white/30"
              spellCheck={false}
              autoFocus
              placeholder="enter command..."
              aria-label="Floating terminal input"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingTerminalLauncher({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open terminal"
      className="fixed z-[200] bottom-5 right-5 group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-cyan-400/55 bg-[rgba(5,7,15,0.85)] backdrop-blur-xl text-cyan-200 hover:text-white hover:border-cyan-300 hover:bg-[rgba(0,229,255,0.12)] hover:shadow-[0_0_24px_rgba(0,229,255,0.45)] transition-all"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <TerminalSquare size={16} />
      <span className="hidden sm:inline font-[family-name:var(--font-share-tech-mono)] text-[0.75rem] tracking-[0.25em] uppercase">
        TTY
      </span>
    </button>
  );
}
