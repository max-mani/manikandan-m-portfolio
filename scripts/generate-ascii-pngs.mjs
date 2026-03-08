#!/usr/bin/env node
/**
 * Generates high-quality PNG images from ASCII art.
 * Run: node scripts/generate-ascii-pngs.mjs
 */

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'images');

const ASCII_NAME_LINES = [
  '███╗░░░███╗░█████╗░███╗░░██╗██╗██╗░░██╗░█████╗░███╗░░██╗██████╗░░█████╗░███╗░░██╗  ███╗░░░███╗',
  '████╗░████║██╔══██╗████╗░██║██║██║░██╔╝██╔══██╗████╗░██║██╔══██╗██╔══██╗████╗░██║  ████╗░████║',
  '██╔████╔██║███████║██╔██╗██║██║█████═╝░███████║██╔██╗██║██║░░██║███████║██╔██╗██║  ██╔████╔██║',
  '██║╚██╔╝██║██╔══██║██║╚████║██║██╔═██╗░██╔══██║██║╚████║██║░░██║██╔══██║██║╚████║  ██║╚██╔╝██║',
  '██║░╚═╝░██║██║░░██║██║░╚███║██║██║░╚██╗██║░░██║██║░╚███║██████╔╝██║░░██║██║░╚███║  ██║░╚═╝░██║',
  '╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░╚═╝░░╚═╝╚═╝░░╚══╝  ╚═╝░░░░░╚═╝',
];

const ASCII_BANNER_LINES = [
  ' ███╗   ███╗ █████╗ ██╗  ██╗██╗███╗   ███╗',
  ' ████╗ ████║██╔══██╗╚██╗██╔╝██║████╗ ████║',
  ' ██╔████╔██║███████║ ╚███╔╝ ██║██╔████╔██║',
  ' ██║╚██╔╝██║██╔══██║ ██╔██╗ ██║██║╚██╔╝██║',
  ' ██║ ╚═╝ ██║██║  ██║██╔╝ ██╗██║██║ ╚═╝ ██║',
  ' ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝',
];

const SCALE = 2; // 2x for retina/high quality
const FONT_SIZE = 14 * SCALE;
const LINE_HEIGHT = 16 * SCALE;
const FONT = `${FONT_SIZE}px "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "Liberation Mono", monospace`;

function renderAsciiToPng(lines, color, outPath) {
  const maxLen = Math.max(...lines.map((l) => l.length));
  const charWidth = FONT_SIZE * 0.6;
  const width = Math.ceil(maxLen * charWidth) + 40;
  const height = lines.length * LINE_HEIGHT + 40;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'transparent';
  ctx.clearRect(0, 0, width, height);

  ctx.font = FONT;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';

  lines.forEach((line, i) => {
    ctx.fillText(line, 20, 20 + i * LINE_HEIGHT);
  });

  const buffer = canvas.toBuffer('image/png', { compressionLevel: 6 });
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(outPath, buffer);
  console.log(`Wrote ${outPath}`);
}

renderAsciiToPng(ASCII_NAME_LINES, '#86efac', join(OUT_DIR, 'ascii-name.png'));
renderAsciiToPng(ASCII_BANNER_LINES, '#67e8f9', join(OUT_DIR, 'ascii-banner.png'));
