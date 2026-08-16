---
title: "Web Fonts Without the Performance Tax: Compression, Subsetting, and Fallbacks That Don't Shift"
slug: web-fonts-compression-guide
date: 2026-08-16
description: "A practical deep dive into font performance: why woff2 wins, how subsetting cuts 80% of the bytes, what variable fonts change, and how size-adjust makes the fallback invisible — with this site's own font pipeline as the worked example."
tags: [web-performance, fonts, css]
draft: false
---

Fonts sit in an awkward place in the waterfall: they're discovered late (the browser only requests a font after CSS tells it a visible element needs one), they block the text you came to read, and a careless setup ships megabytes for glyphs nobody renders. They're also one of the most *solvable* performance problems on the web — the full toolkit fits in one article.

Everything below is applied on this site; the numbers are from its build output, and you can verify them in your Network tab right now.

## Compression: woff2 or nothing

Font formats are a solved argument. `woff2` wraps the font tables in Brotli compression and has been supported by every browser that matters for years. Compared to a raw `ttf`/`otf`, `woff2` is typically **60–70% smaller**; compared to the older `woff` (zlib-based), it still saves ~20–30%.

Practical rules:

- Ship `woff2` **only**. A `woff` fallback in your `@font-face` `src` list is dead weight in 2026 — browsers that would use it can live with your fallback stack.
- Never ship `ttf`/`otf` to production. If a designer hands you one, convert it (`fonttools` does this in one line).
- Don't double-compress: `woff2` is already Brotli. Serving it with `Content-Encoding: br` again wastes CPU for ~0 bytes. Check your CDN isn't doing this.

## Subsetting: the 80% you never render

A typical "full" font covers Latin, Latin Extended, Cyrillic, Greek, Vietnamese, and a pile of OpenType features. If your site is English-language, most of those bytes are decoration for the crawler.

Subsetting splits the font by script and lets `unicode-range` do lazy loading at the glyph level:

```css
@font-face {
  font-family: "Geist";
  src: url("/fonts/geist-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, /* … */;
}
```

The browser downloads a subset **only if the page actually renders a character in its range**. This site declares eleven subset files for its two families, but a typical visit downloads exactly two: the Latin subsets — **28.6 kB for Geist Sans and 22.6 kB for Geist Mono**. The other nine files exist for the rare page that needs them and cost nothing until then.

Tooling: `next/font` does this automatically (it's what generated the numbers above). Doing it by hand, `pyftsubset` from fonttools is the standard:

```bash
pyftsubset Geist.ttf \
  --output-file=geist-latin.woff2 \
  --flavor=woff2 \
  --layout-features="kern,liga,calt" \
  --unicodes="U+0000-00FF,U+2013-2014,U+2018-201D,U+2026"
```

Two traps worth knowing: aggressive subsetting can silently drop ligatures, tabular figures, or the arrows and quotes your design system actually uses — keep the OpenType features you rely on, and test with real content. And if you support user-generated content, be generous with ranges; tofu boxes (□) in a comment section are a worse bug than 10 extra kilobytes.

## Variable fonts: one file instead of six

If you use more than two or three weights of a family, a variable font usually wins. Instead of shipping Regular + Medium + SemiBold + Bold as four files, one variable file carries the whole weight axis — typically 40–60% smaller than the sum, one request instead of four, and you get the in-between weights for free.

The flip: if you only use one weight plus a bold, two static subsets are often smaller than one variable file. Measure, don't assume — the answer flips per family.

## Loading strategy: FOUT is a feature

`font-display` decides what happens between first paint and font arrival:

- **`swap`** — show the fallback immediately, swap when ready. Text is readable from the first paint. This is the right default for body text.
- **`optional`** — use the web font only if it's already cached (or arrives near-instantly). The most performance-pure option: repeat visitors get the brand font, first-time visitors on slow networks never wait for it.
- **`block`** — invisible text for up to 3 seconds. Almost never what you want.

People avoid `swap` because the swap itself looks janky: the fallback renders at a different width, and the page reflows when the real font lands. That's not an argument against `swap` — it's an argument for fixing the fallback. Which brings us to the good part.

## `size-adjust`: the layout shift killer

The reflow-on-swap problem exists because Arial and your brand font disagree about how wide text is. Modern CSS lets you *calibrate the fallback* to match the web font's metrics:

```css
@font-face {
  font-family: "Geist Fallback";
  src: local("Arial");
  size-adjust: 104.76%;
  ascent-override: 85.83%;
  descent-override: 20.32%;
  line-gap-override: 9.33%;
}
```

That `104.76%` is a real number from this site's generated CSS: Arial scaled up ~5% occupies almost exactly the same space as Geist, so when the swap happens, nothing moves. The mono fallback needs `size-adjust: 134.59%` — monospace metrics diverge harder, which is why unstyled mono fallbacks jump so visibly on other sites.

`next/font` computes these overrides automatically. Outside Next, [fontaine](https://github.com/unjs/fontaine) or Capsize generate them, or you can measure once with a canvas and hardcode the result. However you get there, this single technique takes font-driven CLS to zero without giving up custom type.

## Discovery: when does the browser even ask?

Compression solves bytes; discovery solves *when*. The browser requests a font only after it has downloaded CSS, built the render tree, and found a visible element using that face. That chain — HTML → CSS → font — is why fonts are chronically late.

- **Self-host.** A third-party font CDN adds a DNS + TLS handshake to a render-critical resource, and cross-origin caching has been dead since browsers partitioned caches years ago. There is no performance argument left for a font CDN — only licensing ones.
- **Preload only what's certain.** `<link rel="preload" as="font">` skips the discovery chain, but every preloaded font competes with your CSS and LCP image for early bandwidth. Preload the one or two subsets that render above-the-fold text; preloading all eleven subsets would make this site *slower*.
- **Same-origin, immutable caching.** Hashed font filenames + `Cache-Control: immutable` means repeat visits pay zero font cost.

## The checklist

1. `woff2` only, self-hosted, hashed filenames, immutable cache headers.
2. Subset by script; let `unicode-range` lazy-load the exotic ranges.
3. Variable font if you use 3+ weights; measure if fewer.
4. `font-display: swap` (or `optional` if you're hardcore) — never `block`.
5. Metric-compatible fallback with `size-adjust`/`ascent-override` → zero CLS.
6. Two families maximum. Every additional face has to justify itself against the best-compressed asset on your page: no font at all.

The result on this site: two families, ~51 kB of fonts on a typical visit, zero layout shift, zero third-party requests. Open DevTools → Network → filter "Font" and check my math.
