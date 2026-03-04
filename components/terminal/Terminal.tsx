'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTerminal } from './useTerminal';

interface TerminalProps {
  onOpenMessage?: () => void;
}

export function Terminal({ onOpenMessage }: TerminalProps) {
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

  // Scroll to bottom on mount to show initial prompt
  useEffect(() => {
    const timer = setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Start typing animation for the latest non-input line
  useEffect(() => {
    if (lines.length === 0) return;
    const last = lines[lines.length - 1];
    if (last.type === 'input') return;

    if (!typingState || typingState.lineId !== last.id) {
      setTypingState({ lineId: last.id, visibleLength: 0 });
    }
  }, [lines, typingState]);

  // Drive the typewriter effect
  useEffect(() => {
    if (!typingState) return;
    const currentLine = lines.find(l => l.id === typingState.lineId);
    if (!currentLine) return;

    const full = currentLine.content;
    if (typingState.visibleLength >= full.length) {
      return;
    }

    const step = 3; // characters per frame
    const timer = setTimeout(() => {
      setTypingState(prev =>
        prev && prev.lineId === currentLine.id
          ? { ...prev, visibleLength: Math.min(full.length, prev.visibleLength + step) }
          : prev
      );
    }, 20);

    return () => clearTimeout(timer);
  }, [typingState, lines]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const runHint = (cmd: string) => {
    executeCommand(cmd);
  };

  return (
    <div
      className="h-full bg-black text-green-400 font-mono text-sm md:text-base flex flex-col overflow-hidden terminal cursor-text"
      onClick={handleTerminalClick}
    >
      <div ref={outputRef} className="flex-1 overflow-y-auto p-3 md:p-5 space-y-1.5 scrollbar-thin">
        {lines.map((line) => {
          const isTypingLine = typingState && typingState.lineId === line.id;
          const rawContent = isTypingLine
            ? line.content.slice(0, typingState.visibleLength)
            : line.content;
          const contentLines = rawContent.split('\n');
          
          return (
            <div key={line.id}>
              {contentLines.map((contentLine, lineIndex) => (
                <div key={lineIndex} className="flex items-start break-words">
                  {line.type === 'input' && lineIndex === 0 && (
                    <span className="text-cyan-400 mr-1 md:mr-2 flex-shrink-0 text-sm md:text-base">
                      <span className="hidden sm:inline">maxim@maxim-portfolio:~$</span>
                      <span className="sm:hidden">maxim:~$</span>
                    </span>
                  )}
                  {line.type !== 'input' &&
                    lineIndex > 0 &&
                    line.id !== 'banner' && (
                      <span
                        className="text-cyan-400 mr-1 md:mr-2 flex-shrink-0 text-sm md:text-base hidden sm:inline"
                        style={{ width: '140px' }}
                      ></span>
                    )}
                  {(() => {
                    const common = 'whitespace-pre-wrap break-words text-sm md:text-base';

                    // Special coloring for the banner help word
                    if (line.id === 'banner' && contentLine.includes('help')) {
                      const idx = contentLine.indexOf('help');
                      const before = contentLine.slice(0, idx);
                      const after = contentLine.slice(idx + 4);
                      return (
                        <span className={common}>
                          {before}
                          <span className="text-[var(--y)]">help</span>
                          {after || (isTypingLine ? '' : ' ')}
                        </span>
                      );
                    }

                    const trimmed = contentLine.trim();
                    let baseClass =
                      line.type === 'error'
                        ? 'text-red-400'
                        : line.type === 'input'
                        ? 'text-emerald-400'
                        : 'text-cyan-300';

                    if (line.type === 'output') {
                      if (trimmed.startsWith('==') || trimmed.startsWith('┌') || trimmed.startsWith('└')) {
                        baseClass = 'text-[var(--y)]';
                      } else if (trimmed.startsWith('Tip:') || trimmed.startsWith('TIP:')) {
                        baseClass = 'text-[var(--m)]';
                      } else if (trimmed.startsWith('•') || trimmed.startsWith('- ')) {
                        baseClass = 'text-[var(--c)]';
                      }
                    }

                    return (
                      <span className={`${baseClass} ${common}`}>
                        {contentLine || (isTypingLine ? '' : ' ')}
                      </span>
                    );
                  })()}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {/* Hints row */}
      <div className="border-t border-[var(--border)] bg-[#010b03] px-[18px] py-[4px] flex flex-wrap gap-[5px]">
        {['whoami', 'skills', 'projects', 'education', 'experience', 'contact', 'writeups', 'clear', 'help'].map(cmd => (
          <button
            key={cmd}
            onClick={() => runHint(cmd)}
            className="hint text-[0.8rem] md:text-[0.9rem] text-[var(--gdim)] border border-[#002808] px-[8px] py-[2px] rounded-[2px] hover:text-[var(--g)] hover:border-[var(--g)] hover:bg-[var(--gglow)] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
      {/* Current input line with prompt */}
      <div className="border-t border-[var(--border)] bg-[#010b03] px-[18px] py-[10px] flex items-center gap-[8px]">
        <span className="text-[var(--c)] text-[0.9rem] md:text-[1rem] whitespace-nowrap">maxim@terminal:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[var(--g)] text-[0.9rem] md:text-[1rem] caret-[var(--g)]"
          autoFocus
          spellCheck={false}
          aria-label="Terminal input"
          placeholder="enter command..."
        />
      </div>
    </div>
  );
}

