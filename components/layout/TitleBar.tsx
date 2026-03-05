'use client';

import React, { useEffect, useState } from 'react';

function formatTime(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function TitleBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Ensure consistent initial render between server and client
    setTime(formatTime(new Date()));

    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#001a05] border-b border-[var(--border)] px-[14px] py-[5px] flex items-center justify-between gap-[10px] flex-shrink-0">
      <div className="flex items-center gap-[6px]">
        <span className="w-[11px] h-[11px] rounded-full bg-[var(--r)] shadow-[0_0_5px_var(--r)]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[var(--y)] shadow-[0_0_5px_var(--y)]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[var(--g)] shadow-[0_0_5px_var(--g)]" />
      </div>
      <div className="flex-1 min-w-0 text-center text-[0.72rem] tracking-[0.25em] lg:tracking-[0.3em] text-[var(--gdim)] font-[var(--font-vt323)] uppercase">
        maxim@portfolio ~ bash — CYBER TERMINAL 1984
      </div>
      <div className="text-[0.7rem] text-[var(--gdim)] min-w-[60px] text-right">
        {time || '--:--:--'}
      </div>
    </div>
  );
}

