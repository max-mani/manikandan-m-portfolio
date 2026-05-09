'use client';

import React, { useEffect, useState } from 'react';

export interface BootOverlayProps {
  onDone: () => void;
}

/** Single boot log row — kept minimal for rendering variants without changing outer styles. */
type BootRow =
  | { kind: 'kernel_head' }
  | { kind: 'blank' }
  | { kind: 'client_ip'; ip: string }
  | { kind: 'client_loc'; location: string }
  | {
      kind: 'stamp_ok';
      stamp: string;
      before: string;
      highlight?: string;
      after: string;
    }
  | { kind: 'warn'; stamp?: string; text: string }
  | { kind: 'warn_sleep'; hhmm: string }
  | { kind: 'spawn'; exe: string }
  | {
      kind: 'ssh';
      stamp: string;
      userLabel: string;
      user: string;
      hostLabel: string;
      host: string;
    }
  | { kind: 'stamp_plain'; stamp: string; before: string; highlight?: string; after: string }
  | { kind: 'title'; text: string }
  | { kind: 'boot_done' };

const HOLD_BEFORE_FADE_MS = 800;
const FADE_OUT_MS = 400;
const VISITED_KEY = 'visited';

const glowGreen = '[text-shadow:0_0_10px_rgba(0,255,65,0.55)]';
const glowCyan = '[text-shadow:0_0_8px_rgba(0,229,255,0.45)]';
const glowAmber = '[text-shadow:0_0_8px_rgba(255,179,0,0.45)]';

/** With `[  X.XXXs]` (10 chars) + leading space before "Spawning", continuation lines indent so each `>` lines up vertically. */
const SPAWN_LINE_INDENT_CH = 11;

/** Widest exe is `butterfly_1993.exe` — pad so dots + ACTIVE share one visual column across rows. */
const SPAWN_EXE_FIELD_CH = 19;

/** One run of fillers between exe column and status (matches legacy boot formatting). */
const SPAWN_DOT_RUN = ' ........................ ';

/** Readable pace: ~320–499ms per line with light jitter. */
function nextLineDelayMs(): number {
  return 320 + Math.floor(Math.random() * 180);
}

function buildRows(opts: {
  isReturningVisitor: boolean;
  hour: number;
  hhmm: string;
  clientIp: string;
  clientLocation: string;
}): BootRow[] {
  const { isReturningVisitor, hour, hhmm, clientIp, clientLocation } = opts;

  const main: BootRow[] = [
    { kind: 'kernel_head' },
    { kind: 'blank' },
    { kind: 'client_ip', ip: clientIp },
    { kind: 'client_loc', location: clientLocation },
    { kind: 'blank' },
    {
      kind: 'stamp_ok',
      stamp: '[  0.001s]',
      before: ' CPU: ',
      highlight: 'MAXIM-CORE @ 3.14 GHz',
      after: ' .......... ',
    },
    {
      kind: 'stamp_ok',
      stamp: '[  0.042s]',
      before: ' RAM: Loading ',
      highlight: '10+ projects',
      after: ' ........... ',
    },
    {
      kind: 'stamp_ok',
      stamp: '[  0.089s]',
      before: ' ROM: ',
      highlight: 'CTF wins',
      after: ' burned in ............. ',
    },
    {
      kind: 'stamp_ok',
      stamp: '[  0.134s]',
      before: ' Mounting ',
      highlight: '/home/maxim/',
      after: ' ............... ',
    },
    {
      kind: 'stamp_ok',
      stamp: '[  0.201s]',
      before: ' Loading ',
      highlight: 'exploit modules',
      after: ' ............. ',
    },
    {
      kind: 'stamp_ok',
      stamp: '[  0.267s]',
      before: ' Checking integrity of ',
      highlight: 'soul',
      after: ' .......... ',
    },
    {
      kind: 'stamp_ok',
      stamp: '[  0.312s]',
      before: ' Starting ',
      highlight: 'portfolio.service',
      after: ' .......... ',
    },
    {
      kind: 'stamp_ok',
      stamp: '[  0.398s]',
      before: ' Initializing ',
      highlight: 'chaos engine',
      after: ' ........... ',
    },
    {
      kind: 'stamp_plain',
      stamp: '[  0.445s]',
      before: ' Spawning bugs ',
      after: '...',
    },
    { kind: 'spawn', exe: 'fly_01.exe' },
    { kind: 'spawn', exe: 'fly_02.exe' },
    {
      kind: 'spawn',
      exe: 'butterfly_1993.exe',
    },
    {
      kind: 'warn',
      stamp: '[  0.501s]',
      text: 'Warning: Text corruption inevitable',
    },
    {
      kind: 'warn',
      stamp: '[  0.502s]',
      text: 'Warning: butterfly_1993 will handle it',
    },
    {
      kind: 'stamp_plain',
      stamp: '[  0.599s]',
      before: ' ',
      highlight: 'SSH',
      after: ': Connection established',
    },
    {
      kind: 'ssh',
      stamp: '[  0.601s]',
      userLabel: 'USER:',
      user: 'maxim',
      hostLabel: 'HOST:',
      host: 'maxmani.in',
    },
  ];

  const conditional: BootRow[] = [];

  if (isReturningVisitor) {
    conditional.push({ kind: 'blank' });
    conditional.push({
      kind: 'title',
      text: '> Returning user detected.',
    });
    conditional.push({
      kind: 'title',
      text: '> butterfly_1993 remembers you.',
    });
  }

  if (hour >= 23 || hour < 5) {
    conditional.push({ kind: 'blank' });
    conditional.push({ kind: 'warn_sleep', hhmm });
    conditional.push({
      kind: 'title',
      text: '> Running portfolio anyway. Respect.',
    });
  }

  if (hour >= 9 && hour < 17) {
    conditional.push({ kind: 'blank' });
    conditional.push({
      kind: 'title',
      text: '> Detecting: work hours.',
    });
    conditional.push({
      kind: 'title',
      text: '> Go touch some grass after this.',
    });
  }

  const footer: BootRow[] = [{ kind: 'blank' }, { kind: 'boot_done' }];

  return [...main, ...conditional, ...footer];
}

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

