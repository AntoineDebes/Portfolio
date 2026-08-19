// Generates the branded 1200x630 Open Graph images for the site's fixed
// routes (article OG images come from scripts/og-posts.mjs).
// Usage: node scripts/og-image.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PUBLIC = path.join(ROOT, "public");
const SOURCE = path.join(ROOT, "assets", "profile-source.jpg");

// Circular portrait composited into the share card — a face makes a personal
// OG image far more clickable than type alone.
const PORTRAIT = 260;
async function portrait() {
  const face = await sharp(SOURCE)
    .resize(PORTRAIT, PORTRAIT, { fit: "cover", position: "top" })
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${PORTRAIT}" height="${PORTRAIT}"><circle cx="${PORTRAIT / 2}" cy="${PORTRAIT / 2}" r="${PORTRAIT / 2}" fill="#fff"/></svg>`
  );
  const ring = Buffer.from(
    `<svg width="${PORTRAIT}" height="${PORTRAIT}" xmlns="http://www.w3.org/2000/svg"><circle cx="${PORTRAIT / 2}" cy="${PORTRAIT / 2}" r="${PORTRAIT / 2 - 3}" fill="none" stroke="#3fd68f" stroke-width="5"/></svg>`
  );
  return sharp(face)
    .composite([
      { input: mask, blend: "dest-in" },
      { input: ring },
    ])
    .png()
    .toBuffer();
}

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const dots = Array.from({ length: 12 }, (_, r) =>
  Array.from({ length: 22 }, (_, c) => `<circle cx="${60 + c * 52}" cy="${60 + r * 48}" r="2"/>`).join("")
).join("\n    ");

const card = ({ heading, accent, sub, kicker = "antoinedebes.com" }) => `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0d0e"/>
  <g fill="#1e2426">
    ${dots}
  </g>
  <rect x="0" y="0" width="1200" height="630" fill="url(#fade)"/>
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b0d0e" stop-opacity="0"/>
      <stop offset="1" stop-color="#0b0d0e" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect x="80" y="336" width="64" height="6" fill="#3fd68f"/>
  <text x="80" y="308" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="800" fill="#e7ebec" letter-spacing="-2">${esc(heading)}</text>
  <text x="80" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#3fd68f">${esc(accent)}</text>
  <text x="80" y="476" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#98a3a8">${esc(sub)}</text>
  <text x="80" y="572" font-family="Consolas, monospace" font-size="26" fill="#6b7679">${esc(kicker)}</text>
</svg>`;

const pages = [
  {
    file: "og.png",
    heading: "Antoine Debes",
    accent: "Full-Stack Engineer",
    sub: "Fast, scalable web platforms - architected, measured, proven",
  },
  {
    file: "og/writing.png",
    heading: "Writing",
    accent: "Web performance, deeply",
    sub: "Core Web Vitals, Next.js internals, fonts, bundles, and INP",
    kicker: "antoinedebes.com/writing",
  },
  {
    file: "og/perf.png",
    heading: "Performance, in public",
    accent: "Measured, budgeted, enforced",
    sub: "This site's own weight, its CI budget, and every regression logged",
    kicker: "antoinedebes.com/perf",
  },
  {
    file: "og/lab.png",
    heading: "Lab",
    accent: "Feel the metrics",
    sub: "Small interactive experiments about how the web performs",
    kicker: "antoinedebes.com/lab",
  },
];

await mkdir(path.join(PUBLIC, "og"), { recursive: true });
const face = await portrait();

for (const page of pages) {
  const dest = path.join(PUBLIC, page.file);
  await sharp(Buffer.from(card(page)))
    .composite([{ input: face, top: 185, left: 850 }])
    .png()
    .toFile(dest);
  console.log(`og-image: ${page.file} (1200x630, with portrait)`);
}
