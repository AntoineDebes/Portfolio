// Generates a 1200x630 OG image per post at public/og/<slug>.png from .velite data.
// Runs after `velite` in the build script.
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = path.join(ROOT, "public", "og");

const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// Greedy word-wrap for the SVG title (Satori-free pipeline; librsvg has no wrapping).
function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) {
      lines.push(line.trim());
      line = w;
    } else {
      line += " " + w;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 3);
}

let posts;
try {
  posts = JSON.parse(await readFile(path.join(ROOT, ".velite", "posts.json"), "utf8"));
} catch {
  console.log("og-posts: no .velite/posts.json (run `velite` first) — skipping");
  process.exit(0);
}

await mkdir(OUT, { recursive: true });

for (const post of posts.filter((p) => !p.draft)) {
  const lines = wrap(post.title, 30);
  const titleSvg = lines
    .map(
      (l, i) =>
        `<text x="80" y="${250 + i * 72}" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="800" fill="#e7ebec" letter-spacing="-1">${esc(l)}</text>`
    )
    .join("\n  ");
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0d0e"/>
  <g fill="#1e2426">
    ${Array.from({ length: 12 }, (_, r) =>
      Array.from({ length: 22 }, (_, c) => `<circle cx="${60 + c * 52}" cy="${60 + r * 48}" r="2"/>`).join("")
    ).join("\n    ")}
  </g>
  <rect x="80" y="150" width="64" height="6" fill="#3fd68f"/>
  ${titleSvg}
  <text x="80" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#3fd68f">Antoine Debes</text>
  <text x="80" y="572" font-family="Consolas, monospace" font-size="24" fill="#6b7679">antoinedebes.com/writing</text>
</svg>`;
  const dest = path.join(OUT, `${post.slug}.png`);
  await sharp(Buffer.from(svg)).png().toFile(dest);
  console.log(`og-posts: wrote og/${post.slug}.png`);
}
