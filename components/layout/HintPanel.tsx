'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hints = [
  'Type "help" in terminal',
  'Try: about, projects, skills',
  'Use clear to reset',
];

export function HintPanel() {
  const [currentHint, setCurrentHint] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % hints.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-4 bg-black">
      <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHint}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-cyan-400 text-xs text-center"
          >
            💡 {hints[currentHint]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


