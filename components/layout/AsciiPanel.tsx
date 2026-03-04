'use client';

import React, { useEffect, useState } from 'react';
import { ASCII_FACE } from '@/data/asciiArt';
import { ContactButton } from './ContactButton';
import { MessageButton } from './MessageButton';

export function AsciiPanel() {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let index = 0;
    let cancelled = false;

    const interval = setInterval(() => {
      if (cancelled) return;
      index += 6; // faster typing effect
      if (index >= ASCII_FACE.length) {
        index = ASCII_FACE.length;
        clearInterval(interval);
      }
      setDisplay(ASCII_FACE.slice(0, index));
    }, 3);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hidden md:flex md:w-[30%] h-full bg-black/95 flex-col px-3 py-4 gap-4">
      <div className="flex-1 overflow-hidden rounded-lg border border-green-800/40 bg-black/80 p-2">
        <pre className="text-[5px] leading-[5px] text-green-400 whitespace-pre overflow-hidden">
          {display}
        </pre>
      </div>
      <div className="space-y-3">
        <ContactButton />
        <MessageButton />
      </div>
    </div>
  );
}

