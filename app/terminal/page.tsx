'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { UIProvider } from '@/context/UIContext';
import { MatrixRain } from '@/components/shared/MatrixRain';
import { ScanLine } from '@/components/shared/ScanLine';
import { BootOverlay } from '@/components/home/BootOverlay';
import { TitleBar } from '@/components/home/TitleBar';
import { AsciiPanel } from '@/components/home/AsciiPanel';
import { TerminalPanel } from '@/components/home/TerminalPanel';
import { MessageModal } from '@/components/home/MessageModal';
import { BodyMode } from '@/components/redesign/BodyMode';

export default function TerminalPage() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  return (
    <UIProvider>
      <BodyMode mode="terminal" />
      <div className="h-screen overflow-hidden bg-[var(--bg)] text-[var(--g)] terminal-root">
        <MatrixRain />
        <ScanLine />
        {!bootDone && <BootOverlay onDone={() => setBootDone(true)} />}

        <Link
          href="/"
          className="fixed top-2 right-3 z-[300] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[rgba(0,18,4,0.85)] text-[var(--gdim)] hover:text-[var(--c)] hover:border-[var(--c)] text-[0.7rem] font-[var(--font-share-tech-mono)] tracking-widest uppercase"
        >
          <ArrowLeft size={11} />
          back to site
        </Link>

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
