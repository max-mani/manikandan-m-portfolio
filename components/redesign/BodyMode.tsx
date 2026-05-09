'use client';

import { useEffect } from 'react';

/** Sets `data-mode="maxim"` on `<body>` for MAXIM_OS flat palette (no cyber mesh). */
export function BodyMode() {
  useEffect(() => {
    const prev = document.body.getAttribute("data-mode");
    document.body.setAttribute("data-mode", "maxim");
    return () => {
      if (prev) document.body.setAttribute("data-mode", prev);
      else document.body.removeAttribute("data-mode");
    };
  }, []);
  return null;
}
