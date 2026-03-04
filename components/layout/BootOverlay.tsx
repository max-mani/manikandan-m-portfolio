'use client';

import React, { useEffect, useState } from 'react';

interface BootOverlayProps {
  onDone: () => void;
}

export function BootOverlay({ onDone }: BootOverlayProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const baseLines = [
        '> BOOTING MAXIM-PORTFOLIO TERMINAL [1984 MODE]...',
        '> Loading cyber modules...                         OK',
        '> Initializing neon grid...                        OK',
      ];

      const dynamicLines: string[] = [];
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          dynamicLines.push(`> Client IP: ${data.ip}`);
          dynamicLines.push(`> Client Location: ${data.city}, ${data.country_name}`);
        }
      } catch {
        // ignore
      }

      const tailLines = [
        '> Mounting /home/maxim...                          OK',
        '> Launching terminal interface...                  OK',
      ];

      const all = [...baseLines, ...dynamicLines, ...tailLines];

      for (let i = 0; i < all.length; i++) {
        if (cancelled) return;
        setLines(prev => [...prev, all[i]]);
        await new Promise(r => setTimeout(r, 550));
      }

      // simple progress to 100%
      let p = 0;
      while (p < 100 && !cancelled) {
        p = Math.min(p + Math.floor(Math.random() * 4) + 2, 100);
        setPercent(p);
        await new Promise(r => setTimeout(r, 70));
      }

      if (!cancelled) {
        setTimeout(onDone, 400);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#020d04] text-[#00ff41] font-mono text-xs md:text-sm">
      <div className="w-[560px] max-w-[92vw] space-y-1">
        {lines.map((l, idx) => {
          const isIp = l.includes('Client IP:');
          const isLoc = l.includes('Client Location:');
          const cls = isIp || isLoc ? 'text-[#00e5ff]' : '';
          return (
            <div key={idx} className="overflow-hidden whitespace-nowrap">
              <span className={cls}>{l}</span>
            </div>
          );
        })}
      </div>
      <div className="w-[560px] max-w-[92vw] mt-5">
        <div className="text-[0.7rem] text-[#00aa2a] mb-1">
          &gt; SYSTEM INIT [{percent}%]
        </div>
        <div className="h-[5px] bg-[#001a05] border border-[#00ff4130] overflow-hidden">
          <div
            className="h-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

