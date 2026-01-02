'use client';

import React, { useEffect, useState } from 'react';

interface GlitchEffectProps {
  children: React.ReactNode;
  intensity?: number;
  frequency?: number;
}

export function GlitchEffect({ children, intensity = 0.1, frequency = 3000 }: GlitchEffectProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200 + Math.random() * 100);
    }, frequency + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [frequency]);

  return (
    <div className="relative inline-block glitch-wrapper">
      <div
        className={`transition-all duration-100 ${
          glitch ? 'glitch-active' : ''
        }`}
      >
        {children}
      </div>
      <style jsx>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }

        .glitch-active {
          animation: glitch 0.2s infinite;
          position: relative;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            filter: hue-rotate(0deg) brightness(1);
          }
          10% {
            transform: translate(-2px, 1px);
            filter: hue-rotate(90deg) brightness(1.2);
          }
          20% {
            transform: translate(2px, -1px);
            filter: hue-rotate(180deg) brightness(0.8);
          }
          30% {
            transform: translate(-1px, 2px);
            filter: hue-rotate(270deg) brightness(1.1);
          }
          40% {
            transform: translate(1px, -2px);
            filter: hue-rotate(360deg) brightness(0.9);
          }
          50% {
            transform: translate(-2px, -1px);
            filter: hue-rotate(45deg) brightness(1.15);
          }
          60% {
            transform: translate(2px, 1px);
            filter: hue-rotate(135deg) brightness(0.85);
          }
          70% {
            transform: translate(-1px, -2px);
            filter: hue-rotate(225deg) brightness(1.05);
          }
          80% {
            transform: translate(1px, 2px);
            filter: hue-rotate(315deg) brightness(0.95);
          }
          100% {
            transform: translate(0);
            filter: hue-rotate(0deg) brightness(1);
          }
        }

      `}</style>
    </div>
  );
}

