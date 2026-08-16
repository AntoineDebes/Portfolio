# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio of Antoine Debes (antoinedebes.com) — a single-page Next.js 15 (App Router) site, statically exported and deployed to Netlify.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # static export → out/ (this is what Netlify runs)
npm run lint     # eslint
npm run images   # sharp: regenerate optimized project screenshots (WebP) + the 1200×630 OG image (public/og.png)
```

There is no test suite. npm is the package manager — `package-lock.json` is the only lockfile. (A stale `pnpm-lock.yaml` used to exist and broke Vercel deploys with `ERR_PNPM_OUTDATED_LOCKFILE`; don't reintroduce one.)

**Never run `npm run build` while `npm run dev` is running.** They share the `.next` directory; the build clobbers the dev server's chunks, which then crashes with `Error: Cannot find module './NNN.js'` and serves a blank page. Stop dev, build, then restart dev (delete `.next` first if the dev server was crashed this way).

## Critical constraint: static export

`next.config.ts` sets `output: "export"` with `trailingSlash: true` and `images.unoptimized: true`. That means:

- No server features: no API routes, no server actions, no ISR/`revalidate` (the `revalidate` export in `page.tsx` is inert), no middleware.
- `next/image` optimization is off — images are served as-is from `public/`.
- The build must succeed as a pure static export; anything requiring a Node server will break the Netlify deploy (publish dir is `out/`).

## Architecture

- `src/app/layout.tsx` — root layout; owns all SEO metadata (Open Graph, Twitter, robots, icons), the JSON-LD Person schema, a pre-paint theme script (reads `localStorage.theme`, sets `.dark` on `<html>` before hydration), and mounts the global `Navbar` and floating `SocialLinks`.
- `src/app/page.tsx` — the only page; composes section components in order (`Hero`, `WorkExperience`, `Projects`, `Skills`) and holds the experience data inline.
- `src/components/` — section components. `Hero`, `Projects`, `Skills`, `Navbar` are server components (no client JS); `WorkExperience` is a client component wrapping `ui/tracing-beam` (the only framer-motion consumer).
- `src/components/ui/` — `ThemeToggle` (CSS-transition toggle, persists to localStorage) and `tracing-beam`.
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `scripts/` — `optimize-images.mjs` + `og-image.mjs` (sharp; run via `npm run images`).

Design direction (per the approved v2 blueprint): content-first minimal, dark-first zinc + emerald accent, no canvas/WebGL effects, motion limited to transform/opacity. Heavy effect components (LetterGlitch, Sparkles, ElectricBorder, LogoLoop marquee, Microlink LinkPreview) were deliberately removed — do not reintroduce that class of component; anything animated must be provably cheap.

Styling is Tailwind CSS v4 (PostCSS plugin; theme configured in `src/app/globals.css`, no `tailwind.config`). shadcn/ui is configured in `components.json` (new-york style, zinc base color, lucide icons) with the `@aceternity` registry available for `npx shadcn add`. Animations use `motion`/`framer-motion` plus hand-rolled canvas components.

Dark mode is class-based and treated as the primary look; most components style both `dark:` and light variants explicitly.
