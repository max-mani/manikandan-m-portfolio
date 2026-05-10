---
title: "How I scope side projects so they actually ship"
date: "2026-03-29"
tag: "dev"
excerpt: "I stopped planning side projects like startup launches. This is the lightweight scope template that helped me ship faster."
readTime: 6
---

I used to kill good ideas by overscoping them on day one. A simple app idea turned into auth, billing, admin panel, analytics, email queue, and ten "future-proof" abstractions before I even wrote a useful feature. The result was always the same: lots of setup, no launch.

Now I scope side projects in three layers.

Layer one is "what must exist for this to be real?" That is usually one core workflow. For a planning app, it might be create trip -> invite friends -> add expenses. If that flow works from end to end, the project is alive. Everything else is optional for V1.

Layer two is "what removes obvious friction?" This includes things like basic auth, simple error handling, and one clean list view. Not perfect UX, just enough that using the app does not feel like punishment.

Layer three is "nice to have after first users." Dark mode, advanced filters, notification polish, and all the flashy touches go here. The key is to protect this layer from leaking into week one.

I also set a hard launch deadline before coding starts. Even if it is just a soft launch to friends, a date forces decisions. Without a deadline, every feature sounds reasonable and nothing gets done.

One more thing that helped: I write a short "kill rule." If nobody uses the app after a fixed period, I archive it without guilt and move on. This keeps energy for the next build instead of dragging dead projects forever.

Shipping side projects is less about coding speed and more about scope discipline. Once I accepted that, launches became routine instead of rare.
