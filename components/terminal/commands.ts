import { ViewType } from '@/context/UIContext';
import {
  buildAboutText,
  buildProjectsList,
  buildProjectDetails,
  buildSkillsText,
  buildExperienceText,
  buildCtfsText,
  buildCertificationsText,
  buildContactBlock,
  buildWhoamiText,
  buildEducationText,
  buildBannerText,
  buildHelpText,
} from '../../data/terminalContent';

export interface Command {
  name: string;
  description: string;
  usage?: string;
  handler: (
    args: string[],
    setView: (view: ViewType, projectId?: string) => void,
    clearTerminal?: () => void,
    openMessage?: () => void
  ) => string | null;
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Show list of available commands',
    handler: () => buildHelpText(),
  },
  {
    name: 'whoami',
    description: 'Identity & about',
    handler: () => buildWhoamiText(),
  },
  {
    name: 'about',
    description: 'Display about information',
    handler: () => buildAboutText(),
  },
  {
    name: 'projects',
    description: 'List all projects',
    handler: () => buildProjectsList(),
  },
  {
    name: 'project',
    description: 'Show details for a specific project',
    usage: 'project <name>',
    handler: (args) => {
      if (args.length === 0) {
        return 'Error: Project name required. Usage: project <name>';
      }
      const projectId = args[0].toLowerCase();
      return buildProjectDetails(projectId);
    },
  },
  {
    name: 'skills',
    description: 'Display skills dashboard',
    handler: () => buildSkillsText(),
  },
  {
    name: 'experience',
    description: 'Show work experience timeline',
    handler: () => buildExperienceText(),
  },
  {
    name: 'education',
    description: 'Academic background',
    handler: () => buildEducationText(),
  },
  {
    name: 'ctfs',
    description: 'Display CTF achievements',
    handler: () => buildCtfsText(),
  },
  {
    name: 'certifications',
    description: 'Show certifications',
    handler: () => buildCertificationsText(),
  },
  {
    name: 'contact',
    description: 'Show contact information',
    handler: () => buildContactBlock(),
  },
  {
    name: 'message',
    description: 'Open message overlay form',
    handler: (_args, _setView, _clearTerminal, openMessage) => {
      if (openMessage) {
        openMessage();
      }
      return 'Opening message form...';
    },
  },
  {
    name: 'banner',
    description: 'Show welcome banner text',
    handler: () => buildBannerText(),
  },
  {
    name: 'writeups',
    description: 'Open CTF writeups in a new tab',
    handler: () => {
      if (typeof window !== 'undefined') {
        window.open('/wirteups', '_blank');
      }
      return 'Opening writeups in new tab...';
    },
  },
  {
    name: 'blogs',
    description: 'Open blog posts in a new tab',
    handler: () => {
      if (typeof window !== 'undefined') {
        window.open('/blogs', '_blank');
      }
      return 'Opening blogs in new tab...';
    },
  },
  {
    name: 'clear',
    description: 'Reset to landing view and clear terminal',
    handler: (_args, setView, clearTerminal) => {
      setView('landing');
      if (clearTerminal) {
        clearTerminal();
      }
      return null;
    },
  },
];

export function findCommand(name: string): Command | undefined {
  return commands.find((cmd) => cmd.name === name.toLowerCase());
}

export function getAutocompleteSuggestions(input: string): string[] {
  const lowerInput = input.toLowerCase();
  return commands
    .filter((cmd) => cmd.name.startsWith(lowerInput))
    .map((cmd) => cmd.name);
}

export function parseCommand(input: string): { command: string; args: string[] } {
  const parts = input.trim().split(/\s+/);
  return {
    command: parts[0] || '',
    args: parts.slice(1),
  };
}