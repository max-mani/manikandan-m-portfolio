'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleBackToTerminal = () => {
    if (typeof window !== 'undefined' && window.opener) {
      window.close();
    } else {
      router.push('/');
    }
  };

  const brandStyle =
    brandColor === 'primary'
      ? { color: '#00ff88', textShadow: '0 0 12px rgba(0,255,136,0.8)' }
      : { color: '#00ffff', textShadow: '0 0 12px rgba(0,255,255,0.8)' };
  const linkStyle = { color: '#00ffff', textShadow: '0 0 6px rgba(0,255,255,0.6)' };
  const terminalStyle = { color: '#00ff88', textShadow: '0 0 6px rgba(0,255,136,0.6)' };

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 border-b"
      style={{
        background: 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      <Link
        href={navLinks[0]?.href ?? '/'}
        className="font-[family-name:var(--font-vt323)] text-xl font-bold transition-opacity hover:opacity-90"
        style={brandStyle}
      >
        [ {brandLabel} ]
      </Link>

      <div className="flex items-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
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
        <button
          onClick={handleBackToTerminal}
          className="font-mono text-sm transition-opacity hover:opacity-90"
          style={terminalStyle}
        >
          [ ← terminal ]
        </button>
      </div>
    </nav>
  );
}
