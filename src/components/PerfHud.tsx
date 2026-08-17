import React from "react";
import Link from "next/link";
import perf from "@/data/perf.json";

// The signature element: this site's own measured weight, linked to the
// article that walks through the load and the public /perf scoreboard.
export default function PerfHud() {
  const chips: [string, string][] = [
    [`${Math.round(perf.firstLoadJsKb)} kB`, "JS"],
    [`${Math.round(perf.homeImagesKb)} kB`, "images"],
    ["0", "third-parties"],
  ];
  return (
    <Link
      href="/perf/"
      className="group mt-8 block rounded-lg border border-gray-200 bg-white/60 p-4 transition-colors hover:border-emerald-500/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-white/70">
        This page, as served
      </span>
      <span className="mt-2 flex gap-4">
        {chips.map(([value, label]) => (
          <span key={label} className="flex flex-col">
            <span className="font-mono text-base font-semibold text-gray-900 tabular-nums dark:text-white">
              {value}
            </span>
            <span className="text-xs text-gray-500 dark:text-white/70">
              {label}
            </span>
          </span>
        ))}
      </span>
      <span className="mt-2 block text-sm text-emerald-700 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-emerald-400">
        Don&apos;t take my word for it — verify →
      </span>
    </Link>
  );
}
