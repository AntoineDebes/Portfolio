// Measures the real weight of the exported site (gzipped, as served) and
// writes src/data/perf.json — consumed by the /perf page and the Perf HUD.
// With --check, exits non-zero when a budget is exceeded (used in CI).
// Checks EVERY exported route's first-load JS, not just the home page.
import { readFile, readdir, writeFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = path.join(ROOT, "out");
const CHECK = process.argv.includes("--check");

const BUDGET = {
  firstLoadJsKb: 120, // per route; Next 15 App Router framework floor is ~102 kB gz
  htmlKb: 40,
  cssKb: 20,
  homeImagesKb: 300,
  renderBlockingRequests: 1, // the single same-origin stylesheet
  // Third parties referenced by the served HTML, i.e. on the critical path.
  // Analytics is injected client-side after hydration, so it is deliberately
  // outside this number — see the note on /perf.
  thirdPartyRequests: 0,
};

const gzKb = (buf) => gzipSync(buf, { level: 9 }).length / 1024;
const r1 = (n) => Math.round(n * 10) / 10;

// Modern-browser JS chunks referenced by a page (noModule polyfills excluded)
const pageScripts = (html) =>
  [...html.matchAll(/<script src="(\/_next\/[^"]+\.js)"([^>]*)>/g)]
    .filter((m) => !m[2].includes("noModule"))
    .map((m) => m[1]);

const pageStyles = (html) =>
  [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => m[1]);

// Cross-origin resource loads (scripts, stylesheets/preloads, images) — links
// (<a href>) are navigation, not requests, and don't count.
const thirdPartyRequests = (html) => {
  const hits = [
    ...html.matchAll(/<script[^>]+src="(https?:\/\/[^"]+)"/g),
    ...html.matchAll(/<link[^>]+href="(https?:\/\/[^"]+)"[^>]*rel="(?:stylesheet|preload|preconnect)"/g),
    ...html.matchAll(/<link[^>]+rel="(?:stylesheet|preload|preconnect)"[^>]*href="(https?:\/\/[^"]+)"/g),
    ...html.matchAll(/<img[^>]+src="(https?:\/\/[^"]+)"/g),
  ].map((m) => m[1]);
  return [...new Set(hits.filter((u) => !u.startsWith("https://antoinedebes.com/")))];
};

// --- Enumerate every exported route ---
const htmlFiles = (await readdir(OUT, { recursive: true }))
  .filter((f) => f.endsWith(".html") && f !== "404.html")
  .map((f) => f.replaceAll("\\", "/"));

const perRoute = [];
const allThirdParty = new Set();
for (const file of htmlFiles) {
  const html = await readFile(path.join(OUT, file), "utf8");
  let jsKb = 0;
  for (const src of new Set(pageScripts(html))) {
    jsKb += gzKb(await readFile(path.join(OUT, decodeURIComponent(src))));
  }
  thirdPartyRequests(html).forEach((u) => allThirdParty.add(u));
  perRoute.push({
    route: "/" + file.replace(/index\.html$/, ""),
    firstLoadJsKb: r1(jsKb),
    renderBlocking: new Set(pageStyles(html)).size,
  });
}
perRoute.sort((a, b) => b.firstLoadJsKb - a.firstLoadJsKb);

// --- Detailed home-page breakdown ---
const home = await readFile(path.join(OUT, "index.html"), "utf8");
const homeStyles = [...new Set(pageStyles(home))];
let cssKb = 0;
let fontsKb = 0;
for (const href of homeStyles) {
  const css = await readFile(path.join(OUT, href), "utf8");
  cssKb += gzKb(Buffer.from(css));
  const fonts = [...css.matchAll(/url\((\/_next\/static\/media\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
  for (const f of new Set(fonts)) {
    fontsKb += (await stat(path.join(OUT, f))).size / 1024;
  }
}
const htmlKb = gzKb(Buffer.from(home));
const imgs = [...new Set([...home.matchAll(/src="(\/[^"]+\.webp)"/g)].map((m) => m[1]))];
let imagesKb = 0;
for (const src of imgs) {
  imagesKb += (await stat(path.join(OUT, src))).size / 1024;
}
const homeRoute = perRoute.find((r) => r.route === "/");

const data = {
  measuredAt: new Date().toISOString().slice(0, 10),
  firstLoadJsKb: homeRoute ? homeRoute.firstLoadJsKb : 0,
  worstRouteJsKb: perRoute[0]?.firstLoadJsKb ?? 0,
  worstRoute: perRoute[0]?.route ?? "-",
  htmlKb: r1(htmlKb),
  cssKb: r1(cssKb),
  fontsKb: r1(fontsKb),
  homeImagesKb: r1(imagesKb),
  renderBlockingRequests: homeRoute ? homeRoute.renderBlocking : 0,
  thirdPartyRequests: allThirdParty.size,
  routesChecked: perRoute.length,
  budget: BUDGET,
};

await writeFile(
  path.join(ROOT, "src", "data", "perf.json"),
  JSON.stringify(data, null, 2) + "\n"
);
console.table(data);

if (CHECK) {
  const failures = [];
  for (const r of perRoute) {
    if (r.firstLoadJsKb > BUDGET.firstLoadJsKb)
      failures.push(`${r.route} first-load JS ${r.firstLoadJsKb} kB > ${BUDGET.firstLoadJsKb} kB`);
    if (r.renderBlocking > BUDGET.renderBlockingRequests)
      failures.push(`${r.route} render-blocking requests ${r.renderBlocking} > ${BUDGET.renderBlockingRequests}`);
  }
  if (htmlKb > BUDGET.htmlKb) failures.push(`home HTML ${r1(htmlKb)} kB > ${BUDGET.htmlKb} kB`);
  if (cssKb > BUDGET.cssKb) failures.push(`CSS ${r1(cssKb)} kB > ${BUDGET.cssKb} kB`);
  if (imagesKb > BUDGET.homeImagesKb) failures.push(`home images ${r1(imagesKb)} kB > ${BUDGET.homeImagesKb} kB`);
  if (allThirdParty.size > BUDGET.thirdPartyRequests)
    failures.push(`third-party requests: ${[...allThirdParty].join(", ")}`);
  if (failures.length) {
    console.error("PERF BUDGET EXCEEDED:\n- " + failures.join("\n- "));
    process.exit(1);
  }
  console.log(`Perf budget: all checks passed across ${perRoute.length} routes.`);
}
