// Generates the complete favicon / app-icon set from one vector source.
// Google Search only shows a site favicon when it can fetch a square icon at a
// multiple of 48px, so 48/96/192/512 are all emitted (a lone 32x32 gets
// replaced by the generic globe in results).
// Usage: node scripts/icons.mjs
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PUBLIC = path.join(ROOT, "public");

const INK = "#0b0d0e";
const ACCENT = "#3fd68f";

// Monogram: an "A" that stays legible at 16px, with the brand dot that
// follows the wordmark in the site header.
const mark = (size, { padded = false } = {}) => {
  const s = 512;
  const r = padded ? 96 : 112; // corner radius
  const inset = padded ? 44 : 0; // apple-touch icons look better with breathing room
  const box = s - inset * 2;
  return Buffer.from(`
<svg width="${size}" height="${size}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${s}" height="${s}" fill="${INK}"/>
  <rect x="${inset}" y="${inset}" width="${box}" height="${box}" rx="${r}" fill="${INK}"/>
  <text x="${s / 2}" y="${s * 0.72}" text-anchor="middle"
        font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="${s * 0.62}"
        font-weight="700" fill="${ACCENT}">A</text>
  <circle cx="${s * 0.76}" cy="${s * 0.70}" r="${s * 0.055}" fill="${ACCENT}"/>
</svg>`);
};

const png = (size, opts) => sharp(mark(size, opts)).resize(size, size).png({ compressionLevel: 9 });

// --- Minimal ICO writer (PNG-embedded, supported since Vista) ---
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + pngs.length * 16;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

await mkdir(PUBLIC, { recursive: true });

// PNG icons — 48 and its multiples are what Google Search accepts.
const sizes = [16, 32, 48, 96, 192, 512];
for (const size of sizes) {
  await png(size).toFile(path.join(PUBLIC, `favicon-${size}x${size}.png`));
  console.log(`icons: favicon-${size}x${size}.png`);
}

// PWA / platform icons
await png(180, { padded: true }).toFile(path.join(PUBLIC, "apple-touch-icon.png"));
await png(192).toFile(path.join(PUBLIC, "android-chrome-192x192.png"));
await png(512).toFile(path.join(PUBLIC, "android-chrome-512x512.png"));
await png(150).toFile(path.join(PUBLIC, "mstile-150x150.png"));
console.log("icons: apple-touch-icon, android-chrome 192/512, mstile-150");

// Multi-resolution favicon.ico (16/32/48) for legacy clients and crawlers
// that only ever request /favicon.ico.
const icoParts = [];
for (const size of [16, 32, 48]) {
  icoParts.push({ size, data: await png(size).toBuffer() });
}
const ico = buildIco(icoParts);
// public/ only: an src/app/favicon.ico makes Next auto-inject a competing
// link tag that advertises 16x16 ahead of the metadata icons, and Google
// reads the first icon it finds.
await writeFile(path.join(PUBLIC, "favicon.ico"), ico);
console.log(`icons: favicon.ico (${icoParts.length} sizes, ${ico.length} bytes)`);

// Scalable icon for browsers that prefer SVG
await writeFile(path.join(PUBLIC, "icon.svg"), mark(512).toString());
console.log("icons: icon.svg");
