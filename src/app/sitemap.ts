import type { MetadataRoute } from "next";
import { posts } from "#velite";

export const dynamic = "force-static";

const SITE = "https://antoinedebes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const published = posts.filter((p) => !p.draft);
  return [
    {
      url: `${SITE}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/writing/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...published.map((p) => ({
      url: `${SITE}${p.permalink}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE}/perf/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/lab/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
