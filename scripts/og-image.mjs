// Generates the 1200x630 Open Graph share image at public/og.png.
// Usage: node scripts/og-image.mjs
import sharp from "sharp";
import path from "node:path";

const PUBLIC = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0d0e"/>
  <!-- subtle dot grid -->
  <g fill="#1e2426">
    ${Array.from({ length: 12 }, (_, r) =>
      Array.from({ length: 22 }, (_, c) => `<circle cx="${60 + c * 52}" cy="${60 + r * 48}" r="2"/>`).join("")
    ).join("\n    ")}
  </g>
  <rect x="0" y="0" width="1200" height="630" fill="url(#fade)"/>
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b0d0e" stop-opacity="0"/>
      <stop offset="1" stop-color="#0b0d0e" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect x="80" y="336" width="64" height="6" fill="#3fd68f"/>
  <text x="80" y="308" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="800" fill="#e7ebec" letter-spacing="-2">Antoine Debes</text>
  <text x="80" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#3fd68f">Principal Software Engineer</text>
  <text x="80" y="476" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#98a3a8">Web performance &amp; frontend architecture - Next.js, React, Core Web Vitals</text>
  <text x="80" y="572" font-family="Consolas, monospace" font-size="26" fill="#6b7679">antoinedebes.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(path.join(PUBLIC, "og.png"));
console.log("public/og.png written (1200x630)");