function BootRowLine({
  row,
  isLast,
}: {
  row: BootRow;
  isLast: boolean;
}) {
  const cursor = isLast ? (
    <span className="animate-blink" aria-hidden>
      _
    </span>
  ) : null;

  switch (row.kind) {
    case 'kernel_head':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className={`font-bold text-[#00ff41] ${glowGreen}`}>MAXIM_OS v2.6.0</span>
          <span className={`text-[#00ff41] ${glowGreen}`}> — KERNEL BOOT</span>
          {cursor}
        </div>
      );
    case 'blank':
      return <div className="min-h-[0.6em]" />;
    case 'boot_done':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className={`font-bold text-[#00ff41] ${glowGreen}`}>BOOT COMPLETE.</span>
          <span className="text-[#4caf50]"> Welcome to my world.</span>
          {cursor}
        </div>
      );
    case 'title':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className={`text-[#00ff41] ${glowGreen}`}>{row.text}</span>
          {cursor}
        </div>
      );
    case 'client_ip':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className="font-medium text-[#4caf50]">{'> Client IP: '}</span>
          <span className={`font-bold text-[#00e5ff] tabular-nums ${glowCyan}`}>{row.ip}</span>
          {cursor}
        </div>
      );
    case 'client_loc':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className="font-medium text-[#4caf50]">{'> Client Location: '}</span>
          <span className={`font-semibold text-[#ffb300] ${glowAmber}`}>{row.location}</span>
          {cursor}
        </div>
      );
    case 'warn':
      return (
        <div className="whitespace-pre-wrap break-words">
          {row.stamp ? (
            <>
              <span className="tabular-nums text-[#4caf50]">{row.stamp}</span>
              <span className={`font-semibold text-[#ffb300] ${glowAmber}`}>{` ${row.text}`}</span>
            </>
          ) : (
            <span className={`font-semibold text-[#ffb300] ${glowAmber}`}>{row.text}</span>
          )}
          {cursor}
        </div>
      );
    case 'warn_sleep':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className={`font-semibold text-[#ffb300] ${glowAmber}`}>&gt; Warning: It is </span>
          <span className={`font-bold tabular-nums text-[#00ff41] ${glowGreen}`}>{row.hhmm}</span>
          <span className={`font-semibold text-[#ffb300] ${glowAmber}`}>. You should sleep.</span>
          {cursor}
        </div>
      );
    case 'stamp_ok':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className="tabular-nums text-[#4caf50]">{row.stamp}</span>
          <span className="text-[#4caf50]">{row.before}</span>
          {row.highlight ? (
            <span className={`font-bold text-[#00ff41] ${glowGreen}`}>{row.highlight}</span>
          ) : null}
          <span className="text-[#4caf50]">{row.after}</span>
          <span className={`font-bold text-[#00ff41] ${glowGreen}`}>OK</span>
          {cursor}
        </div>
      );
    case 'stamp_plain':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className="tabular-nums text-[#4caf50]">{row.stamp}</span>
          <span className="text-[#4caf50]">{row.before}</span>
          {row.highlight ? (
            <span className={`font-bold text-[#00ff41] ${glowGreen}`}>{row.highlight}</span>
          ) : null}
          <span className="text-[#4caf50]">{row.after}</span>
          {cursor}
        </div>
      );
    case 'spawn': {
      const paddedExe = row.exe.padEnd(SPAWN_EXE_FIELD_CH, ' ');
      return (
        <div
          className="whitespace-pre break-words"
          style={{ paddingLeft: `${SPAWN_LINE_INDENT_CH}ch` }}
        >
          <span className="text-[#4caf50]">{'> '}</span>
          <span className={`font-bold whitespace-pre text-[#00ff41] ${glowGreen}`}>{paddedExe}</span>
          <span className="text-[#4caf50]">{SPAWN_DOT_RUN}</span>
          <span className={`font-bold text-[#00ff41] ${glowGreen}`}>ACTIVE</span>
          {cursor}
        </div>
      );
    }
    case 'ssh':
      return (
        <div className="whitespace-pre-wrap break-words">
          <span className="tabular-nums text-[#4caf50]">{row.stamp}</span>
          <span>{' '}</span>
          <span className="text-[#4caf50]">{row.userLabel} </span>
          <span className={`font-bold text-[#00e5ff] tabular-nums ${glowCyan}`}>{row.user}</span>
          <span className="text-[#4caf50]">{' | '}</span>
          <span className="text-[#4caf50]">{row.hostLabel} </span>
          <span className={`font-bold text-[#00e5ff] tabular-nums ${glowCyan}`}>{row.host}</span>
          {cursor}
        </div>
      );
    default:
      return null;
  }
}

