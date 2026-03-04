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
  for (const project of projects) {
    lines.push('┌──────────────────────────────────────────────────────────────┐');
    lines.push(`│ [${project.id}] ${project.name}`);
    lines.push('│');
    lines.push(`│   ${project.description}`);
    if (project.technologies?.length) {
      lines.push('│');
      lines.push(`│   Tech: ${project.technologies.join(', ')}`);
    }
    if (project.github || project.live) {
      lines.push('│');
      if (project.github) lines.push(`│   GitHub: ${project.github}`);
      if (project.live) lines.push(`│   Live:   ${project.live}`);
    }
    lines.push('└──────────────────────────────────────────────────────────────┘');
    lines.push('');
  }
  lines.push('Tip: type `project <id>` to see details for a specific project.');
  return lines.join('\n');
}

export function buildWhoamiText(): string {
  const lines: string[] = [];
  lines.push('┌─[ IDENTITY FILE ]──────────────────────────────────┐');
  lines.push(`│  Name      :  ${hero.name} (alias: Maxim)            │`);
  lines.push('│  Role      :  Full Stack Developer, Hacker          │');
  lines.push('│  Location  :  Madurai, Tamil Nadu, India            │');
  lines.push('│                                                    │');
  lines.push('│  I build modern, scalable web applications         │');
  lines.push('│  with clean code and bold ideas. Passionate        │');
  lines.push('│  about turning complex problems into elegant       │');
  lines.push('│  digital solutions.                                │');
  lines.push('└────────────────────────────────────────────────────┘');
  return lines.join('\n');
}

export function buildEducationText(): string {
  const lines: string[] = [];
  lines.push('┌─[ EDUCATION ]───────────────────────────────────────────────┐');
  lines.push(`│  ${about.education.degree}`);
  lines.push(`│  ${about.education.institution}`);
  lines.push(`│  ${about.education.period} – ${about.education.status}`);
  lines.push('└─────────────────────────────────────────────────────────────┘');
  return lines.join('\n');
}

export function buildBannerText(): string {
  return '>> Welcome to Maxim\'s cyber terminal. Type "help" to see available commands.';
}

export function buildProjectDetails(id: string): string {
  const project = projects.find(p => p.id.toLowerCase() === id.toLowerCase());
  if (!project) {
    return `Project not found: ${id}. Type \"projects\" to see available IDs.`;
  }
  const lines: string[] = [];
  lines.push('┌─[ PROJECT DETAILS ]─────────────────────────────────────────┐');
  lines.push(`│  ${project.name} [${project.id}]`);
  lines.push('│');
  lines.push(`│  ${project.description}`);
  if (project.technologies?.length) {
    lines.push('│');
    lines.push(`│  Tech stack: ${project.technologies.join(', ')}`);
  }
  if (project.keyFeatures?.length) {
    lines.push('│');
    lines.push('│  Key features:');
    for (const feat of project.keyFeatures) {
      lines.push(`│    • ${feat}`);
    }
  }
  if (project.github || project.live) {
    lines.push('│');
    if (project.github) lines.push(`│  GitHub: ${project.github}`);
    if (project.live) lines.push(`│  Live:   ${project.live}`);
  }
  lines.push('└─────────────────────────────────────────────────────────────┘');
  return lines.join('\n');
}

export function buildSkillsText(): string {
  const lines: string[] = [];
  lines.push('== SKILLS MATRIX ==');
  lines.push('');
  for (const [category, items] of Object.entries(skills.categories)) {
    lines.push(category.toUpperCase());
    for (const item of items) {
      const level = item.level ?? '';
      const pct = item.percentage ? ` (${item.percentage}%)` : '';
      lines.push(`  • ${item.name} – ${level}${pct}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function buildExperienceText(): string {
  const lines: string[] = [];
  lines.push('== EXPERIENCE ==');
  lines.push('');
  for (const exp of experience) {
    lines.push('┌──────────────────────────────────────────────────────────────┐');
    lines.push(`│  ${exp.company} – ${exp.role} (${exp.period})`);
    lines.push('│');
    for (const line of exp.description) {
      lines.push(`│    • ${line}`);
    }
    lines.push('└──────────────────────────────────────────────────────────────┘');
    lines.push('');
  }
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

export function buildContactBlock(): string {
  const lines: string[] = [];
  lines.push('== CONTACT == ');
  lines.push('');
  lines.push(`Email: ${contact.email}`);
  lines.push('');
  lines.push('Profiles:');
  for (const [key, url] of Object.entries(contact.social)) {
    if (!url) continue;
    lines.push(`  • ${key}: ${url}`);
  }
  lines.push('');
  lines.push('Tip: type `message` to open a secure message form overlay.');
  return lines.join('\n');
}

function wrapText(text: string, width = 88): string {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > width) {
      lines.push(current.trim());
      current = word;
    } else {
      current += ' ' + word;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines.join('\n      ');
}

