---
title: "CTF notes after midnight"
date: "2026-04-18"
tag: "ctf"
excerpt: "Most of my best CTF solves happen between 11 PM and 2 AM. This is how I run those sessions without burning out."
readTime: 5
---

Most of my useful CTF work happens late at night, but I learned the hard way that "more hours" is not equal to "better results." I used to sit for five hours straight, keep ten tabs open, and tell myself I was grinding. Real output was almost zero. Now I run midnight sessions like mini sprints.

I start with one clear target before I even open the challenge. If it is web, I define one path: recon -> endpoint mapping -> input tracing. If it is pwn, I define another: checksec -> static read -> dynamic run -> payload sketch. Having that skeleton keeps me from getting lost in random rabbit holes.

Second rule: I write notes while solving, not after solving. Nothing fancy. Just command, output, and "why this matters." Future me always forgets the exact reason a weird offset worked, so I treat every solve like I will teach it tomorrow. This one habit made writeups way faster and cleaner.

Third rule: controlled frustration. If I am stuck for more than 30 minutes on the same point, I switch mode. Either I simplify the exploit path, or I move to a different challenge category for one round. Staying stubborn feels productive, but usually it is ego.

I also end every night with a two-line debrief: what worked, what wasted time. That tiny ritual improved my hit rate more than any tool upgrade. Midnight CTF sessions are still chaos, but now they are organized chaos. That difference matters when the scoreboard gets tight.
