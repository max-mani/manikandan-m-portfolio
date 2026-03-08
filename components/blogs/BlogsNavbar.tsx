'use client';

import { CyberNavbar } from '@/components/shared/CyberNavbar';

const navLinks = [
  { href: '/blogs', label: 'blog://home' },
  { href: '/blogs/archive', label: 'blog://archive' },
  { href: '/blogs/tags', label: 'blog://tags' },
];

export default function BlogsNavbar() {
  return (
    <CyberNavbar
      brandLabel="MAXIM.BLOG"
      brandColor="primary"
      navLinks={navLinks}
      linkColor="cyan"
    />
  );
}
