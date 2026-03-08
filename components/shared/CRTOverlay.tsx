'use client';

export function CRTOverlay() {
  return (
    <>
      {/* Scanline overlay - 4px pitch, 14% opacity */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.14) 2px,
            rgba(0, 0, 0, 0.14) 4px
          )`,
        }}
        aria-hidden
      />
      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)',
        }}
        aria-hidden
      />
    </>
  );
}
