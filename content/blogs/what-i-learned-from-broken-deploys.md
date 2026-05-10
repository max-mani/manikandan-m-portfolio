---
title: "What broken deploys taught me about calm debugging"
date: "2026-02-11"
tag: "ops"
excerpt: "When a deploy fails in public, panic is easy. These are the habits that helped me debug faster and with less chaos."
readTime: 5
---

Every developer says they are calm under pressure until production breaks right before a demo. I was definitely not calm at first. My old pattern was panic, random changes, more panic, then an accidental fix I could not explain later.

Broken deploys forced me to build a process.

Step one is freeze the blast radius. I stop merging, stop feature edits, and focus on restoring the known-good path. This sounds obvious, but it saves you from stacking new bugs on top of the original issue.

Step two is timeline first, opinions later. I collect exact timestamps: last successful deploy, first failed build, latest dependency updates, and environment changes. Most incidents become much smaller once the timeline is clear.

Step three is reduce the problem to one reproducible error. If ten logs are screaming, I pick the first hard failure and ignore everything else until I can explain it. Chasing all errors at once feels fast but is usually noise.

I also keep a "rollback confidence rule." If I cannot identify a safe fix in reasonable time, I roll back immediately and continue debugging from a stable state. Recovery first, optimization later.

After each incident, I write a short postmortem in plain language: root cause, trigger, and one prevention action. Not a giant document, just enough for future me to avoid repeating the same mistake.

These habits did not eliminate failures, but they changed how I respond. Now when something breaks, I do fewer random moves and more deliberate ones. Calm debugging is not a personality trait. It is a checklist you trust when stress is high.
