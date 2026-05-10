'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Entry = {
  id: string;
  text: string;
};

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `h-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const LS_BASE = [
  'drwxr-xr-x  home/',
  'drwxr-xr-x  projects/',
  'drwxr-xr-x  writeups/',
  '-rw-r--r--  readme.txt',
  '-rw-r-----  flag.txt',
];

const LS_HIDDEN = ['-rw-------  .butterfly_1993', '-rw-------  .secrets'];

export function Terminal404() {
  const [history, setHistory] = useState<Entry[]>([
    { id: makeId(), text: "Type 'help' to begin." },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isDecrypting]);

  const pushLines = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines.map((line) => ({ id: makeId(), text: line }))]);
  };

  const commands = useMemo(
    () => ({
      ls: () => [...LS_BASE],
      'ls -a': () => [...LS_BASE, ...LS_HIDDEN],
      'ls -la': () => [...LS_BASE, ...LS_HIDDEN],
      'cat readme.txt': () => [
        '404 — you wandered off the map.',
        'Nothing here but flies and one butterfly.',
        'Try going home: maxmani.in',
        'Or keep exploring. Your call.',
      ],
      'cat .butterfly_1993': () => [
        'Permission denied. butterfly_1993 protects its own secrets.',
        'Hint: /butterfly_1993',
      ],
      'cat .secrets': () => ['Permission denied.'],
      whoami: () => ['visitor'],
      help: () => [
        'Available commands:',
        '  ls        list directory contents',
        '  cat       read a file',
        '  whoami    display current user',
        '  clear     clear terminal',
        '  help      show this message',
        '',
        'There may be other commands. Try things.',
      ],
    }),
    [],
  );

  const execute = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    if (isDecrypting) return;

    if (input === 'clear') {
      setHistory([]);
      return;
    }

    pushLines([`$ ${input}`, '']);

    if (input === 'cat flag.txt') {
      setIsDecrypting(true);
      pushLines(['> Decrypting...']);
      window.setTimeout(() => {
        pushLines([
          '> Access granted.',
          '',
          'FLAG{y0u_pl4y3d_th3_g4m3_4nd_f0und_th3_fl4g}',
          '',
          'Congrats. Most people just hit the back button.',
          '- Maxim',
        ]);
        setIsDecrypting(false);
      }, 1500);
      return;
    }

    const handler = commands[input as keyof typeof commands];
    if (handler) {
      pushLines(handler());
      return;
    }

    pushLines([`$ ${input}: command not found`, "Try 'help' for available commands."]);
  };

  return (
    <section className="phase6-panel phase6-terminal-panel pixel-border bg-[var(--surface)] p-3 sm:p-4">
      <div className="phase6-terminal-top">
        <div>
          <p className="text-[8px] text-[var(--dim)]">[ TERMINAL ACCESS ]</p>
          <p className="mt-1 text-[8px] text-[var(--text)] sm:text-[9px]">
            Try: <button className="phase6-cmd-chip" onClick={() => execute('ls')}>ls</button>{' '}
            <button className="phase6-cmd-chip" onClick={() => execute('help')}>help</button>{' '}
            <button className="phase6-cmd-chip" onClick={() => execute('cat flag.txt')}>cat flag.txt</button>
          </p>
        </div>
        <p className="phase6-terminal-status">maxim@404-shell:~</p>
      </div>
      <div className="phase6-terminal-shell">
        <div className="phase6-terminal-output">
          {history.map((item) => (
            <p key={item.id} className="phase6-terminal-line">
              {item.text}
            </p>
          ))}
          {isDecrypting && <p className="phase6-terminal-line text-[var(--amber)]">...</p>}
          <div ref={scrollRef} />
        </div>

        <form
          className="phase6-terminal-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            const next = currentInput;
            setCurrentInput('');
            execute(next);
          }}
        >
          <span className="phase6-terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="phase6-terminal-input"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="404 terminal input"
            placeholder="help"
          />
          <span className="phase6-terminal-cursor" aria-hidden>
            _
          </span>
        </form>
      </div>
    </section>
  );
}
