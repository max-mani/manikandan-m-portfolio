/**
 * Build public/favicon.ico from the canonical PNG favicon source.
 * Served at https://your-domain/favicon.ico (Google indexing, browsers).
 * Run: npm run favicon
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcCandidates = [
  path.join(root, 'public', 'images', 'hero-avatar.png'),
  path.join(root, 'public', 'images', 'anime-bot-favicon.png'),
];
const src = srcCandidates.find((p) => fs.existsSync(p));
const dest = path.join(root, 'public', 'favicon.ico');

if (!src) {
  console.error('Missing favicon source. Add public/images/hero-avatar.png');
  process.exit(1);
}

const buf = await pngToIco(src);
fs.writeFileSync(dest, buf);
console.log('Wrote', dest, `(${buf.length} bytes)`);
