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
  /** When set with ipColor, only this substring is strongly highlighted. */
  ipHighlight?: string;
  /** Shown in semibold after "> Client Location: " when locColor. */
  locationValue?: string;
}

const HOLD_AT_FULL_MS = 2000;
const FADE_OUT_MS = 300;

/** Dev / direct localhost: server only sees loopback — not your public address. */
function isLoopbackOrUnknown(ip: string): boolean {
  const t = ip.trim().toLowerCase();
  return (
    !t ||
    t === 'unknown' ||
    t === '127.0.0.1' ||
    t === '::1' ||
    t === '0:0:0:0:0:0:0:1' ||
    t.startsWith('127.')
  );
}

/** Browser → geo API: returns *your* public IP (works on localhost). */
async function fetchPublicGeoFromBrowser(): Promise<{ ip: string; location: string } | null> {
  const buildLoc = (city: string, region: string, country: string) => {
    const parts = [city, region, country].filter(Boolean);
    return parts.length ? parts.join(', ') : country || '';
  };

  const tryIpapi = async () => {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (!res.ok) return null;
    const d = (await res.json()) as Record<string, unknown>;
    if (d.error) return null;
    const ip = String(d.ip ?? '');
    if (!ip) return null;
    const loc = buildLoc(
      String(d.city ?? ''),
      String(d.region ?? ''),
      String(d.country_name ?? '')
    );
    return { ip, location: loc || 'Unknown' };
  };

  const tryIpinfo = async () => {
    const res = await fetch('https://ipinfo.io/json', { cache: 'no-store' });
    if (!res.ok) return null;
    const d = (await res.json()) as Record<string, unknown>;
    const ip = String(d.ip ?? '');
    if (!ip) return null;
    const loc = buildLoc(String(d.city ?? ''), String(d.region ?? ''), String(d.country ?? ''));
    return { ip, location: loc || 'Unknown' };
  };

  try {
    return (await tryIpapi()) ?? (await tryIpinfo());
  } catch {
    return null;
  }
}

export function BootOverlay({ onDone }: BootOverlayProps) {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const baseLines: BootLine[] = [
        { text: '> BOOTING MAXMANI.IN PORTFOLIO [CYBER+CODE MODE]...' },
        { text: '> Loading design tokens & neon surface...        ', okColor: true },
        { text: '> Initializing App Router & hydration...        ', okColor: true },
      ];

      const dynamicLines: BootLine[] = [];
      let ip = '';
      let location = '';

      try {
        const res = await fetch('/api/client-geo', { cache: 'no-store' });
        if (res.ok) {
          const data = (await res.json()) as { ip?: string; location?: string };
          if (data.ip) ip = data.ip;
          if (data.location) location = data.location;
        }
      } catch {
        /* offline / API unavailable */
      }

      if (isLoopbackOrUnknown(ip) || location === 'Local development') {
        const pubGeo = await fetchPublicGeoFromBrowser();
        if (pubGeo) {
          ip = pubGeo.ip;
          location = pubGeo.location;
        }
      }

      const ipDisplay = ip || 'Unknown';
      dynamicLines.push({
        text: `> Client IP: ${ipDisplay}`,
        ipColor: true,
        ipHighlight: ipDisplay,
      });
      dynamicLines.push({
        text: '> Client Location: ',
        locColor: true,
        locationValue: location || 'Unknown',
      });

      const tailLines: BootLine[] = [
        { text: '> Mounting /portfolio/home/maxim...             ', okColor: true },
        { text: '> Ready — showing main experience...            ', okColor: true },
      ];

      const all = [...baseLines, ...dynamicLines, ...tailLines];
      const total = all.length;

      for (let i = 0; i < all.length; i++) {
        if (cancelled) return;
        setLines((prev) => [...prev, all[i]]);
        setPercent(Math.round(((i + 1) / total) * 100));
        await new Promise((r) => setTimeout(r, 620));
      }

      if (cancelled) return;
      setPercent(100);
      await new Promise((r) => setTimeout(r, HOLD_AT_FULL_MS));

      if (!cancelled) {
        setVisible(false);
        await new Promise((r) => setTimeout(r, FADE_OUT_MS));
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
      className={`fixed inset-0 z-[5000] flex flex-col items-center justify-center font-[family-name:var(--font-share-tech-mono)] text-[0.85rem] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bg-[#05060a] text-[#00e5ff]`}
    >
      <div className="w-[560px] max-w-[92vw] space-y-1">
        {lines.map((l, idx) => (
          <div key={idx} className="overflow-hidden whitespace-nowrap">
            {l.okColor ? (
              <>
                <span>{l.text}</span>
                <span className="text-emerald-400">OK</span>
              </>
            ) : l.ipColor && l.ipHighlight ? (
              <span>
                <span className="font-medium text-cyan-200/80">{'> Client IP: '}</span>
                <span className="font-bold text-fuchsia-300 tabular-nums [text-shadow:0_0_14px_rgba(232,121,249,0.85),0_0_28px_rgba(0,229,255,0.35)]">
                  {l.ipHighlight}
                </span>
              </span>
            ) : l.ipColor ? (
              <span className="text-cyan-300">{l.text}</span>
            ) : l.locColor ? (
              <span>
                <span className="text-cyan-200/80 font-medium">{l.text}</span>
                <span className="font-semibold text-amber-300">
                  {l.locationValue ?? 'Unknown'}
                </span>
              </span>
            ) : (
              <span>{l.text}</span>
            )}
          </div>
        ))}
      </div>
      <div className="w-[560px] max-w-[92vw] mt-5">
        <div className="text-[0.7rem] mb-1 text-white/55">
          &gt; SYSTEM INIT [{percent}%]
        </div>
        <div className="h-[5px] overflow-hidden border bg-[#0b0d18] border-cyan-500/35">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
            style={{
              width: `${percent}%`,
              boxShadow: '0 0 12px rgba(0,229,255,0.55)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
