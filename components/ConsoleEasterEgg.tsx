'use client';

import { useEffect } from 'react';

export function ConsoleEasterEgg() {
  useEffect(() => {
    const art = `
%c
╔════════════════════════════════════════════════╗
║            MAXIM_OS — CONSOLE ACCESS           ║
╠════════════════════════════════════════════════╣
║  You opened the console.                       ║
║  That makes you one of us.                     ║
╠════════════════════════════════════════════════╣
║  FLAG{c0ns0l3_1s_wh3r3_w3_l1v3}               ║
╠════════════════════════════════════════════════╣
║  4 more flags hidden on this site.             ║
║  Hint: The old ones leave traces.              ║
║  Hint: butterfly_1993 left something behind.   ║
╚════════════════════════════════════════════════╝
`;

    console.log(art, 'color:#00ff41;font-family:monospace;font-size:10px;');
  }, []);

  return null;
}
