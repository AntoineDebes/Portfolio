// Generates the profile image and the complete favicon / app-icon set from
// one source photo (assets/profile-source.jpg).
//
// Google Search shows a site favicon only when it can fetch a square icon
// (>48px recommended), so 48/96/192/512 are all emitted.
// Usage: node scripts/icons.mjs
import sharp from "sharp";
import { writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PUBLIC = path.join(ROOT, "public");
const SOURCE = path.join(ROOT, "assets", "profile-source.jpg");

const INK = "#0b0d0e";
const ACCENT = "#3fd68f";

await mkdir(PUBLIC, { recursive: true });

// --- Profile image used in the sidebar ---
// 2x the 64px rendered size, so it stays crisp on retina.
await sharp(SOURCE)
  .resize(256, 256, { fit: "cover", position: "top" })
  .webp({ quality: 82 })
  .toFile(path.join(PUBLIC, "profile.webp"));
const profileSize = (await stat(path.join(PUBLIC, "profile.webp"))).size;
console.log(`icons: profile.webp (256x256, ${(profileSize / 1024).toFixed(1)} kB)`);

// A larger copy for Open Graph / structured data consumers.
await sharp(SOURCE)
  .resize(512, 512, { fit: "cover", position: "top" })
  .webp({ quality: 85 })
  .toFile(path.join(PUBLIC, "profile-512.webp"));
console.log("icons: profile-512.webp (512x512)");

// --- Favicon set, cropped to a circle on the brand ground ---
// A square photo shrinks badly in a tab; cropping to a circle with a thin
// accent ring keeps the silhouette readable at small sizes.
const circleMask = (s) =>
  Buffer.from(
    `<svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#fff"/></svg>`
  );

const ring = (s) =>
  Buffer.from(
    `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
       <circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - s * 0.02}"
               fill="none" stroke="${ACCENT}" stroke-width="${s * 0.04}"/>
     </svg>`
  );

async function faceIcon(size, { round = true, pad = 0 } = {}) {
  const inner = size - pad * 2;
  const face = await sharp(SOURCE)
    .resize(inner, inner, { fit: "cover", position: "top" })
    .toBuffer();

  let layer = sharp(face);
  if (round) {
    layer = layer.composite([{ input: circleMask(inner), blend: "dest-in" }]);
  }
  const shaped = await layer.png().toBuffer();

  const composites = [{ input: shaped, top: pad, left: pad }];
  // Below ~64px the ring costs more face than it adds definition.
  if (round && size >= 64) composites.push({ input: ring(size), top: 0, left: 0 });

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: round ? INK : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png({ compressionLevel: 9 });
}

const sizes = [16, 32, 48, 96, 192, 512];
for (const size of sizes) {
  const img = await faceIcon(size);
  await img.toFile(path.join(PUBLIC, `favicon-${size}x${size}.png`));
  console.log(`icons: favicon-${size}x${size}.png`);
}

// Apple touch icon: square photo on the brand ground (iOS rounds it itself).
await sharp({
  create: { width: 180, height: 180, channels: 4, background: INK },
})
  .composite([
    {
      input: await sharp(SOURCE)
        .resize(164, 164, { fit: "cover", position: "top" })
        .toBuffer(),
      top: 8,
      left: 8,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUBLIC, "apple-touch-icon.png"));

for (const size of [192, 512]) {
  const img = await faceIcon(size);
  await img.toFile(path.join(PUBLIC, `android-chrome-${size}x${size}.png`));
}
console.log("icons: apple-touch-icon, android-chrome 192/512");

// --- Multi-resolution favicon.ico (16/32/48) ---
// public/ only: an src/app/favicon.ico makes Next auto-inject a competing
// link tag advertising 16x16 ahead of the metadata icons, and Google reads
// the first icon it finds.
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + pngs.length * 16;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const icoParts = [];
for (const size of [16, 32, 48]) {
  icoParts.push({ size, data: await (await faceIcon(size)).toBuffer() });
}
const ico = buildIco(icoParts);
await writeFile(path.join(PUBLIC, "favicon.ico"), ico);
console.log(`icons: favicon.ico (${icoParts.length} sizes, ${(ico.length / 1024).toFixed(1)} kB)`);

// SVG icon: the photo can't be vector, so embed the 192px raster in an SVG
// wrapper for clients that request rel="icon" type="image/svg+xml".
const raster = (await (await faceIcon(192)).toBuffer()).toString("base64");
await writeFile(
  path.join(PUBLIC, "icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><image href="data:image/png;base64,${raster}" width="192" height="192"/></svg>`
);
console.log("icons: icon.svg");
