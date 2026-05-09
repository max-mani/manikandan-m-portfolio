'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
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
    return <div className="text-emerald-300/95 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{line.text}</div>;
  }
  if (line.type === 'system') {
    return (
      <div className="text-cyan-200/70 text-[0.7rem] sm:text-[0.72rem] whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
        {line.text}
      </div>
    );
  }
  return <div className="text-white/85 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{line.text}</div>;
}

/** Tailwind `sm` is 640px — below that, skip text input so mobile keyboards stay closed. */
function useMobileTerminalLayout() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(max-width: 639px)');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia('(max-width: 639px)').matches,
    () => false
  );
}

export function FloatingTerminal({ open, onClose }: FloatingTerminalProps) {
  const { lines, runCommand } = useFloatingTerminal();
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobileLayout = useMobileTerminalLayout();

  useEffect(() => {
    if (open && !isMobileLayout) {
      inputRef.current?.focus();
    }
  }, [open, isMobileLayout]);

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
    if (!isMobileLayout) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[255] bg-black/50 backdrop-blur-[2px] sm:hidden"
            onClick={onClose}
          />
          <motion.div
            key="floating-terminal"
            initial={{ opacity: 0, y: 16, x: 28 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 12, x: 20 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            className={[
              'fixed z-[260] pointer-events-none',
              'max-sm:left-3 max-sm:right-3 max-sm:top-[calc(3.5rem+env(safe-area-inset-top))] max-sm:bottom-[max(0.75rem,env(safe-area-inset-bottom))]',
              'sm:left-auto sm:right-0 sm:top-14 sm:bottom-0 sm:w-1/2',
              'sm:pl-2 sm:pt-2 sm:pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pr-[max(0px,env(safe-area-inset-right))]',
            ].join(' ')}
          >
            <div
              className={[
                'pointer-events-auto flex h-full min-h-0 max-h-full flex-col overflow-hidden',
                'border border-cyan-400/35 bg-[rgba(5,6,12,0.96)] shadow-[0_12px_48px_rgba(0,0,0,0.55)] ring-1 ring-fuchsia-500/15 backdrop-blur-xl',
                'max-sm:rounded-2xl max-sm:border sm:rounded-l-xl sm:rounded-r-none sm:border-r-0',
              ].join(' ')}
              role="dialog"
              aria-label="Floating terminal"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[rgba(0,229,255,0.06)] px-3 py-2.5">
                <TerminalSquare size={16} className="shrink-0 text-cyan-300 sm:h-[14px] sm:w-[14px]" />
                <span className="min-w-0 flex-1 truncate font-[family-name:var(--font-share-tech-mono)] text-[0.62rem] leading-tight text-cyan-200/90 sm:text-[0.68rem]">
                  <span className="max-sm:hidden">maxim@portfolio:~ bash · floating TTY</span>
                  <span className="sm:hidden">floating TTY · maxim@portfolio</span>
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto inline-flex h-11 min-h-11 w-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/70 transition-colors active:scale-[0.98] hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 hover:text-fuchsia-100 sm:h-8 sm:min-h-0 sm:w-8 sm:min-w-0 sm:rounded-lg"
                  aria-label="Close terminal"
                >
                  <X size={20} strokeWidth={2} className="sm:h-[17px] sm:w-[17px]" />
                </button>
              </div>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                <div
                  className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-2.5 font-[family-name:var(--font-share-tech-mono)] text-[0.8rem] leading-relaxed sm:py-2 sm:text-[0.78rem]"
                  onClick={() => {
                    if (!isMobileLayout) inputRef.current?.focus();
                  }}
                >
                  {lines.map((line: TerminalLine) => (
                    <LineView key={line.id} line={line} />
                  ))}
                  <div ref={endRef} />
                </div>

                <div className="shrink-0 border-t border-white/10 bg-[rgba(8,10,18,0.9)] px-2 py-2.5 sm:py-2">
                  <p className="mb-2 font-[family-name:var(--font-share-tech-mono)] text-[0.6rem] uppercase tracking-wide text-cyan-200/50 sm:mb-1.5 sm:text-[0.62rem]">
                    Quick commands
                  </p>
                  <div className="max-h-[min(28vh,12rem)] overflow-y-auto overscroll-y-contain sm:max-h-[5rem]">
                    <div className="flex flex-wrap gap-2 sm:gap-1.5">
                      {QUICK_COMMANDS.map(({ label, cmd }) => (
                        <button
                          key={cmd}
                          type="button"
                          onClick={() => onQuick(cmd)}
                          className="min-h-10 touch-manipulation rounded-lg border border-cyan-400/30 bg-cyan-500/8 px-3 py-2 font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] text-cyan-100/95 transition-colors active:bg-cyan-500/15 hover:border-fuchsia-400/45 hover:bg-fuchsia-500/10 hover:text-fuchsia-100 sm:min-h-0 sm:rounded-md sm:px-2 sm:py-1 sm:text-[0.65rem]"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 border-t border-white/10 bg-[rgba(8,10,18,0.97)] px-3 py-3 sm:py-2.5">
                  {isMobileLayout ? (
                    <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 font-[family-name:var(--font-share-tech-mono)] text-[0.72rem] leading-snug text-white/55">
                      <span className="font-semibold text-cyan-400/90">$</span>
                      <span>
                        Quick commands only on this screen — typing is enabled on desktop (keyboard stays
                        off here).
                      </span>
                    </p>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <span className="shrink-0 text-base font-medium text-cyan-300 sm:text-sm">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        enterKeyHint="send"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            submit();
                          }
                        }}
                        className="min-w-0 flex-1 bg-transparent font-[family-name:var(--font-share-tech-mono)] text-base text-white/95 outline-none placeholder:text-white/30 sm:text-sm"
                        placeholder="help"
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        aria-label="Terminal input"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function FloatingTerminalLauncher({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      data-ft-terminal-launcher
      onClick={onOpen}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[250] inline-flex min-h-12 min-w-12 touch-manipulation items-center justify-center gap-2 rounded-xl border border-fuchsia-400/45 bg-[rgba(5,6,10,0.88)] px-3 py-3 text-fuchsia-200 text-xs font-[family-name:var(--font-share-tech-mono)] shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all active:scale-[0.98] hover:bg-fuchsia-500/10 hover:border-fuchsia-300 hover:text-white sm:min-h-0 sm:min-w-0 sm:rounded-lg sm:py-2.5"
      aria-label="Open floating terminal"
    >
      <TerminalSquare size={18} className="sm:h-4 sm:w-4" />
      <span className="hidden sm:inline">TTY</span>
    </button>
  );
}
