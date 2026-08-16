import React from "react";

type HeroProps = {
  title?: string;
  subtitle?: string;
};

export default function Hero({
  title = "Hi, I’m Antoine Debes",
  subtitle = "Principal Software Engineer · I make React apps fast",
}: HeroProps) {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-gray-50 dark:bg-black">
      {/* Static dot-grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(17,24,28,0.10)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:28px_28px]"
      />
      {/* Emerald glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/4 h-[420px] w-[680px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 blur-3xl"
      />
      {/* Fade to section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-gray-50 dark:to-black"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: "0.05s" }}
        >
          <img
            src="/new-profile-pic.webp"
            alt="Antoine Debes"
            width={200}
            height={217}
            className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-emerald-500/40 ring-offset-4 ring-offset-gray-50 dark:ring-offset-black shadow-lg"
          />
        </div>
        <h1
          className="mt-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl opacity-0 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>
        <p
          className="mt-4 text-lg font-medium text-emerald-700 dark:text-emerald-400 md:text-xl opacity-0 animate-fade-in"
          style={{ animationDelay: "0.25s" }}
        >
          {subtitle}
        </p>
        <p
          className="mx-auto mt-4 max-w-xl text-sm text-gray-600 dark:text-white/70 md:text-base opacity-0 animate-fade-in"
          style={{ animationDelay: "0.35s" }}
        >
          Web performance &amp; frontend architecture — Next.js, React, Core
          Web Vitals. Principal Software Engineer at VML, shipping for banks
          and giga-projects across the Gulf.
        </p>
        <div
          className="mt-10 flex items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#projects"
            className="inline-flex items-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-white/85"
          >
            View my work
          </a>
          <a
            href="mailto:info@antoinedebes.com"
            className="inline-flex items-center rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:border-gray-500 dark:border-white/25 dark:text-white dark:hover:border-white/50"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
