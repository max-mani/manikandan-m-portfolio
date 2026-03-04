'use client';

import { useState } from 'react';
import { UIProvider } from '@/context/UIContext';
import { Terminal } from '@/components/terminal/Terminal';
import { HintPanel } from '@/components/layout/HintPanel';
import { MatrixRain } from '@/components/effects/MatrixRain';
import { MessageOverlay } from '@/components/terminal/MessageOverlay';
import { AsciiPanel } from '@/components/layout/AsciiPanel';
import { BootOverlay } from '@/components/layout/BootOverlay';
import { TitleBar } from '@/components/layout/TitleBar';

export default function Home() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  return (
    <UIProvider>
      <div className="relative h-screen bg-[var(--bg)] overflow-hidden text-[var(--g)] terminal-root">
        {/* Matrix rain background */}
        <div className="pointer-events-none absolute inset-0 opacity-25 z-0">
          <MatrixRain />
        </div>

        <div className="relative z-20 h-full flex flex-col scanline">
          <TitleBar />
          {/* Main layout: left ASCII + contact/message, right terminal */}
          <div className="flex flex-1 overflow-hidden">
            <AsciiPanel />
            <div className="w-full md:w-[70%] h-full flex flex-col pr-3 py-4 bg-[var(--panel)]">
              {/* Welcome marquee */}
              <div className="hidden md:block mb-3 bg-[#010f03] border-b border-[var(--border)] px-[18px] py-[5px] text-[0.68rem] text-[var(--gdim)] whitespace-nowrap overflow-hidden">
                <span className="inline-block animate-[welcome-scroll_30s_linear_infinite]">
                  &gt;&gt; Welcome to Maxim&apos;s cyber terminal. Type &quot;help&quot; to see available commands.  |  Chennai, India  |  1984 MODE ACTIVE  |  ALL SYSTEMS NOMINAL  |  IP: 2401:4900:cae7:3247:99fd:5baa:86d7:7432  |&nbsp;&nbsp;
                </span>
              </div>
              <div className="flex-1 min-h-0">
                <Terminal onOpenMessage={() => setIsMessageOpen(true)} />
              </div>
            </div>
          </div>
        </div>

        {!bootDone && <BootOverlay onDone={() => setBootDone(true)} />}

        {/* Message overlay */}
        {isMessageOpen && (
          <MessageOverlay onClose={() => setIsMessageOpen(false)} />
        )}
      </div>
    </UIProvider>
  );
}
