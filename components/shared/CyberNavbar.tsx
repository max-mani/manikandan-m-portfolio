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

  const brandColorClass =
    brandColor === 'primary'
      ? 'text-[var(--primary)]'
      : 'text-[var(--cyan)]';
  const linkColorClass =
    linkColor === 'primary-dim'
      ? 'text-[var(--primary-dim)] hover:text-[var(--cyan)]'
      : 'text-[var(--cyan)] hover:opacity-80';
  const brandGlow =
    brandColor === 'primary'
      ? 'drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]'
      : 'drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]';

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
        className={`font-[family-name:var(--font-vt323)] text-xl font-bold ${brandColorClass} ${brandGlow} transition-opacity hover:opacity-90`}
      >
        [ {brandLabel} ]
      </Link>

      <div className="flex items-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-mono text-sm transition-colors ${linkColorClass}`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleBackToTerminal}
          className="font-mono text-sm text-[var(--primary-dim)] hover:text-[var(--cyan)] transition-colors"
        >
          [ ← terminal ]
        </button>
      </div>
    </nav>
  );
}
