import React from "react";
import Link from "next/link";
import { posts } from "#velite";

export default function WritingSection() {
  const published = posts
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {published.map((post) => (
        <Link
          key={post.slug}
          href={post.permalink}
          className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
              {post.title}
            </h3>
            <span className="shrink-0 font-mono text-[13px] text-gray-500 tabular-nums dark:text-white/65">
              {post.metadata.readingTime} min
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-600 dark:text-white/85">
            {post.description}
          </p>
        </Link>
      ))}
      <p className="pt-2 text-base text-gray-600 dark:text-white/75">
        More essays in the pipeline.{" "}
        <Link
          href="/writing/"
          className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          All writing →
        </Link>
      </p>
    </div>
  );
}
