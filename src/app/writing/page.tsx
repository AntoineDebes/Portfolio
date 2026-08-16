import type { Metadata } from "next";
import Link from "next/link";
import SubpageHeader from "@/components/SubpageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { posts } from "#velite";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "In-depth articles on web performance, Next.js, React, and Core Web Vitals by Antoine Debes — font compression, bundle forensics, waterfall analysis, and INP.",
  alternates: {
    canonical: "/writing/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    url: "/writing/",
    title: "Writing — Antoine Debes",
    description:
      "In-depth articles on web performance, Next.js, React, and Core Web Vitals.",
    images: [{ url: "/og/writing.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/writing.png"],
  },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function WritingIndex() {
  const published = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="mx-auto min-h-svh max-w-3xl px-6 py-14">
      <Breadcrumbs name="Writing" path="/writing/" />
      <SubpageHeader />
      <main id="content">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Writing
        </h1>
        <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-gray-600 dark:text-white/65">
          Web performance, Next.js, and the measurable side of frontend
          engineering. Everything here is verifiable — often against this very
          site. Subscribe via{" "}
          <a
            href="/feed.xml"
            className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            RSS
          </a>
          .
        </p>
        <ul className="mt-10 space-y-6">
          {published.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.permalink}
                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                    {post.title}
                  </h2>
                  <span className="font-mono text-[13px] text-gray-500 tabular-nums dark:text-white/50">
                    {formatDate(post.date)} · {post.metadata.readingTime} min
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-white/70">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
