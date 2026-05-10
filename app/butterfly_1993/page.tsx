'use client';

import Link from 'next/link';
import { createElement, useEffect } from 'react';
import './butterfly1993.css';

export default function Butterfly1993Page() {
  useEffect(() => {
    document.body.classList.add('retro-1993');
    return () => {
      document.body.classList.remove('retro-1993');
    };
  }, []);

  const blinkFlag = createElement('blink', { className: 'retro-1993-blink' }, 'FLAG{butterfly_v1rus_1993_n3v3r_d13d}');

  return (
    <main className="retro-1993-page">
      <center>
        <hr />
        <h1>butterfly_1993.exe — Home Page</h1>
        <hr />

        {createElement('marquee', null, 'Welcome to the home of butterfly_1993!')}

        <p>This page was last updated: September 12, 1993</p>
        <p>Visitor count: 00001337</p>

        <hr />

        <h2>About Me</h2>
        <p>
          I am the Butterfly Virus. I was born in 1993.
          <br />
          I used to corrupt things. I don't do that anymore.
          <br />
          Now I fix them. It is better this way.
        </p>

        <hr />

        <h2>You found me.</h2>
        <p>{blinkFlag}</p>

        <hr />

        <blockquote>
          &quot;We don&apos;t corrupt anymore. We fix.&quot;
          <br />— butterfly_1993, 1993
        </blockquote>

        <hr />

        <p>
          Best viewed in Netscape Navigator 1.0
          <br />
          Resolution: 640x480
        </p>

        <hr />

        <Link href="/">[Return to the present]</Link>

        <hr />
      </center>
    </main>
  );
}
