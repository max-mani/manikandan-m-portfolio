'use client';

import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'ghost' | 'violet' | 'green';

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
}

interface AsButton extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
  external?: never;
}
interface AsLink extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
}

type Props = AsButton | AsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    'border-2 border-[#00e5ff] text-[#00e5ff] shadow-[2px_2px_0_0_#00e5ff] hover:text-[#00ff41] hover:border-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41]',
  violet:
    'border-2 border-[#00ff41] text-[#00ff41] shadow-[2px_2px_0_0_#00ff41] hover:text-[#00e5ff] hover:border-[#00e5ff] hover:shadow-[2px_2px_0_0_#00e5ff]',
  green:
    'border-2 border-[#4caf50] text-[#4caf50] shadow-[2px_2px_0_0_#4caf50] hover:text-[#00ff41] hover:border-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41]',
  ghost:
    'border-2 border-[#1a2e1a] text-[#e8f5e9]/85 shadow-[2px_2px_0_0_#1a2e1a] hover:border-[#00e5ff] hover:text-[#00e5ff] hover:shadow-[2px_2px_0_0_#00e5ff]',
};

export function NeonButton(props: Props) {
  const { children, variant = 'primary', className = '', icon } = props;

  const inner = (
    <span
      className={[
        'inline-flex items-center justify-center gap-2 px-4 py-2 text-[10px] tracking-wide bg-[#0a140a] transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );

  if ('href' in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block active:opacity-90"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className="inline-block active:opacity-90">
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={('type' in props && props.type) || 'button'}
      onClick={'onClick' in props ? props.onClick : undefined}
      className="inline-block active:opacity-90"
    >
      {inner}
    </button>
  );
}
