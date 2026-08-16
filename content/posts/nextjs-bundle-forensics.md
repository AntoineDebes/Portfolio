---
title: "Your Next.js Bundle Is Lying to You: A Field Guide to Finding the Real Bloat"
slug: nextjs-bundle-forensics
date: 2026-08-16
description: "How to read Next.js build output correctly, catch barrel-file explosions and 'use client' contagion, and set up CI guardrails — illustrated with the real numbers from cutting this site from 173 kB to 105 kB of first-load JavaScript."
tags: [web-performance, next-js, javascript]
draft: false
---

This site's JavaScript went from **173 kB to 105 kB** (gzipped, first load) in one working day — not through clever optimization, but through forensics: finding out what was actually in the bundle and why. The commits are public, so this article can use them as a worked example of a process that applies to any Next.js app.

## The only number that matters (and what it hides)

When `next build` finishes, it prints a table. The number to read is **First Load JS** — the gzipped JavaScript a new visitor downloads to render a route. Ignore the per-route "Size" column until you understand what's shared.

```
Route (app)                    Size    First Load JS
┌ ○ /                        1.88 kB       107 kB
+ First Load JS shared by all              102 kB
```

Three things this table hides:

1. **The floor.** On Next.js 15 with the App Router, the shared baseline — React, the router, hydration runtime — is ~100 kB gzipped before you write a line of code. Your leverage is everything *above* the floor. When this site's home route reads 107 kB, the honest reading is: framework 102, me 5.
2. **What "shared" means.** A chunk used by every route lands in the shared row. One heavy import in your root `layout.tsx` taxes *every page on the site*. The layout is the most expensive place to put code, and the place people audit least.
3. **It's an estimate.** The table is computed at build time. What browsers actually download can differ (the `noModule` polyfill chunk, for example, appears in the HTML but is never fetched by modern browsers). When I measured this site's export by gzipping the actual chunks referenced in `index.html`, the real number was 105.4 kB vs the table's 107. Close — but trust the export, not the table, and measure the export in CI.

## Forensic tool #1: the bundle analyzer, read correctly

```bash
npm i -D @next/bundle-analyzer
ANALYZE=true next build
```

The treemap is where intuitions die. Reading rules:

- Sort by **gzipped** size. Raw size overweights repetitive code that compresses well.
- Look for *duplicates* first: two versions of the same library (a date library imported directly and via a dependency) is the most common silent 20 kB.
- Anything in the shared chunk gets interrogated: *why is this on every page?*

## Forensic tool #2: the barrel-file trap

A "barrel" is an `index.ts` that re-exports a whole library. Icon libraries are the classic case:

```ts
import { ArrowUpRight } from "lucide-react"; // innocent-looking
```

Whether this ships one icon or the entire icon set depends on the library's internal structure and your bundler's tree-shaking succeeding — and tree-shaking fails quietly: a single side-effectful module in the chain and you ship 1,400 icons to render three.

Defenses, in order of preference:

1. Next.js ships `optimizePackageImports` in `next.config` — it rewrites barrel imports to direct per-module imports at build time for listed packages (several popular ones are covered by default).
2. Import from the concrete path (`lucide-react/dist/esm/icons/arrow-up-right`) where the library supports it.
3. For a handful of icons: **don't import an icon library at all.** This site's icons are ~10 inline SVGs pasted into components. Zero dependency, zero risk, styleable with `currentColor`.

## Forensic tool #3: `"use client"` contagion

The App Router's real performance feature is that server components ship **zero** component JavaScript. But client-ness is contagious downward: mark one high-level component `"use client"` and every module it imports joins the client bundle.

The audit is grep-shaped:

```bash
grep -rn '"use client"' src/ | wc -l
```

Then, for each hit, one question: *does this component hold state or attach event handlers?* If not, the directive is contagion damage.

This was the single biggest lever on this site. The old version had client components everywhere because everything animated. After the redesign, the page-specific chunk for the home route is **1.88 kB** — the interactive surface is exactly four small components (theme toggle, scroll-spy, copy-email button, a 2 kB vitals reporter), and everything else renders on the server at build time. The old page chunk was 55 kB. Nothing was "optimized"; the client boundary was just drawn where it belonged.

## Forensic tool #4: know what a dependency costs before you add it

The 68 kB this site lost came mostly from deleting three things the old version shipped: an animation library (~40 kB gz) that animated one decorative beam, a particle engine for section-title sparkles, and a canvas glitch effect. Each entered the codebase as a one-line `npm install` that looked free.

The discipline that prevents the relapse:

- Check [bundlephobia](https://bundlephobia.com) or `npm pack --dry-run` *before* installing.
- Prefer the platform: CSS scroll-driven animations replaced the animation library here at a cost of 0 kB — they run compositor-side, which is also better for INP.
- `next/dynamic` is for genuinely-heavy, genuinely-conditional things (an editor, a chart, a modal). It is not absolution for shipping too much; a lazy-loaded 200 kB is still 200 kB when it loads.

## The guardrail that makes it stick

Every number above decays without enforcement. This repo's CI fails any push where the measured export exceeds budget:

```js
// scripts/measure-perf.mjs (excerpt) — gzip the chunks the HTML actually references
const scripts = [...html.matchAll(/<script src="(\/_next\/[^"]+\.js)"([^>]*)>/g)]
  .filter((m) => !m[2].includes("noModule"))
  .map((m) => m[1]);
let jsKb = 0;
for (const src of new Set(scripts)) jsKb += gzKb(await readFile(join(OUT, src)));
if (jsKb > BUDGET.firstLoadJsKb) process.exit(1);
```

Twenty lines, no SaaS, runs in seconds. The [live results are public](/perf/). A budget that fails the build is a decision; a budget in a wiki is a wish.

## The one-hour audit, condensed

1. `next build` → write down First Load JS per route and the shared row.
2. Analyzer → find duplicates and the heaviest three modules → justify or kill each.
3. Grep `"use client"` → push every directive down to the smallest stateful leaf.
4. Check barrel imports against `optimizePackageImports`.
5. Add the CI gate so you never do this audit again.

The pattern behind all five steps is the same one behind most performance work: the bundle doesn't need optimizing so much as it needs *auditing*. Most of the weight was never load-bearing.