export function BootOverlay({ onDone }: BootOverlayProps) {
  const [rows, setRows] = useState<BootRow[]>([]);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const now = new Date();
      const hour = now.getHours();
      const hh = String(hour).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const hhmm = `${hh}:${mm}`;
      const isReturningVisitor =
        typeof window !== 'undefined' && localStorage.getItem(VISITED_KEY) !== null;

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

      const clientIp = ip || 'Unknown';
      const clientLocation = location || 'Unknown';

      const sequence = buildRows({
        isReturningVisitor,
        hour,
        hhmm,
        clientIp,
        clientLocation,
      });
      const total = sequence.length;

      for (let i = 0; i < total; i++) {
        if (cancelled) return;
        setRows((prev) => [...prev, sequence[i]]);
        setPercent(Math.round(((i + 1) / total) * 100));
        await new Promise((r) => setTimeout(r, nextLineDelayMs()));
      }

      if (cancelled) return;
      setPercent(100);

      if (typeof window !== 'undefined') {
        localStorage.setItem(VISITED_KEY, String(Date.now()));
      }

      await new Promise((r) => setTimeout(r, HOLD_BEFORE_FADE_MS));

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
      className={`fixed inset-0 z-[10050] flex flex-col text-[clamp(10px,2.35vw,14px)] leading-[2em] transition-opacity bg-black text-[#00ff41] box-border p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:p-6 md:p-8 lg:p-10 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transitionDuration: `${visible ? 120 : FADE_OUT_MS}ms`, fontFamily: 'inherit' }}
    >
      <div className="flex flex-1 min-h-0 w-full max-w-[min(94vw,56rem)] mx-auto flex-col justify-center gap-4 sm:gap-5">
        {/* Brief wants scroll-to-bottom; bottom-anchored clip = latest lines visible, no scrollbar. */}
        <div className="relative w-full min-h-[min(42vh,22rem)] h-[min(68vh,38rem)] sm:min-h-[min(48vh,26rem)] sm:h-[min(72vh,42rem)] max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-10rem)] overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end gap-1 md:gap-1.5 text-left">
            {rows.map((row, idx) => (
              <BootRowLine key={idx} row={row} isLast={idx === rows.length - 1} />
            ))}
          </div>
        </div>
        <div className="w-full shrink-0">
          <div className="mb-1 text-[#4caf50]">&gt; SYSTEM INIT [{percent}%]</div>
          <div className="h-[clamp(12px,3.2vw,18px)] overflow-hidden border-2 border-[#00ff41] bg-[#0a140a]">
            <div
              className="h-full bg-[#00ff41] transition-[width] duration-[180ms] [transition-timing-function:steps(4)]"
              style={{
                width: `${percent}%`,
                boxShadow: '0 0 10px rgba(0,255,65,0.55)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
