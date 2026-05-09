'use client';

import { useEffect } from 'react';

/** Sets `data-mode="cyber"` on `<body>` so globals.css applies the main site theme. */
export function BodyMode() {
  useEffect(() => {
    const prev = document.body.getAttribute('data-mode');
    document.body.setAttribute('data-mode', 'cyber');
    return () => {
      if (prev) document.body.setAttribute('data-mode', prev);
      else document.body.removeAttribute('data-mode');
    };
  }, []);
  return null;
}
