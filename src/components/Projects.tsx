import React from "react";

type Project = {
  title: string;
  description?: string;
  href?: string;
  previewSrc?: string;
};

type ProjectsProps = {
  items?: Project[];
};

const demoItems: Project[] = [
  {
    title: "Alahli Bank (SNB)",
    description:
      "Sitecore headless platform built with Next.js for Saudi National Bank — component architecture, multi-market delivery, and performance tuning.",
    href: "https://alahli.com",
    previewSrc: "/alahli.webp",
  },
  {
    title: "First Abu Dhabi Bank",
    description:
      "Next.js + Sitecore JSS headless platform for the UAE's largest bank — design-system components, build pipeline, and Core Web Vitals work.",
    href: "https://firstabudhabi.com",
    previewSrc: "/fabbank.webp",
  },
  {
    title: "New Murabba",
    description:
      "Experimentation platform for the Riyadh giga-project — Optimizely A/B framework, feature flags, and metrics instrumentation.",
    href: "https://newmurabba.com",
    previewSrc: "/new-murabba.webp",
  },
  {
    title: "Aldar",
    description:
      "Sitecore headless frontend for Abu Dhabi's largest real-estate developer — component library and performance optimization.",
    href: "https://aldar.com",
    previewSrc: "/aldar.webp",
  },
  {
    title: "Alat",
    description:
      "Payload CMS platform with a custom theme, bespoke integrations, and a performance-first frontend.",
    href: "https://alat.com",
    previewSrc: "/alat.webp",
  },
  {
    title: "Expo 2030 Riyadh",
    description:
      "WordPress platform with a custom theme and integrations for Saudi Arabia's Expo 2030 bid.",
    href: "https://www.expo2030riyadh.sa",
    previewSrc: "/expo.webp",
  },
];

function ProjectCard({ title, description, href, previewSrc }: Project) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
    >
      {previewSrc ? (
        <span className="block aspect-video overflow-hidden border-b border-gray-100 dark:border-white/10">
          <img
            src={previewSrc}
            alt={`${title} — website screenshot`}
            width={800}
            height={450}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </span>
      ) : null}
      <span className="flex flex-1 flex-col p-5">
        <span className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
          <svg
            aria-hidden="true"
            className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M9 7h8v8"
            />
          </svg>
        </span>
        {description ? (
          <span className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/70">
            {description}
          </span>
        ) : null}
      </span>
    </a>
  );
}

export default function Projects({ items = demoItems }: ProjectsProps) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item, idx) => (
        <ProjectCard key={`${item.title}-${idx}`} {...item} />
      ))}
    </div>
  );
}
