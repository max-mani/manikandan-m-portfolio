'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useUI } from '@/context/UIContext';
import { findCommand, parseCommand, getAutocompleteSuggestions } from './commands';

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: number;
}

interface UseTerminalOptions {
  onOpenMessage?: () => void;
}

const BANNER_WELCOME_TEXT = [
  '',
  "  Welcome to Maxim's cyber terminal.",
  '  Type help to see available commands.',
].join('\n');

export function useTerminal(options?: UseTerminalOptions) {
  const { setView, addToHistory } = useUI();
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'banner-ascii',
      type: 'output',
      content: '',
      timestamp: Date.now(),
    },
    {
      id: 'banner',
      type: 'output',
      content: BANNER_WELCOME_TEXT,
      timestamp: Date.now(),
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearTerminal = useCallback(() => {
    setLines([
      {
        id: '1',
        type: 'output',
        content: 'Terminal cleared. Type "help" to see available commands.',
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const executeCommand = useCallback(
    (input: string) => {
      if (!input.trim()) return;

      const inputLine: TerminalLine = {
        id: Date.now().toString(),
        type: 'input',
        content: input,
        timestamp: Date.now(),
      };
      setLines(prev => [...prev, inputLine]);
      addToHistory(input);

      setHistory(prev => {
        const newHistory = [...prev, input];
        return newHistory.slice(-50);
      });
      setHistoryIndex(-1);

      const { command, args } = parseCommand(input);
      const cmd = findCommand(command);

      if (!cmd) {
        const errorLine: TerminalLine = {
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `Command not found: ${command}. Type "help" for available commands.`,
          timestamp: Date.now(),
        };
        setLines(prev => [...prev, errorLine]);
        return;
      }

      const output = cmd.handler(args, setView, clearTerminal, options?.onOpenMessage);
      if (output) {
        const outputLine: TerminalLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: output,
          timestamp: Date.now(),
        };
        setLines(prev => [...prev, outputLine]);
      }
    },
    [setView, addToHistory, clearTerminal, options?.onOpenMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        executeCommand(currentInput);
        setCurrentInput('');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0) {
          const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex >= 0) {
          const newIndex = historyIndex + 1;
          if (newIndex >= history.length) {
            setHistoryIndex(-1);
            setCurrentInput('');
          } else {
            setHistoryIndex(newIndex);
            setCurrentInput(history[newIndex]);
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const suggestions = getAutocompleteSuggestions(currentInput);
        if (suggestions.length === 1) {
          setCurrentInput(suggestions[0] + ' ');
        } else if (suggestions.length > 1) {
          const outputLine: TerminalLine = {
            id: Date.now().toString(),
            type: 'output',
            content: `Suggestions: ${suggestions.join(', ')}`,
            timestamp: Date.now(),
          };
          setLines(prev => [...prev, outputLine]);
        }
      }
    },
    [currentInput, history, historyIndex, executeCommand]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [lines]);

  return {
    lines,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    executeCommand,
    clearTerminal,
    inputRef,
  };
}


