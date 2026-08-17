import type { Metadata } from "next";
import Link from "next/link";
import SubpageHeader from "@/components/SubpageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import perf from "@/data/perf.json";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "The public performance scoreboard for antoinedebes.com — measured weight, the enforced budget, what telemetry runs, and a changelog of every perf fix and regression.",
  alternates: { canonical: "/perf/" },
  openGraph: {
    type: "website",
    url: "/perf/",
    title: "Performance, in public — Antoine Debes",
    description:
      "This site's measured weight, the budget CI enforces on every push, and a changelog of every performance fix and regression.",
    images: [{ url: "/og/perf.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/perf.png"] },
};

const changelog: { date: string; entry: string; delta: string }[] = [
  {
    date: "2026-08-16",
    entry:
      "Removed the animation library entirely (scroll effects now CSS-driven), rebuilt the shell as server components.",
    delta: "first-load JS down again; runtime animation JS: 0",
  },
  {
    date: "2026-08-16",
    entry:
      "Killed the effect stack: full-viewport canvas glitch hero, tsparticles titles, animated SVG card borders, 96-image marquee, a universal `* { transition }` rule, and 8 infinite-loop animations in the theme toggle.",
    delta: "first-load JS 173 → 157 kB; continuous rAF/canvas cost → 0",
  },
  {
    date: "2026-08-16",
    entry:
      "Re-encoded six project screenshots from raw PNG to display-sized WebP at build time.",
    delta: "16.2 MB → 167 kB (−99%)",
  },
];

function Row({
  label,
  value,
  budget,
  pass,
}: {
  label: string;
  value: string;
  budget: string;
  pass: boolean;
}) {
  return (
    <tr className="border-b border-gray-100 last:border-0 dark:border-white/5">
      <td className="py-3 pr-4 text-base text-gray-700 dark:text-white/85">{label}</td>
      <td className="py-3 pr-4 font-mono text-base text-gray-900 tabular-nums dark:text-white">{value}</td>
      <td className="py-3 pr-4 font-mono text-[13px] text-gray-500 tabular-nums dark:text-white/65">{budget}</td>
      <td className="py-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${
            pass
              ? "bg-emerald-600/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300"
              : "bg-red-600/10 text-red-800 dark:bg-red-400/10 dark:text-red-300"
          }`}
        >
          {pass ? "PASS" : "OVER"}
        </span>
      </td>
    </tr>
  );
}

export default function PerfPage() {
  const b = perf.budget;
  return (
    <div className="mx-auto min-h-svh max-w-3xl px-6 py-14">
      <Breadcrumbs name="Performance" path="/perf/" />
      <SubpageHeader />
      <main id="content">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Performance, in public
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-gray-700 dark:text-white/85">
          This site claims performance as a specialty, so its own numbers are
          public: the measured weight of the home page as served, the budget
          that CI enforces on every push, and a changelog of what changed —
          including the embarrassing parts. Methodology and a guided tour live
          in{" "}
          <Link
            href="/writing/how-this-site-loads-in-under-one-second/"
            className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            How This Site Loads in Under One Second
          </Link>
          .
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Scoreboard
        </h2>
        <p className="mt-1 font-mono text-[13px] text-gray-500 dark:text-white/60">
          measured {perf.measuredAt} · gzip, as served · home route
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left dark:border-white/10">
                <th className="pb-2 pr-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500 dark:text-white/70">Metric</th>
                <th className="pb-2 pr-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500 dark:text-white/70">Measured</th>
                <th className="pb-2 pr-4 text-[13px] font-semibold uppercase tracking-wider text-gray-500 dark:text-white/70">Budget</th>
                <th className="pb-2 text-[13px] font-semibold uppercase tracking-wider text-gray-500 dark:text-white/70">Status</th>
              </tr>
            </thead>
            <tbody>
              <Row
                label="First-load JavaScript"
                value={`${perf.firstLoadJsKb} kB`}
                budget={`≤ ${b.firstLoadJsKb} kB`}
                pass={perf.firstLoadJsKb <= b.firstLoadJsKb}
              />
              <Row
                label="HTML document"
                value={`${perf.htmlKb} kB`}
                budget={`≤ ${b.htmlKb} kB`}
                pass={perf.htmlKb <= b.htmlKb}
              />
              <Row
                label="Stylesheet"
                value={`${perf.cssKb} kB`}
                budget={`≤ ${b.cssKb} kB`}
                pass={perf.cssKb <= b.cssKb}
              />
              <Row
                label="Images on the home page"
                value={`${perf.homeImagesKb} kB`}
                budget={`≤ ${b.homeImagesKb} kB`}
                pass={perf.homeImagesKb <= b.homeImagesKb}
              />
              <Row
                label="Render-blocking requests"
                value={`${perf.renderBlockingRequests} (the stylesheet)`}
                budget={`≤ ${b.renderBlockingRequests}`}
                pass={perf.renderBlockingRequests <= b.renderBlockingRequests}
              />
              <Row
                label="Third-party requests before paint"
                value={`${perf.thirdPartyRequests}`}
                budget={`${b.thirdPartyRequests}`}
                pass={perf.thirdPartyRequests <= b.thirdPartyRequests}
              />
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-white/60">
          An honest caveat: ~102 kB of the JavaScript is the Next.js 15 App
          Router framework baseline (React, router, hydration). The parts I
          control add {Math.max(0, Math.round(perf.firstLoadJsKb - 102))} kB on
          top. A zero-hydration rewrite would drop the floor to ~10 kB — it&apos;s
          on the roadmap as an experiment.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          How it&apos;s enforced
        </h2>
        <ul className="mt-4 max-w-xl list-disc space-y-2 pl-5 text-base leading-relaxed text-gray-700 dark:text-white/85">
          <li>
            Every push runs{" "}
            <a
              href="https://github.com/AntoineDebes/Portfolio/blob/master/.github/workflows/ci.yml"
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              a CI workflow
            </a>{" "}
            that rebuilds the site, re-measures every number above from the
            actual export, and fails the build if a budget is exceeded.
          </li>
          <li>
            Lighthouse runs against the static export with assertions on
            performance, accessibility, SEO, CLS, and total blocking time.
          </li>
          <li>
            Telemetry: a ~3 kB first-party beacon reports anonymous LCP, INP,
            and CLS — that&apos;s the field data behind future case studies.
            Google Analytics also runs, loaded <code>afterInteractive</code> so
            it stays off the critical path. It is by some distance the heaviest
            thing this site ships, and the honest trade for knowing which
            articles people actually read; the numbers above measure the
            critical path, which it deliberately sits outside of.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Performance changelog
        </h2>
        <p className="mt-2 max-w-xl text-base text-gray-600 dark:text-white/75">
          Wins and regressions both — publishing only the wins is marketing,
          not engineering.
        </p>
        <ol className="mt-4 space-y-4">
          {changelog.map((c, i) => (
            <li
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <p className="font-mono text-[13px] text-gray-500 dark:text-white/60">{c.date}</p>
              <p className="mt-1 text-base leading-relaxed text-gray-800 dark:text-white/90">{c.entry}</p>
              <p className="mt-2 font-mono text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">{c.delta}</p>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
