import {
  about,
  certifications,
  contact,
  ctfs,
  experience,
  hero,
  projects,
  skills,
  stats,
} from '@/data/portfolio';

const LINE_WIDTH = 72;

function wrapParagraph(text: string, width = LINE_WIDTH): string[] {
  const t = text.trim();
  if (!t) return [];
  const words = t.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length <= width) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = word;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

export function getSectionTerminalLines(cmd: string): string[] | null {
  switch (cmd) {
    case 'home':
      return linesHome();
    case 'about':
      return linesAbout();
    case 'skills':
      return linesSkills();
    case 'projects':
      return linesProjects();
    case 'experience':
      return linesExperience();
    case 'ctf':
      return linesCtf();
    case 'certs':
    case 'certifications':
      return linesCerts();
    case 'logbook':
      return linesLogbook();
    case 'contact':
      return linesContact();
    default:
      return null;
  }
}

function linesHome(): string[] {
  const out: string[] = [
    '$ cat ./sections/home.summary',
    '',
    hero.name,
    hero.title,
    '',
    ...wrapParagraph(hero.description),
    '',
    '— focus —',
    ...hero.focusAreas.map((a) => `  · ${a}`),
    '',
    '— quick stats —',
    ...stats.map((s) => {
      const hint = s.hint ? `  (${s.hint})` : '';
      return `  ${s.label}: ${s.value}${hint}`;
    }),
  ];
  return out;
}

function linesAbout(): string[] {
  const out: string[] = [
    '$ cat ./sections/about.bio',
    '',
    ...wrapParagraph(about.bio),
    '',
    '— education —',
    `  ${about.education.degree}`,
    `  ${about.education.institution}`,
    `  ${about.education.period} · ${about.education.status}`,
    '',
    '— highlights —',
    ...about.summary.slice(0, 5).map((s) => `  · ${s}`),
  ];
  return out;
}

function linesSkills(): string[] {
  const out: string[] = ['$ skills --list --grouped', ''];
  for (const [cat, items] of Object.entries(skills.categories)) {
    const names = items.join(', ');
    out.push(`[${cat}]`);
    out.push(...wrapParagraph(names, 70).map((l) => `  ${l}`));
    out.push('');
  }
  return out;
}

function linesProjects(): string[] {
  const maxList = 10;
  const list = projects.slice(0, maxList);
  const lines: string[] = [`$ ls ./projects | head -n ${maxList}`, ''];
  for (const p of list) {
    lines.push(`  • ${p.name}`);
    lines.push(`    ${truncate(p.description, 68)}`);
  }
  if (projects.length > maxList) {
    lines.push('');
    lines.push(`  … and ${projects.length - maxList} more in the grid below`);
  }
  return lines;
}

function linesExperience(): string[] {
  const out: string[] = ['$ experience --timeline', ''];
  for (const exp of experience) {
    out.push(`▸ ${exp.role} @ ${exp.company}`);
    out.push(`  ${exp.period}`);
    const blurb = exp.description[0] ?? '';
    if (blurb) out.push(...wrapParagraph(blurb, 66).map((l) => `  ${l}`));
    out.push('');
  }
  return out;
}

function linesCtf(): string[] {
  const out: string[] = ['$ ctf --achievements', ''];
  for (const c of ctfs) {
    out.push(`▸ ${c.name}`);
    out.push(`  ${c.platform} · ${c.year}`);
    if (c.achievements?.length) out.push(`  ${c.achievements.join(' · ')}`);
    if (c.description) out.push(...wrapParagraph(c.description, 66).map((l) => `  ${l}`));
    out.push('');
  }
  return out;
}

function linesCerts(): string[] {
  const out: string[] = ['$ certs --table', ''];
  for (const cert of certifications) {
    out.push(`▸ ${cert.name}`);
    out.push(`  ${cert.issuer} · ${cert.date}${cert.status ? ` · ${cert.status}` : ''}`);
    if (cert.description) {
      out.push(...wrapParagraph(cert.description, 66).map((l) => `  ${l}`));
    }
    out.push('');
  }
  return out;
}

function linesLogbook(): string[] {
  return [
    '$ tail ./logbook/README',
    '',
    'Logbook & writeups — blog notes and CTF walkthroughs.',
    'Cards in this section link to posts and event hubs.',
    '',
    'Scroll the logbook grid to open an article or event.',
  ];
}

function linesContact(): string[] {
  const lines: string[] = [
    '$ contact --info',
    '',
    `email: ${contact.email}`,
    '',
    'profiles:',
  ];
  for (const [k, url] of Object.entries(contact.social)) {
    lines.push(`  ${k.padEnd(12)} ${url}`);
  }
  return lines;
}
