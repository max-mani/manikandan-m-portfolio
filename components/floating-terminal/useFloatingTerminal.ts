'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { contact } from '@/data/portfolio';
import { getSectionTerminalLines } from './sectionTerminalOutput';

export type TerminalLineType = 'input' | 'output' | 'system';

export interface TerminalLine {
  id: string;
  type: TerminalLineType;
  text: string;
}

let lineId = 0;
const nextId = () => `tl-${++lineId}`;

function scrollToSection(id: string) {
  if (typeof document === 'undefined') return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const INTRO =
  "Floating TTY · type 'help' for navigation. Sections: home, about, skills, projects, experience, ctf, certs, logbook, contact.";

/** Delay between streamed output lines (~readable pace). */
const TYPED_LINE_MS = 160;

export function useFloatingTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([{ id: nextId(), type: 'system', text: INTRO }]);
  const typingTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cancelTyping = useCallback(() => {
    typingTimersRef.current.forEach(clearTimeout);
    typingTimersRef.current = [];
  }, []);

  useEffect(() => () => cancelTyping(), [cancelTyping]);

  const clear = useCallback(() => {
    cancelTyping();
    setLines([{ id: nextId(), type: 'system', text: INTRO }]);
  }, [cancelTyping]);

  const appendOutput = useCallback((text: string) => {
    setLines((prev) => [...prev, { id: nextId(), type: 'output', text }]);
  }, []);

  const appendInput = useCallback((text: string) => {
    setLines((prev) => [...prev, { id: nextId(), type: 'input', text: `maxim@portfolio:~$ ${text}` }]);
  }, []);

  /** Simulates a slow console print, one line at a time. */
  const appendTypedOutput = useCallback(
    (outLines: string[], lineDelayMs = TYPED_LINE_MS) => {
      cancelTyping();
      outLines.forEach((text, i) => {
        const t = setTimeout(() => {
          setLines((prev) => [...prev, { id: nextId(), type: 'output', text }]);
        }, i * lineDelayMs);
        typingTimersRef.current.push(t);
      });
    },
    [cancelTyping]
  );

  const runSection = useCallback(
    (navCmd: string) => {
      const anchor = navCmd === 'certifications' ? 'certs' : navCmd;
      scrollToSection(anchor);
      const body = getSectionTerminalLines(anchor);
      if (!body?.length) {
        appendOutput(`(no preview text for #${anchor})`);
        return;
      }
      appendTypedOutput([`$ cat ./sections/${anchor}.dump`, '[*] scrolling…', '', ...body]);
    },
    [appendTypedOutput, appendOutput]
  );

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [cmd0] = trimmed.split(/\s+/);
      const cmd = cmd0.toLowerCase();

      if (cmd === 'clear') {
        clear();
        return;
      }

      appendInput(trimmed);

      switch (cmd) {
        case 'help':
        case '?':
          appendOutput(
            [
              'Commands:',
              '  home | about | skills | projects | experience | ctf | certs | logbook | contact — scroll + stream section',
              '  email — show email address',
              '  clear — reset output',
            ].join('\n')
          );
          break;
        case 'home':
          runSection('home');
          break;
        case 'about':
          runSection('about');
          break;
        case 'skills':
          runSection('skills');
          break;
        case 'projects':
          runSection('projects');
          break;
        case 'experience':
          runSection('experience');
          break;
        case 'ctf':
          runSection('ctf');
          break;
        case 'certs':
        case 'certifications':
          runSection(cmd);
          break;
        case 'logbook':
          runSection('logbook');
          break;
        case 'contact':
          runSection('contact');
          break;
        case 'email':
          appendTypedOutput(['$ echo $MAILTO', '', contact.email], 140);
          break;
        default:
          appendOutput(`Unknown command: ${cmd}. Try 'help'.`);
      }
    },
    [appendInput, appendOutput, appendTypedOutput, clear, runSection]
  );

  return { lines, runCommand, clear };
}
