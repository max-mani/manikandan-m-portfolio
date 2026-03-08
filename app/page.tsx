'use client';

import { useState, useEffect } from 'react';
import { UIProvider } from '@/context/UIContext';
import { MatrixRain } from '@/components/shared/MatrixRain';
import { ScanLine } from '@/components/shared/ScanLine';
import { BootOverlay } from '@/components/home/BootOverlay';
import { TitleBar } from '@/components/home/TitleBar';
import { AsciiPanel } from '@/components/home/AsciiPanel';
import { TerminalPanel } from '@/components/home/TerminalPanel';
import { MessageModal } from '@/components/home/MessageModal';

export default function Home() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  return (
    <UIProvider>
      <div className="h-screen overflow-hidden bg-[var(--bg)] text-[var(--g)] terminal-root">
        <MatrixRain />
        <ScanLine />
        {!bootDone && <BootOverlay onDone={() => setBootDone(true)} />}

        <div className="h-full flex flex-col">
          <TitleBar />
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <AsciiPanel onOpenMessage={() => setIsMessageOpen(true)} />
            <TerminalPanel onOpenMessage={() => setIsMessageOpen(true)} />
          </div>
        </div>

        {isMessageOpen && (
          <MessageModal onClose={() => setIsMessageOpen(false)} />
        )}
      </div>
    </UIProvider>
  );
}
