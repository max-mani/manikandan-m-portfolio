'use client';

import { CyberNavbar } from '@/components/shared/CyberNavbar';

const navLinks = [
  { href: '/wirteups', label: 'ctf://home' },
  { href: '/wirteups/categories', label: 'ctf://categories' },
  { href: '/wirteups#events', label: 'ctf://events' },
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
