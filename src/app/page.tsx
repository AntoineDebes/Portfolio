import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WritingSection from "@/components/WritingSection";
import CopyEmailButton from "@/components/CopyEmailButton";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-20 first:pt-14 lg:pt-24 lg:first:pt-0">
      {/* Opaque, not translucent: a semi-transparent sticky bar lets the
          content ghost through it as you scroll, which reads as text fading
          into the background. Solid also avoids backdrop-filter's cost. */}
      <h2 className="sticky top-0 z-20 -mx-6 mb-8 bg-gray-50 px-6 py-4 text-[15px] font-bold uppercase tracking-widest text-emerald-700 dark:bg-black dark:text-emerald-400 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 dark:lg:bg-transparent">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* Ambient background: static dot grid + soft emerald glow (CSS only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(17,24,28,0.08)_1px,transparent_0)] bg-[size:28px_28px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-32 left-1/4 -z-10 h-[380px] w-[620px] max-w-full rounded-full bg-emerald-500/[0.07] blur-3xl dark:bg-emerald-400/[0.06]"
      />

      <div className="mx-auto min-h-svh max-w-6xl px-6 md:px-10 lg:flex lg:gap-16">
        <Sidebar />

        <main id="content" className="flex-1 pb-24 lg:py-20">
          <Section id="about" title="About">
            <div className="max-w-xl space-y-4 text-[17px] leading-relaxed text-gray-700 dark:text-white/75">
              <p>
                I&apos;m a Principal Software Engineer at{" "}
                <a
                  href="https://www.vml.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 underline decoration-emerald-600/40 underline-offset-4 hover:decoration-emerald-600 dark:text-white dark:decoration-emerald-400/40 dark:hover:decoration-emerald-400"
                >
                  VML
                </a>
                , where I lead front-end work on Sitecore headless platforms
                and experimentation stacks for banks and giga-projects across
                the Gulf — Saudi National Bank, First Abu Dhabi Bank, Aldar,
                New Murabba, and the Expo 2030 Riyadh bid among them.
              </p>
              <p>
                My specialty is web performance: making React and Next.js
                applications fast, and keeping them that way with budgets that
                fail the build instead of guidelines that die in a wiki. I care
                about the parts of engineering you can measure — Core Web
                Vitals, bundle bytes, main-thread time — and about the craft
                you can feel in the details.
              </p>
              <p className="text-base text-gray-600 dark:text-white/55">
                <span className="font-semibold uppercase tracking-wider text-gray-500 dark:text-white/55">
                  Now:
                </span>{" "}
                rebuilding this site in public as its own performance case
                study, and writing about what that surfaces —{" "}
                <Link
                  href="/writing/how-this-site-loads-in-under-one-second/"
                  className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  starting here
                </Link>
                .
              </p>
            </div>
          </Section>

          <Section id="experience" title="Experience">
            <Timeline />
          </Section>

          <Section id="projects" title="Selected Work">
            <Projects />
          </Section>

          <Section id="stack" title="Stack">
            <Skills />
          </Section>

          <Section id="writing" title="Writing">
            <WritingSection />
          </Section>

          <footer className="mt-24 border-t border-gray-200 pt-10 dark:border-white/10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Get in touch
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-gray-600 dark:text-white/65">
              Performance audit, a slow app that needs a diagnosis, or just
              want to talk shop about Core Web Vitals — my inbox is open.
            </p>
            <div className="mt-5">
              <CopyEmailButton />
            </div>
            <p className="mt-12 max-w-md text-sm leading-relaxed text-gray-500 dark:text-white/55">
              Designed &amp; built by Antoine Debes. Next.js + Tailwind,
              statically exported, served from Netlify&apos;s CDN. No cookies,
              no trackers, no consent banner — just ~3 kB of first-party Web
              Vitals telemetry.{" "}
              <Link
                href="/perf/"
                className="text-emerald-700 hover:underline dark:text-emerald-400"
              >
                See how it performs →
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
