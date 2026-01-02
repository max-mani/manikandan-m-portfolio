'use client';

import React, { useEffect, useRef } from 'react';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get parent container dimensions (top panel area)
    const parent = canvas.parentElement;
    if (!parent) return;

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 20;
    let columns = 0;
    let drops: number[] = [];

    const updateCanvasSize = () => {
      if (!parent || !canvas) return;
      const rect = parent.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      const newColumns = Math.floor(newWidth / fontSize);
      
      // Only update canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Adjust columns without resetting drops
      if (newColumns > columns) {
        // Add new columns with random starting positions
        for (let x = columns; x < newColumns; x++) {
          drops[x] = Math.random() * -100;
        }
      } else if (newColumns < columns) {
        // Remove excess columns
        drops = drops.slice(0, newColumns);
      }
      
      columns = newColumns;
    };

    const initDrops = () => {
      updateCanvasSize();
      if (!canvas) return;
      if (columns === 0) {
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
          drops[x] = Math.random() * -100;
        }
      }
    };

    initDrops();

    function draw() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(parent);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.2 }}
    />
  );
}

