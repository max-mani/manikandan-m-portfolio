'use client';

import React, { useEffect, useState } from 'react';

function formatTime(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function TitleBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="sticky top-0 z-[100] w-full flex items-center gap-[10px] px-[14px] py-[5px] bg-[#001a05] border-b border-[var(--border)]"
      style={{ fontFamily: 'var(--font-share-tech-mono)' }}
    >
      <div className="flex items-center gap-[6px]">
        <span
          className="w-[11px] h-[11px] rounded-full bg-[var(--r)]"
          style={{ boxShadow: '0 0 5px var(--r)' }}
        />
        <span
          className="w-[11px] h-[11px] rounded-full bg-[var(--y)]"
          style={{ boxShadow: '0 0 5px var(--y)' }}
        />
        <span
          className="w-[11px] h-[11px] rounded-full bg-[var(--g)]"
          style={{ boxShadow: '0 0 5px var(--g)' }}
        />
      </div>
      <div
        className="flex-1 text-center text-[var(--gdim)] font-[var(--font-vt323)] text-[0.72rem] md:text-[0.85rem] tracking-[0.25em] md:tracking-[0.3em] uppercase"
        style={{ minWidth: 0 }}
      >
        maxim@portfolio ~ bash — CYBER TERMINAL 1984
      </div>
      <div
        className="text-[0.7rem] text-[var(--gdim)] min-w-[60px] text-right font-[var(--font-share-tech-mono)]"
      >
        {time || '--:--:--'}
      </div>
    </div>
  );
}
