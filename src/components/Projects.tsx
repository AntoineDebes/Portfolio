"use client";
import React from "react";
import SparklesTitle from "@/components/ui/SparklesTitle";
import ElectricBorderCard from "@/components/ui/ElectricBorderCard";

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

export default function Projects({ items = demoItems }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="relative scroll-mt-16 md:py-20 py-12 bg-gray-50 dark:bg-black transition-colors duration-300"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-3xl font-semibold text-gray-900 dark:text-white">
          <SparklesTitle>Projects</SparklesTitle>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {items.map((item, idx) => (
            <ElectricBorderCard
              key={`${item.title}-${idx}`}
              title={item.title}
              description={item.description}
              href={item.href}
              previewSrc={item.previewSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
