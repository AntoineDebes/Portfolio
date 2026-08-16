import type { Metadata } from "next";
import Link from "next/link";

// Next already emits `noindex` for not-found; only the inherited canonical
// (which pointed at the homepage) needs clearing.
export const metadata: Metadata = {
  title: "Page not found",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-14">
      <main id="content">
        <p className="font-mono text-sm text-emerald-700 dark:text-emerald-400">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-gray-600 dark:text-white/70">
          The link may be out of date, or the page may have moved during the
          site&apos;s rebuild.
        </p>
        <nav className="mt-8 flex flex-wrap gap-4 text-base">
          <Link
            href="/"
            className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Home
          </Link>
          <Link
            href="/writing/"
            className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Writing
          </Link>
          <Link
            href="/perf/"
            className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Performance
          </Link>
          <Link
            href="/lab/"
            className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Lab
          </Link>
        </nav>
      </main>
    </div>
  );
}
