"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import SparklesTitle from "@/components/ui/SparklesTitle";

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
};

type WorkExperienceProps = {
  items: ExperienceItem[];
};

export default function WorkExperience({ items }: WorkExperienceProps) {
  return (
    <section className="relative md:py-20 py-12 bg-gray-50 dark:bg-black transition-colors duration-300">
      <TracingBeam className="px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-10">
            <SparklesTitle>Work Experience</SparklesTitle>
          </h2>
          <div className="space-y-10">
            {items.map((item, idx) => (
              <article
                key={`${item.company}-${item.role}-${idx}`}
                className="rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 p-6 backdrop-blur transition-colors hover:bg-gray-50 dark:hover:bg-white/20 shadow-sm dark:shadow-none"
              >
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {item.role}{" "}
                    <span className="text-gray-600 dark:text-white/70">
                      @ {item.company}
                    </span>
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-white/70">
                    {item.period}
                  </span>
                </header>
                <p className="mt-3 text-gray-700 dark:text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </TracingBeam>
    </section>
  );
}

