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
    title: "Alahli Bank",
    description:
      "sitecore headless website with DX tooling, testing, and CI-ready setup.",
    href: "https://alahli.com",
    previewSrc: "/alahli.png",
  },
  {
    title: "First Abu Dhabi Bank",
    description:
      "Next.js + Sitecore headless starter with DX tooling, testing, and CI-ready setup.",
    href: "https://firstabudhabi.com",
    previewSrc: "/fabbank.png",
  },
  {
    title: "New Murabba",
    description:
      "Optimizely-powered A/B framework with metrics hooks, feature flags, and guardrails.",
    href: "https://newmurabba.com",
    previewSrc: "/new-murabba.png",
  },
  {
    title: "Aldar",
    description:
      "sitecore headless website with DX tooling, testing, and CI-ready setup.",
    href: "https://aldar.com",
    previewSrc: "/aldar.png",
  },
  {
    title: "Alat",
    description:
      "Payload CMS-powered website with custom theme and integration.",
    href: "https://alat.com",
    previewSrc: "/alat.png",
  },
  {
    title: "Expo 2030 Riyadh",
    description: "Wordpress website with custom theme and integration.",
    href: "https://www.expo2030riyadh.sa",
    previewSrc: "/expo.png",
  },
];

export default function Projects({ items = demoItems }: ProjectsProps) {
  return (
    <section className="relative py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
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
