'use client';

import { CyberNavbar } from '@/components/shared/CyberNavbar';

const navLinks = [
  { href: '/writeups', label: 'ctf://home' },
  { href: '/writeups/categories', label: 'ctf://categories' },
  { href: '/writeups#events', label: 'ctf://events' },
];

export default function WriteupsNavbar() {
  return (
    <CyberNavbar
      brandLabel="MAXIM.CTF"
      brandColor="cyan"
      navLinks={navLinks}
      linkColor="cyan"
    />
  );
}
