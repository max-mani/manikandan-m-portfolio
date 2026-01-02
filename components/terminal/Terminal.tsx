'use client';

import React, { useEffect, useRef } from 'react';
import { useTerminal } from './useTerminal';

export function Terminal() {
  const {
    lines,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    inputRef,
  } = useTerminal();
  
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      // Scroll to bottom to show the current prompt
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  // Scroll to bottom on mount to show initial prompt
  useEffect(() => {
    const timer = setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="h-full bg-black text-green-400 font-mono text-xs md:text-sm flex flex-col overflow-hidden terminal cursor-text"
      onClick={handleTerminalClick}
    >
      <div ref={outputRef} className="flex-1 overflow-y-auto p-2 md:p-4 space-y-1 scrollbar-thin">
        {lines.map((line) => {
          // Split multi-line content by newlines
          const contentLines = line.content.split('\n');
          
          return (
            <div key={line.id}>
              {contentLines.map((contentLine, lineIndex) => (
                <div key={lineIndex} className="flex items-start break-words">
                  {line.type === 'input' && lineIndex === 0 && (
                    <span className="text-cyan-400 mr-1 md:mr-2 flex-shrink-0 text-xs md:text-sm">
                      <span className="hidden sm:inline">maxim@maxim-portfolio:~$</span>
                      <span className="sm:hidden">maxim:~$</span>
                    </span>
                  )}
                  {line.type !== 'input' && lineIndex > 0 && (
                    <span className="text-cyan-400 mr-1 md:mr-2 flex-shrink-0 text-xs md:text-sm hidden sm:inline" style={{ width: '120px' }}></span>
                  )}
                  <span
                    className={
                      line.type === 'error'
                        ? 'text-red-400 whitespace-pre-wrap break-words text-xs md:text-sm'
                        : line.type === 'input'
                        ? 'text-green-400 break-words text-xs md:text-sm'
                        : 'text-green-300 whitespace-pre-wrap break-words text-xs md:text-sm'
                    }
                  >
                    {contentLine || ' '}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
        {/* Current input line with prompt */}
        <div className="flex items-start break-words">
          <span className="text-cyan-400 mr-1 md:mr-2 flex-shrink-0 text-xs md:text-sm">
            <span className="hidden sm:inline">maxim@maxim-portfolio:~$</span>
            <span className="sm:hidden">maxim:~$</span>
          </span>
          <span className="text-green-400 break-words flex-1 text-xs md:text-sm">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-green-400 outline-none focus:outline-none focus:ring-0 w-full text-xs md:text-sm"
              autoFocus
              spellCheck={false}
              aria-label="Terminal input"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

