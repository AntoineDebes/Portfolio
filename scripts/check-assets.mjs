// Fails the build if any asset referenced by the exported HTML or the web
// manifest is missing from out/. A 404 favicon or apple-touch-icon is
// invisible in local dev and only shows up as a generic globe in search
// results weeks later — this catches it at build time instead.
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = path.join(ROOT, "out");

const exists = async (p) => {
  try {
    await access(path.join(OUT, decodeURIComponent(p.replace(/^\//, ""))));
    return true;
  } catch {
    return false;
  }
};

const missing = [];
const checked = new Set();

async function check(url, source) {
  if (!url.startsWith("/") || url.startsWith("//")) return; // external/relative
  const key = `${url}`;
  if (checked.has(key)) return;
  checked.add(key);
  if (!(await exists(url))) missing.push(`${url}  (referenced by ${source})`);
}

const htmlFiles = (await readdir(OUT, { recursive: true }))
  .filter((f) => f.endsWith(".html"))
  .map((f) => f.replaceAll("\\", "/"));

for (const file of htmlFiles) {
  const html = await readFile(path.join(OUT, file), "utf8");
  const refs = [
    ...[...html.matchAll(/<link[^>]+href="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/<meta property="og:image" content="([^"]+)"/g)].map((m) =>
      m[1].replace("https://antoinedebes.com", "")
    ),
    ...[...html.matchAll(/<meta name="twitter:image" content="([^"]+)"/g)].map((m) =>
      m[1].replace("https://antoinedebes.com", "")
    ),
  ];
  for (const ref of refs) await check(ref, file);
}

// Manifest icons
try {
  const manifest = JSON.parse(await readFile(path.join(OUT, "site.webmanifest"), "utf8"));
  for (const icon of manifest.icons ?? []) await check(icon.src, "site.webmanifest");
} catch {
  missing.push("site.webmanifest  (unreadable or missing)");
}

if (missing.length) {
  console.error(`MISSING ASSETS (${missing.length}):\n- ` + missing.join("\n- "));
  process.exit(1);
}
console.log(`Assets: all ${checked.size} referenced URLs resolve across ${htmlFiles.length} pages.`);
