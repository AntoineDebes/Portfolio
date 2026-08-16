// Build-time image optimization (static export can't use the next/image optimizer).
// Usage: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SCREENSHOT_WIDTH = 800; // rendered at ~256-512px; 800w covers 2x displays

const screenshots = ["alahli", "alat", "aldar", "expo", "fabbank", "new-murabba"];

for (const name of screenshots) {
  const src = path.join(PUBLIC, `${name}.png`);
  const dest = path.join(PUBLIC, `${name}.webp`);
  try {
    const before = (await stat(src)).size;
    await sharp(src).resize({ width: SCREENSHOT_WIDTH }).webp({ quality: 78 }).toFile(dest);
    const after = (await stat(dest)).size;
    console.log(
      `${name}.png ${(before / 1024 / 1024).toFixed(2)} MB -> ${name}.webp ${(after / 1024).toFixed(0)} kB`
    );
  } catch (err) {
    if (err.code === "ENOENT") console.log(`${name}.png not found, skipping`);
    else throw err;
  }
}

const leftovers = (await readdir(PUBLIC)).filter((f) => screenshots.some((s) => f === `${s}.png`));
if (leftovers.length) {
  console.log(`\nSource PNGs still present (delete after verifying): ${leftovers.join(", ")}`);
}
