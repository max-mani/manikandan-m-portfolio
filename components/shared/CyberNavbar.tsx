'use client';

import Link from 'next/link';

export interface NavLink {
  href: string;
  label: string;
}

interface CyberNavbarProps {
  brandLabel: string;
  brandColor: 'primary' | 'cyan';
  navLinks: NavLink[];
  linkColor: 'primary-dim' | 'cyan';
}

export function CyberNavbar({ brandLabel, brandColor, navLinks, linkColor }: CyberNavbarProps) {
  const brandStyle =
    brandColor === 'primary'
      ? { color: '#00ff88', textShadow: '0 0 12px rgba(0,255,136,0.8)' }
      : { color: '#00ffff', textShadow: '0 0 12px rgba(0,255,255,0.8)' };
  const linkStyle = { color: '#00ffff', textShadow: '0 0 6px rgba(0,255,255,0.6)' };
  const homeStyle = { color: '#00ff88', textShadow: '0 0 6px rgba(0,255,136,0.6)' };

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-5 lg:px-8 min-h-14 py-2 border-b border-white/[0.07] backdrop-blur-xl bg-[rgba(5,6,10,0.78)] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
    >
      <Link
        href={navLinks[0]?.href ?? '/'}
        className="font-[family-name:var(--font-vt323)] text-xl font-bold transition-opacity hover:opacity-90"
        style={brandStyle}
      >
        [ {brandLabel} ]
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-wrap sm:flex-nowrap justify-end min-w-0">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-mono text-sm transition-opacity hover:opacity-90"
            style={linkStyle}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/"
          className="font-mono text-sm transition-opacity hover:opacity-90 shrink-0"
          style={homeStyle}
        >
          [ ← Home ]
        </Link>
      </div>
    </nav>
  );
}
