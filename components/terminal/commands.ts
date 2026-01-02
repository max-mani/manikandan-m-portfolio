import { ViewType } from '@/context/UIContext';

export interface Command {
  name: string;
  description: string;
  usage?: string;
  handler: (args: string[], setView: (view: ViewType, projectId?: string) => void, clearTerminal?: () => void) => string | null;
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Show list of available commands',
    handler: () => {
      return `Available commands:

  about                Show profile summary
  projects             List all projects
  skills               Show technical skills
  experience           View work & leadership experience
  ctfs                 Show CTF achievements
  certifications       List certifications
  contact              Open contact information
  clear                Reset view
  help                 Show this help message

Tips:
  • Use Tab for autocomplete
  • Commands are case-sensitive
  • Example: project kmrl`;
    },
  },
  {
    name: 'about',
    description: 'Display about information',
    handler: (args, setView) => {
      setView('about');
      return null;
    },
  },
  {
    name: 'projects',
    description: 'List all projects',
    handler: (args, setView) => {
      setView('projects');
      return null;
    },
  },
  {
    name: 'project',
    description: 'Show details for a specific project',
    usage: 'project <name>',
    handler: (args, setView) => {
      if (args.length === 0) {
        return 'Error: Project name required. Usage: project <name>';
      }
      const projectId = args[0].toLowerCase();
      setView('project', projectId);
      return null;
    },
  },
  {
    name: 'skills',
    description: 'Display skills dashboard',
    handler: (args, setView) => {
      setView('skills');
      return null;
    },
  },
  {
    name: 'experience',
    description: 'Show work experience timeline',
    handler: (args, setView) => {
      setView('experience');
      return null;
    },
  },
  {
    name: 'ctfs',
    description: 'Display CTF achievements',
    handler: (args, setView) => {
      setView('ctfs');
      return null;
    },
  },
  {
    name: 'certifications',
    description: 'Show certifications',
    handler: (args, setView) => {
      setView('certifications');
      return null;
    },
  },
  {
    name: 'contact',
    description: 'Open contact information',
    handler: (args, setView) => {
      setView('contact');
      return null;
    },
  },
  {
    name: 'clear',
    description: 'Reset to landing view and clear terminal',
    handler: (args, setView, clearTerminal) => {
      setView('landing');
      if (clearTerminal) {
        clearTerminal();
      }
      return null;
    },
  },
];

export function findCommand(name: string): Command | undefined {
  return commands.find(cmd => cmd.name === name.toLowerCase());
}

export function getAutocompleteSuggestions(input: string): string[] {
  const lowerInput = input.toLowerCase();
  return commands
    .filter(cmd => cmd.name.startsWith(lowerInput))
    .map(cmd => cmd.name);
}

export function parseCommand(input: string): { command: string; args: string[] } {
  const parts = input.trim().split(/\s+/);
  return {
    command: parts[0] || '',
    args: parts.slice(1),
  };
}

