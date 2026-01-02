'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ProfileImage() {
  const [glitch, setGlitch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-lg shadow-cyan-500/20 bg-gray-900" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
    >
      <div
        className={`absolute inset-0 transition-all duration-150 profile-image-blend ${
          glitch ? 'glitch-effect' : ''
        }`}
      >
        <Image
          src="/assets/profile/manikandan.jpg"
          alt="Manikandan M"
          fill
          className="object-cover"
          priority
          unoptimized
          suppressHydrationWarning
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23111" width="200" height="200"/%3E%3Ctext fill="%2300ffff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="monospace" font-size="14"%3EProfile%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      {/* Eye glitch overlays with X marks */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Left eye glitch (from viewer's perspective - person's right eye) */}
        <div className="eye-glitch absolute top-[35%] left-[33%] w-[20%] h-[8%] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <line x1="2" y1="2" x2="14" y2="14" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeOpacity="1"/>
            <line x1="14" y1="2" x2="2" y2="14" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeOpacity="1"/>
          </svg>
        </div>
        {/* Right eye glitch (from viewer's perspective - person's left eye) */}
        <div className="eye-glitch absolute top-[35%] right-[34%] w-[20%] h-[8%] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <line x1="2" y1="2" x2="14" y2="14" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeOpacity="1"/>
            <line x1="14" y1="2" x2="2" y2="14" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeOpacity="1"/>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .glitch-effect {
          animation: glitch 0.15s infinite;
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

        .eye-glitch {
          background: rgba(0, 255, 0, 0.2);
          pointer-events: none;
          z-index: 2;
          animation: eyeGlitch 0.5s infinite;
          clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%);
          position: absolute;
          box-sizing: border-box;
        }

        .eye-glitch svg {
          filter: drop-shadow(0 0 4px #00ff00) drop-shadow(0 0 8px #00ff00);
          position: relative;
          z-index: 3;
        }

        .profile-image-blend {
          mix-blend-mode: screen;
          filter: contrast(1.1) brightness(0.9);
        }

        .profile-image-blend img {
          mix-blend-mode: screen;
        }

        @keyframes eyeGlitch {
          0% {
            transform: translate(0, 0);
            clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%);
          }
          10% {
            transform: translate(2px, -2px);
            clip-path: polygon(0px 2px, 100% 0px, 98% 100%, 2px 98%);
          }
          20% {
            transform: translate(-2px, 2px);
            clip-path: polygon(2px 0px, 98% 2px, 100% 98%, 0px 100%);
          }
          30% {
            transform: translate(1px, -1px);
            clip-path: polygon(0px 1px, 99% 0px, 99% 100%, 1px 99%);
          }
          40% {
            transform: translate(-1px, 1px);
            clip-path: polygon(1px 0px, 100% 1px, 99% 99%, 0px 100%);
          }
          50% {
            transform: translate(2px, 1px);
            clip-path: polygon(0px 0px, 98% 1px, 100% 99%, 2px 100%);
          }
          60% {
            transform: translate(-2px, -1px);
            clip-path: polygon(2px 1px, 100% 0px, 98% 100%, 0px 99%);
          }
          70% {
            transform: translate(1px, 2px);
            clip-path: polygon(0px 0px, 99% 2px, 99% 98%, 1px 100%);
          }
          80% {
            transform: translate(-1px, -2px);
            clip-path: polygon(1px 2px, 100% 0px, 99% 100%, 0px 98%);
          }
          90% {
            transform: translate(2px, -1px);
            clip-path: polygon(0px 1px, 98% 0px, 100% 99%, 2px 100%);
          }
          100% {
            transform: translate(0, 0);
            clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%);
          }
        }
      `}</style>
    </motion.div>
  );
}

