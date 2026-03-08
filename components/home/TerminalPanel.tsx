'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTerminal } from '@/components/terminal/useTerminal';

interface TerminalPanelProps {
  onOpenMessage?: () => void;
}

export function TerminalPanel({ onOpenMessage }: TerminalPanelProps) {
  const {
    lines,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    inputRef,
    executeCommand,
  } = useTerminal({ onOpenMessage });

  const outputRef = useRef<HTMLDivElement>(null);
  const [typingState, setTypingState] = useState<{
    lineId: string;
    visibleLength: number;
  } | null>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines, currentInput, typingState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lines.length === 0) return;
    const last = lines[lines.length - 1];
    if (last.type === 'input') return;

    if (!typingState || typingState.lineId !== last.id) {
      setTypingState({ lineId: last.id, visibleLength: 0 });
    }
  }, [lines, typingState]);

  useEffect(() => {
    if (!typingState) return;
    const currentLine = lines.find((l) => l.id === typingState.lineId);
    if (!currentLine) return;

    const full = currentLine.content;
    if (typingState.visibleLength >= full.length) return;

    const step = 3;
    const timer = setTimeout(() => {
      setTypingState((prev) =>
        prev && prev.lineId === currentLine.id
          ? { ...prev, visibleLength: Math.min(full.length, prev.visibleLength + step) }
          : prev
      );
    }, 28);

    return () => clearTimeout(timer);
  }, [typingState, lines]);

  const handlePanelClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).tagName !== 'BUTTON' &&
      (e.target as HTMLElement).tagName !== 'A'
    ) {
      inputRef.current?.focus();
    }
  };

  const runHint = (cmd: string) => {
    executeCommand(cmd);
  };

  const getLineColor = (line: { type: string; id: string }, trimmed: string) => {
    if (line.type === 'error') return 'text-red-400'; // #f87171
    if (line.type === 'input') return 'text-emerald-400'; // #34d399
    if (line.type === 'output') {
      if (
        trimmed.startsWith('+') ||
        trimmed.startsWith('-') ||
        trimmed.startsWith('|') ||
        trimmed.startsWith('=') ||
        trimmed.startsWith('==')
      ) {
        return 'text-[var(--y)]';
      }
      if (trimmed.startsWith('Tip:') || trimmed.toLowerCase().startsWith('tip:')) {
        return 'text-[var(--m)]';
      }
      if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('->')) {
        return 'text-[var(--c)]';
      }
      return 'text-cyan-300'; // #67e8f9
    }
    return 'text-cyan-300';
  };

  return (
    <div
      className="flex flex-col w-full lg:w-[70%] overflow-hidden bg-[var(--panel)]"
      style={{ fontFamily: 'var(--font-share-tech-mono)' }}
    >
      {/* Welcome Marquee - desktop only */}
      <div
        className="hidden lg:block bg-[#010f03] border-b border-[var(--border)] px-[18px] py-[5px] text-[0.68rem] text-[var(--gdim)] whitespace-nowrap overflow-hidden"
      >
        <span
          className="inline-block animate-[marqueeScroll_30s_linear_infinite]"
          style={{ animation: 'marqueeScroll 30s linear infinite' }}
        >
          &gt;&gt; Welcome to Maxim&apos;s cyber terminal. Type &quot;help&quot; to see available commands.  |  Chennai, India  |  1984 MODE ACTIVE  |  ALL SYSTEMS NOMINAL  |  IP: 2401:4900:cae7:3247:99fd:5baa:86d7:7432  |&nbsp;&nbsp;
        </span>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-[18px] py-[14px] bg-black/50 cursor-text scroll-smooth"
        style={{
          fontFamily: 'var(--font-share-tech-mono)',
          fontSize: '14px',
        }}
        onClick={handlePanelClick}
      >
        <div className="space-y-1.5 text-sm md:text-base">
          {lines.map((line) => {
            const isTypingLine = typingState && typingState.lineId === line.id;
            const rawContent = isTypingLine
              ? line.content.slice(0, typingState!.visibleLength)
              : line.content;
            const contentLines = rawContent.split('\n');

            if (line.id === 'banner-ascii') {
              return (
                <div key={line.id} className="mb-1">
                  <img
                    src="/images/ascii-banner.png"
                    alt="MAXIM banner"
                    className="h-auto w-full max-w-[320px] block"
                    width={480}
                    height={112}
                  />
                </div>
              );
            }

            return (
              <div key={line.id}>
                {contentLines.map((contentLine, lineIndex) => {
                  const trimmed = contentLine.trim();
                  const colorClass = getLineColor(line, trimmed);

                  return (
                    <div key={lineIndex} className="flex items-start break-words">
                      {line.type === 'input' && lineIndex === 0 && (
                        <span className="text-[var(--c)] mr-2 flex-shrink-0 text-[0.95rem] md:text-[1rem]">
                          maxim@terminal:~$
                        </span>
                      )}
                      {line.type !== 'input' && lineIndex > 0 && line.id !== 'banner' && (
                        <span
                          className="text-[var(--c)] mr-2 flex-shrink-0 text-[0.95rem] md:text-[1rem] hidden sm:inline"
                          style={{ width: '160px' }}
                        />
                      )}
                      {line.id === 'banner' && contentLine.includes('help') ? (
                        <span className="whitespace-pre-wrap break-words text-sm md:text-base">
                          {contentLine.slice(0, contentLine.indexOf('help'))}
                          <span className="text-[var(--y)]">help</span>
                          {contentLine.slice(contentLine.indexOf('help') + 4) ||
                            (isTypingLine ? '' : ' ')}
                        </span>
                      ) : (
                        <span
                          className={`${colorClass} whitespace-pre-wrap break-words text-sm md:text-base`}
                        >
                          {contentLine || (isTypingLine ? '' : ' ')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint buttons row */}
      <div className="border-t border-[var(--border)] bg-[#010b03] px-[18px] py-[5px] pt-[3px] flex flex-wrap gap-[5px]">
        {[
          'whoami',
          'skills',
          'projects',
          'education',
          'experience',
          'contact',
          'writeups',
          'blogs',
          'clear',
          'help',
        ].map((cmd) => (
          <button
            key={cmd}
            onClick={() => runHint(cmd)}
            className="text-[0.95rem] md:text-[1rem] text-[var(--gdim)] border border-[#002808] px-[8px] py-[2px] rounded-[2px] hover:text-[var(--g)] hover:border-[var(--g)] hover:bg-[var(--gglow)] transition-colors duration-150"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="border-t border-[var(--border)] bg-[#010b03] px-[18px] py-[8px] flex items-center gap-[8px]">
        <span className="text-[var(--c)] text-[0.95rem] md:text-[1rem] whitespace-nowrap">
          maxim@terminal:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[var(--g)] text-[0.95rem] md:text-[1rem] caret-[var(--g)] placeholder-[#003a10]"
          autoFocus
          spellCheck={false}
          aria-label="Terminal input"
          placeholder="enter command..."
        />
      </div>
    </div>
  );
}
