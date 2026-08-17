---
title: "How This Site Loads in Under One Second (and How You Can Verify It Right Now)"
slug: how-this-site-loads-in-under-one-second
date: 2026-08-16
description: "An annotated walkthrough of this exact page's load — the budget it was built to, the requests it makes, the things it deliberately refuses to ship, and how to check every claim yourself in DevTools."
tags: [web-performance, next-js, case-study]
draft: false
---

Every claim in this article is verifiable against the page you are reading it on. Open DevTools, switch to the Network tab, reload, and follow along. That is the whole point: a portfolio that claims performance as a specialty should be its own first case study.

## The budget came before the code

Before the redesign, this site was a cautionary tale I built myself: a full-viewport canvas glitch animation behind the hero, particle effects on every section title, animated SVG borders around every project card, ~16 MB of raw PNG screenshots, and a `* { transition }` CSS rule taxing every element on the page. The git history contains a commit called `fix mobile lags`. It did not fix the mobile lags.

The rebuild started with a budget, not a design:

| Metric | Budget |
| --- | --- |
| First-load JavaScript (gzipped) | ≤ 120 kB, page chunk ≤ 15 kB |
| Images on the home page | < 300 kB total |
| Render-blocking requests | 1 — the single stylesheet, nothing else |
| Layout shift (CLS) | 0.00 |
| Lab LCP, throttled mid-tier device | < 1.0 s |

The JavaScript number deserves honesty: on Next.js 15 with the App Router, the framework baseline — React, the router, hydration — is roughly 100 kB gzipped before you write a line of your own code. A hand-written static page could be 10 kB; if I ever migrate this site to zero-hydration HTML, that becomes the budget. Until then, the honest budget is "framework floor plus almost nothing", and the enforcement is automated: the build fails in CI if a route's first-load JS grows past the ceiling.

## What actually loads

Reload this page with the Network tab open and disable cache. You will see, in order:

1. **The HTML document.** Statically exported at build time — there is no server rendering on demand, no API calls, no waiting. Everything you read arrived in the first response, which also means the page works with JavaScript disabled.
2. **Two font families.** Geist Sans and Geist Mono, subset to Latin and self-hosted as `woff2`, with size-adjusted fallback metrics generated at build time. No round-trip to a font CDN, and no layout shift when they arrive. (The full font strategy has [its own article](/writing/web-fonts-compression-guide/).)
3. **One stylesheet.** Tailwind compiles to a single small CSS file containing only the classes this site actually uses.
4. **The JavaScript chunks — all `async`.** None of them block rendering. The page paints before React hydrates, and the only interactive components on the home page are small: a theme toggle, a scroll-spy for the sidebar navigation, a copy-email button, and a ~3 kB Web Vitals reporter.
5. **Images, lazily.** Project screenshots are 800-pixel WebP files of 15–55 kB each, loaded only as you scroll to them, each with explicit dimensions so nothing shifts.

What you will *not* see is often the more important list.

## What this site refuses to ship

Every item below was either in the old version of this site or is standard issue on portfolio sites, and each one was cut deliberately:

- **No canvas or WebGL.** The old glitch-effect hero ran a full-viewport canvas loop from the moment the page opened until you closed the tab. Decorative animation on this site is now CSS only, runs on the compositor, and respects `prefers-reduced-motion`.
- **No animation library.** The previous build shipped framer-motion — around 40 kB gzipped — to animate a decorative beam and a toggle button. Everything it did is now CSS transitions and scroll-driven animations, which cost zero JavaScript.
- **No third-party requests on the critical path.** No tag manager, no font CDN, no screenshot service — every request that renders this page comes from this origin. Two pieces of telemetry load *after* the page is interactive: a ~3 kB first-party beacon reporting anonymous Core Web Vitals, and Google Analytics. Analytics is the one deliberate concession here, and worth stating plainly: gtag.js is the heaviest single asset on the site. It buys me the data on what people actually read; it costs nothing before paint, which is why the budget above still holds. Verify it yourself — sort the Network tab by domain and note when each request fires.
- **No hero video, no icon font, no CSS framework runtime.** The icons are a handful of inline SVGs.

The pattern behind the list: on the modern web, most performance work is subtraction. The fastest request is the one you don't make.

## The three decisions that mattered most

Everything else was detail; these three choices did the heavy lifting.

**Static export over server rendering.** The site is prebuilt to plain HTML at deploy time (`output: "export"`) and served from a CDN. Time-to-first-byte is a cache hit, not a function invocation. This forecloses server features — and for a portfolio, that constraint is a gift: it makes slow architecture impossible.

**Images resized at build time.** Next.js's image optimizer doesn't run under static export, so a small [sharp](https://sharp.pixelplumbing.com/) script resizes and re-encodes every screenshot to WebP at the exact display size before the build. The six project screenshots went from 16.2 MB of PNG to 167 kB total — a 99% reduction, and the single biggest fix in this rebuild.

**Deleting instead of optimizing.** The old effect stack wasn't slow because it was badly written; it was slow because it existed. No amount of `useMemo` makes a permanent full-screen canvas loop cheap. Cutting it improved every metric at once — JavaScript size, main-thread time, battery, INP — and, honestly, the design too.

## Lab numbers vs. what you experience

The numbers above are *lab* numbers: measured on a throttled connection with a cold cache, the way Lighthouse or WebPageTest would. Your load just now was probably faster — warm CDN, real broadband, maybe a repeat visit served from the browser's back/forward cache in ~0 ms.

Field data — what real visitors experience at the 75th percentile — is the truth that matters, and it's collected here by the Web Vitals beacon mentioned above. As it accumulates, the numbers on the [/perf](/perf/) page come from real visits, not my machine. That page also carries the current budget, what the CI enforcement looks like, and a changelog of every performance regression I find in my own site, because publishing your own regressions is more convincing than publishing your wins.

The JavaScript side of this story — where the 68 kB actually came from — is broken down in [Your Next.js Bundle Is Lying to You](/writing/nextjs-bundle-forensics/).

## Reproduce this audit on any site in 15 minutes

1. Open DevTools → Network. Check "Disable cache", set throttling to "Fast 4G", reload. Count the requests before first paint — anything render-blocking shows up before the first pixel.
2. Find the LCP element: Performance tab → record a reload → click the LCP marker. Ask: when did the browser *learn* about this resource? Late discovery, not slow download, is the usual LCP killer.
3. Sort Network by size. Anything over 100 kB must justify itself.
4. Filter by domain. Every third-party origin is a negotiation someone should have had.
5. Run Lighthouse twice and keep the second run (the first is polluted by extension noise more often than people think).

If you do this to your own site and find something interesting, [email me](mailto:info@antoinedebes.com) — the best future article on this site might be your waterfall.
