/**
 * Build public/favicon.ico from public/images/anime-bot-favicon.png
 * Served at https://your-domain/favicon.ico (Google indexing, browsers).
 * Run: npm run favicon
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'public', 'images', 'anime-bot-favicon.png');
const dest = path.join(root, 'public', 'favicon.ico');

if (!fs.existsSync(src)) {
  console.error('Missing source:', src);
  process.exit(1);
}

const buf = await pngToIco(src);
fs.writeFileSync(dest, buf);
console.log('Wrote', dest, `(${buf.length} bytes)`);
