import { defineConfig, defineCollection, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.md",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("posts"),
      date: s.isodate(),
      description: s.string(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      metadata: s.metadata(),
      body: s.markdown(),
    })
    .transform((data) => ({ ...data, permalink: `/writing/${data.slug}/` })),
});

// Case studies ship as drafts until real, verified numbers are filled in.
const work = defineCollection({
  name: "CaseStudy",
  pattern: "work/**/*.md",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("work"),
      client: s.string(),
      role: s.string(),
      description: s.string(),
      draft: s.boolean().default(true),
      body: s.markdown(),
    })
    .transform((data) => ({ ...data, permalink: `/work/${data.slug}/` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { posts, work },
});
