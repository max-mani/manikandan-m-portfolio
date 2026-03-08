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
    <div className="flex flex-col w-full md:w-[30%] md:h-full bg-black/95 px-3 py-4 gap-4">
      <div className="flex-1 min-h-[120px] max-h-[35vh] md:max-h-none overflow-hidden rounded-lg border border-green-800/40 bg-black/80 p-2 md:p-3">
        <div className="h-full w-full overflow-y-auto overflow-x-hidden md:overflow-auto">
          <div className="flex flex-col items-center">
            <pre className="text-[3px] sm:text-[4px] leading-[4px] text-green-400 whitespace-pre mx-auto text-center">
              {display}
            </pre>
            <img
              src="/images/ascii-name.png"
              alt="Manikandan M"
              className="mt-2 w-full max-w-[280px] h-auto block self-start"
              width={560}
              height={112}
            />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <ContactButton />
        <MessageButton />
      </div>
    </div>
  );
}

