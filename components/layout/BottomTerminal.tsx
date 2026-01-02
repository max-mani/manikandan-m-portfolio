'use client';

import React, { useState, useEffect } from 'react';
import { Terminal } from '../terminal/Terminal';
import { HintPanel } from './HintPanel';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function BottomTerminal() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`${isCollapsed ? 'h-12' : 'h-1/3 md:h-1/3'} border-t border-green-800 transition-all duration-300 flex flex-col`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden bg-black/80 border-b border-green-800 px-4 py-2 flex items-center justify-between text-green-400 hover:text-cyan-400 transition-colors touch-manipulation"
      >
        <span className="text-xs md:text-sm font-mono">Terminal</span>
        {mounted && (isCollapsed ? <ChevronUp size={18} className="md:w-5 md:h-5" /> : <ChevronDown size={18} className="md:w-5 md:h-5" />)}
      </button>
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1">
            <Terminal />
          </div>
          {/* Hint Panel inside terminal view */}
          <div className="hidden md:block w-[20%] border-l border-green-800">
            <HintPanel />
          </div>
        </div>
      )}
    </div>
  );
}

