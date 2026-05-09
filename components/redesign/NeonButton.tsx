'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    'border border-cyan-400/60 text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-500/15 hover:shadow-[0_0_22px_rgba(0,229,255,0.45)]',
  violet:
    'border border-fuchsia-400/60 text-fuchsia-300 hover:text-white hover:border-fuchsia-300 hover:bg-fuchsia-500/15 hover:shadow-[0_0_22px_rgba(168,85,247,0.5)]',
  green:
    'border border-emerald-400/60 text-emerald-300 hover:text-white hover:border-emerald-300 hover:bg-emerald-500/15 hover:shadow-[0_0_22px_rgba(0,255,65,0.4)]',
  ghost:
    'border border-white/15 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5',
};

export function NeonButton(props: Props) {
  const { children, variant = 'primary', className = '', icon } = props;

  const inner = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={[
        'group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium tracking-wide transition-all duration-200 backdrop-blur-sm font-[family-name:var(--font-share-tech-mono)]',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {icon && (
        <span className="inline-flex items-center group-hover:translate-x-0.5 transition-transform">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </motion.span>
  );

  if ('href' in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={('type' in props && props.type) || 'button'}
      onClick={'onClick' in props ? props.onClick : undefined}
      className="inline-block"
    >
      {inner}
    </button>
  );
}
