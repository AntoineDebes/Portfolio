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
          into the background. Solid also avoids the blur-behind repaint.
          (Avoid writing utility-shaped names in comments — Tailwind scans
          this file and would emit the matching class as dead CSS.) */}
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
      {/* Glow drawn as a radial gradient rather than a blurred box: a fixed
          element with filter: blur() stays composited for the life of the page
          and has to be re-rasterised as you scroll, which is a known trigger
          for text repaint artefacts on some GPU/driver combinations. A
          gradient is soft by construction and costs no filter pass. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 left-1/4 -z-10 h-[440px] w-[700px] max-w-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent)] dark:bg-[radial-gradient(closest-side,rgba(52,211,153,0.09),transparent)]"
      />

      <div className="mx-auto min-h-svh max-w-6xl px-6 md:px-10 lg:flex lg:gap-16">
        <Sidebar />

        <main id="content" className="flex-1 pb-24 lg:py-20">
          <Section id="about" title="About">
            <div className="max-w-xl space-y-4 text-[17px] leading-relaxed text-gray-700 dark:text-white/85">
              <p>
                I&apos;m a full-stack engineer — currently Principal
                Front-End Engineer at{" "}
                <a
                  href="https://www.vml.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 underline decoration-emerald-600/40 underline-offset-4 hover:decoration-emerald-600 dark:text-white dark:decoration-emerald-400/40 dark:hover:decoration-emerald-400"
                >
                  VML
                </a>
                 — where I lead the engineering of digital platforms
                for enterprise clients in banking, real estate, and
                national-scale programs: Saudi National Bank, First Abu Dhabi
                Bank, Aldar, New Murabba, and Expo 2030 Riyadh among them.
              </p>
              <p>
                My specialty is web performance. I treat speed as an
                engineering discipline — designed in from the start, measured
                in production, and enforced automatically — because on the
                modern web, performance is product quality. This site is built
                to that standard, and its numbers are public.
              </p>
              <p className="text-base text-gray-600 dark:text-white/70">
                <span className="font-semibold uppercase tracking-wider text-gray-500 dark:text-white/70">
                  Now:
                </span>{" "}
                writing about performance engineering, with this site as
                the working case study —{" "}
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
            <p className="mt-3 max-w-md text-base leading-relaxed text-gray-600 dark:text-white/80">
              Whether it&apos;s a platform to build, a performance problem
              to solve, or a conversation worth having — my inbox is open.
            </p>
            <div className="mt-5">
              <CopyEmailButton />
            </div>
            <p className="mt-12 max-w-md text-sm leading-relaxed text-gray-500 dark:text-white/70">
              Designed &amp; built by Antoine Debes. Next.js + Tailwind,
              statically exported, served from Netlify&apos;s CDN. Telemetry is
              a ~3 kB first-party Web Vitals beacon plus Google Analytics,
              loaded after the page is interactive.{" "}
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
