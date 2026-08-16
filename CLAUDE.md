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

There is no test suite. Both `package-lock.json` and `pnpm-lock.yaml` exist; Netlify builds with npm (`netlify.toml`), so prefer npm to keep `package-lock.json` authoritative.

## Critical constraint: static export

`next.config.ts` sets `output: "export"` with `trailingSlash: true` and `images.unoptimized: true`. That means:

- No server features: no API routes, no server actions, no ISR/`revalidate` (the `revalidate` export in `page.tsx` is inert), no middleware.
- `next/image` optimization is off — images are served as-is from `public/`.
- The build must succeed as a pure static export; anything requiring a Node server will break the Netlify deploy (publish dir is `out/`).

## Architecture

- `src/app/layout.tsx` — root layout; owns all SEO metadata (Open Graph, Twitter, robots, icons) and mounts the global `Navbar` and floating `SocialLinks`.
- `src/app/page.tsx` — the only page; composes section components in order (`Hero`, `WorkExperience`, `Projects`, `Skills`) and holds the experience data inline.
- `src/components/` — section components plus decorative/animated components (some are `.jsx` with co-located `.css` files, e.g. `LetterGlitch`, `CircularText`, `GradientText`, `LogoLoop`).
- `src/components/ui/` — shadcn-style primitives and effect components (`sparkles`, `tracing-beam`, `ElectricBorder*`, `SparklesTitle`, `LinkPreview`, `ThemeToggle`, `infinite-moving-cards`).
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).

Styling is Tailwind CSS v4 (PostCSS plugin; theme configured in `src/app/globals.css`, no `tailwind.config`). shadcn/ui is configured in `components.json` (new-york style, zinc base color, lucide icons) with the `@aceternity` registry available for `npx shadcn add`. Animations use `motion`/`framer-motion` plus hand-rolled canvas components.

Dark mode is class-based and treated as the primary look; most components style both `dark:` and light variants explicitly.

`LinkPreview` fetches screenshots from `api.microlink.io` (whitelisted in `next.config.ts` image domains).
