import type { MetadataRoute } from "next";
import { posts } from "#velite";
import perf from "@/data/perf.json";

export const dynamic = "force-static";

const SITE = "https://antoinedebes.com";

// lastModified comes from real content signals, never the build timestamp —
// a sitemap that claims every page changed on every deploy trains crawlers
// to ignore it.
export default function sitemap(): MetadataRoute.Sitemap {
  const published = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const newestPost = published[0] ? new Date(published[0].date) : new Date("2026-08-16");
  const perfMeasured = new Date(perf.measuredAt);

  return [
    { url: `${SITE}/`, lastModified: newestPost, priority: 1 },
    { url: `${SITE}/writing/`, lastModified: newestPost, priority: 0.8 },
    ...published.map((p) => ({
      url: `${SITE}${p.permalink}`,
      lastModified: new Date(p.date),
      priority: 0.7,
    })),
    { url: `${SITE}/perf/`, lastModified: perfMeasured, priority: 0.6 },
    { url: `${SITE}/lab/`, lastModified: newestPost, priority: 0.5 },
  ];
}
