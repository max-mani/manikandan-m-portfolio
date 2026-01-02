'use client';

import { UIProvider } from '@/context/UIContext';
import { TopPanel } from '@/components/layout/TopPanel';
import { BottomTerminal } from '@/components/layout/BottomTerminal';

export default function Home() {
  return (
    <UIProvider>
      <div className="flex flex-col h-screen bg-black overflow-hidden relative">
        <TopPanel />
        <BottomTerminal />
      </div>
    </UIProvider>
  );
}
