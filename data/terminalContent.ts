import {
  hero,
  about,
  projects,
  skills,
  experience,
  ctfs,
  certifications,
  contact,
} from '@/data/portfolio';

function wrapText(text: string, width = 88): string {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > width) {
      lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines.join('\n');
}

function skillBar(pct: number): string {
  const filled = Math.round((pct / 100) * 10);
  const empty = 10 - filled;
  return '[' + '#'.repeat(filled) + '-'.repeat(empty) + ']';
}

export function buildAboutText(): string {
  const lines: string[] = [];
  lines.push(`== ABOUT ${hero.name} ==`);
  lines.push('');
  lines.push(wrapText(about.bio));
  lines.push('');
  lines.push('Education:');
  lines.push(
    `  ${about.education.degree} – ${about.education.institution} (${about.education.period}, ${about.education.status})`
  );
  lines.push('');
  lines.push('Focus areas:');
  for (const area of hero.focusAreas) {
    lines.push(`  • ${area}`);
  }
  lines.push('');
  lines.push('Highlights:');
  for (const item of about.summary) {
    lines.push(`  • ${item}`);
  }
  return lines.join('\n');
}

export function buildProjectsList(): string {
  const lines: string[] = [];
  lines.push('== PROJECTS ==');
  lines.push('');
  projects.forEach((project, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const shortDesc = project.description.length > 60
      ? project.description.slice(0, 57) + '...'
      : project.description;
    const stack = project.technologies?.slice(0, 4).join(' · ') || '';
    lines.push(`[${num}] ${project.name}`);
    lines.push(`     ${shortDesc}`);
    lines.push(`     Stack: ${stack}`);
    lines.push('');
  });
  return lines.join('\n');
}

export function buildWhoamiText(): string {
  const focus = hero.focusAreas.slice(0, 2).join(', ');
  const bioLines = wrapText(hero.description, 42).split('\n');
  return [
    'Name      : Manikandan (alias: Maxim)',
    'Role      : Full Stack Developer',
    'Location  : Chennai, Tamil Nadu, India',
    `Focus     : ${focus}`,
    '',
    ...bioLines,
  ].join('\n');
}

export function buildEducationText(): string {
  const edu = about.education;
  const coursework = 'Data Structures, DBMS, Web Technologies, OS, Computer Networks';
  return [
    edu.degree,
    edu.institution,
    `Tamil Nadu, India  |  ${edu.period}`,
    '',
    `Coursework: ${coursework}`,
  ].join('\n');
}

export function buildBannerText(): string {
  return "Welcome to Maxim's cyber terminal. Type \"help\" to see available commands.";
}

export function buildProjectDetails(id: string): string {
  const project = projects.find((p) => p.id.toLowerCase() === id.toLowerCase());
  if (!project) {
    return `Project not found: ${id}. Type "projects" to see available IDs.`;
  }
  const lines: string[] = [];
  lines.push(`+--[ PROJECT: ${project.name} ]--+`);
  lines.push(`|`);
  lines.push(`|  ${project.description}`);
  if (project.technologies?.length) {
    lines.push(`|`);
    lines.push(`|  Tech: ${project.technologies.join(', ')}`);
  }
  if (project.keyFeatures?.length) {
    lines.push(`|`);
    lines.push('|  Key features:');
    for (const feat of project.keyFeatures) {
      lines.push(`|    • ${feat}`);
    }
  }
  if (project.github || project.live) {
    lines.push(`|`);
    if (project.github) lines.push(`|  GitHub: ${project.github}`);
    if (project.live) lines.push(`|  Live:   ${project.live}`);
  }
  lines.push('+---------------------------+');
  return lines.join('\n');
}

export function buildSkillsText(): string {
  const lines: string[] = [];
  const categoryOrder = [
    'Programming Languages',
    'Web & Mobile Development',
    'AI / Machine Learning',
    'Cybersecurity',
    'Tools & Platforms',
  ];

  for (const cat of categoryOrder) {
    const items = skills.categories[cat];
    if (!items?.length) continue;

    lines.push(`-- ${cat} --`);
    for (const item of items) {
      const pct = item.percentage ?? 70;
      const bar = skillBar(pct);
      const name = item.name.padEnd(28);
      lines.push(`${name} ${bar}  ${pct}%`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function buildExperienceText(): string {
  const lines: string[] = [];
  for (const exp of experience) {
    lines.push(`${exp.role}`);
    lines.push(`${exp.company} · Chennai  |  ${exp.period}`);
    for (const d of exp.description.slice(0, 3)) {
      lines.push(`- ${d.slice(0, 80)}${d.length > 80 ? '...' : ''}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function buildContactBlock(): string {
  const lines: string[] = [];
  lines.push(`Email    : ${contact.email}`);
  if (contact.social.github) {
    lines.push(`GitHub   : ${contact.social.github.replace(/^https?:\/\//, '')}`);
  }
  if (contact.social.linkedin) {
    lines.push(`LinkedIn : ${contact.social.linkedin.replace(/^https?:\/\//, '')}`);
  }
  if (contact.social.portfolio) {
    lines.push(`Website  : ${contact.social.portfolio.replace(/^https?:\/\//, '').replace(/\/$/, '')}`);
  }
  lines.push('Location : Chennai, Tamil Nadu, India');
  lines.push('');
  lines.push('Open to: full-time · freelance · open source');
  lines.push('Or type "message" to send a direct message.');
  return lines.join('\n');
}

export function buildCtfsText(): string {
  const lines: string[] = [];
  lines.push('== CTF ACHIEVEMENTS ==');
  lines.push('');
  for (const c of ctfs) {
    lines.push(`${c.name} – ${c.platform} (${c.year})${c.ranking ? ` [${c.ranking}]` : ''}`);
    if (c.description) {
      lines.push(`  ${wrapText(c.description)}`);
    }
    if (c.achievements?.length) {
      for (const a of c.achievements) {
        lines.push(`  • ${a}`);
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function buildCertificationsText(): string {
  const lines: string[] = [];
  lines.push('== CERTIFICATIONS ==');
  lines.push('');
  for (const cert of certifications) {
    lines.push(`${cert.name} – ${cert.issuer} (${cert.date})`);
    if (cert.level || cert.status) {
      const meta = [cert.level, cert.status].filter(Boolean).join(' | ');
      if (meta) lines.push(`  ${meta}`);
    }
    if (cert.description) {
      lines.push(`  ${wrapText(cert.description)}`);
    }
    if (cert.link) {
      lines.push(`  Link: ${cert.link}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function buildHelpText(): string {
  return [
    '+----------------------------------------------+',
    '|      MAXIM-TERMINAL :: COMMAND REFERENCE     |',
    '+----------------------------------------------+',
    '  whoami     ->  Identity & about me',
    '  skills     ->  Tech stack & proficiency',
    '  projects   ->  Project showcase',
    '  education  ->  Academic background',
    '  experience ->  Work history',
    '  contact    ->  Links & social media',
    '  writeups   ->  Open CTF writeups in new tab',
    '  blogs      ->  Open blog posts in new tab',
    '  message    ->  Open message form overlay',
    '  clear      ->  Clear terminal output',
    '  banner     ->  Show welcome banner',
    '  help       ->  Show this help screen',
    '+----------------------------------------------+',
  ].join('\n');
}
