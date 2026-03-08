'use client';

import React, { useEffect, useState } from 'react';

interface BootOverlayProps {
  onDone: () => void;
}

interface BootLine {
  text: string;
  okColor?: boolean;
  ipColor?: boolean;
  locColor?: boolean;
}

export function BootOverlay({ onDone }: BootOverlayProps) {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const baseLines: BootLine[] = [
        { text: '> BOOTING MAXIM-PORTFOLIO TERMINAL [1984 MODE]...' },
        { text: '> Loading cyber modules...                    ', okColor: true },
        { text: '> Initializing neon grid...                   ', okColor: true },
      ];

      const dynamicLines: BootLine[] = [];
      let ip = '';
      let location = '';

      const tryFetch = async (url: string, parser: (d: Record<string, unknown>) => { ip?: string; city?: string; country?: string }) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return false;
          const data = (await res.json()) as Record<string, unknown>;
          const { ip: i, city, country } = parser(data);
          if (i) ip = i;
          if (city && country) location = `${city}, ${country}`;
          return !!(ip && location);
        } catch {
          return false;
        }
      };

      const parsed = await tryFetch('https://ipapi.co/json/', (d) => ({
        ip: d.ip as string,
        city: d.city as string,
        country: d.country_name as string,
      }));

      if (!parsed) {
        await tryFetch('https://ipinfo.io/json', (d) => ({
          ip: d.ip as string,
          city: d.city as string,
          country: d.country as string,
        }));
      }

      dynamicLines.push({
        text: `> Client IP: ${ip || 'Unknown'}`,
        ipColor: true,
      });
      dynamicLines.push({
        text: `> Client Location: ${location || 'Unknown'}`,
        locColor: true,
      });

      const tailLines: BootLine[] = [
        { text: '> Mounting /home/maxim...                     ', okColor: true },
        { text: '> Launching terminal interface...             ', okColor: true },
      ];

      const all = [...baseLines, ...dynamicLines, ...tailLines];

      for (let i = 0; i < all.length; i++) {
        if (cancelled) return;
        setLines((prev) => [...prev, all[i]]);
        await new Promise((r) => setTimeout(r, 620));
      }

      let p = 0;
      while (p < 100 && !cancelled) {
        p = Math.min(p + Math.floor(Math.random() * 4) + 1, 100);
        setPercent(p);
        await new Promise((r) => setTimeout(r, 80));
      }

      if (!cancelled) {
        setVisible(false);
        await new Promise((r) => setTimeout(r, 300));
        if (!cancelled) onDone();
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-[var(--bg)] font-[var(--font-share-tech-mono)] text-[0.85rem] text-[var(--g)] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-[560px] max-w-[92vw] space-y-1">
        {lines.map((l, idx) => (
          <div key={idx} className="overflow-hidden whitespace-nowrap">
            {l.okColor ? (
              <>
                <span>{l.text}</span>
                <span className="text-[#00ff88]">OK</span>
              </>
            ) : l.ipColor ? (
              <span className="text-[var(--c)]">{l.text}</span>
            ) : l.locColor ? (
              <span className="text-[var(--y)]">{l.text}</span>
            ) : (
              <span>{l.text}</span>
            )}
          </div>
        ))}
      </div>
      <div className="w-[560px] max-w-[92vw] mt-5">
        <div className="text-[0.7rem] text-[var(--gdim)] mb-1">
          &gt; SYSTEM INIT [{percent}%]
        </div>
        <div className="h-[5px] bg-[#001a05] border border-[var(--border)] overflow-hidden">
          <div
            className="h-full bg-[var(--g)]"
            style={{
              width: `${percent}%`,
              boxShadow: '0 0 8px var(--g)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
