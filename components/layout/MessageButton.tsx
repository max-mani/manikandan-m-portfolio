'use client';

import React from 'react';
import { GlitchEffect } from '@/components/shared/GlitchEffect';

interface MessageButtonProps {
  onClick?: () => void;
}

export function MessageButton({ onClick }: MessageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-center text-sm transition-colors"
    >
      <GlitchEffect>Message</GlitchEffect>
    </button>
  );
}
