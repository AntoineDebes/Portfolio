import React from "react";

type Role = {
  title: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
};

const roles: Role[] = [
  {
    title: "Principal Software Engineer",
    org: "VML",
    period: "Feb 2024 — Present",
    description:
      "Leading front-end strategy across Sitecore Headless and experimentation stacks — architecture, performance, 3D/GSAP animation direction, and AI-assisted development workflows for enterprise clients across the Gulf.",
    tags: ["Next.js", "TypeScript", "Sitecore JSS", "Web Performance"],
  },
  {
    title: "Senior Software Engineer",
    org: "Wunderman Thompson (became VML)",
    period: "Oct 2023 — Jan 2024",
    description:
      "Implemented front-end solutions in TypeScript/Next.js, optimized build and release flows, and contributed to design systems and experimentation tooling.",
    tags: ["Next.js", "TypeScript", "Design Systems"],
  },
  {
    title: "Mid-Senior Software Engineer",
    org: "Mirum Agency (became Wunderman Thompson)",
    period: "Oct 2022 — Sep 2023",
    description:
      "Built modern, responsive interfaces, introduced animation best practices with GSAP and Three.js, and streamlined team workflows with tooling and testing improvements.",
    tags: ["React", "GSAP", "Three.js"],
  },
];

export default function Timeline() {
  return (
    <div>
      <p className="mb-8 max-w-xl text-sm text-gray-600 dark:text-white/60">
        One agency, three names — Mirum became Wunderman Thompson became VML
        through successive mergers. Same team, growing scope.
      </p>
      <ol className="relative border-l border-gray-200 dark:border-white/10">
        {roles.map((role) => (
          <li key={role.period} className="tl-reveal relative mb-12 pl-8 last:mb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-emerald-600 ring-4 ring-gray-50 dark:bg-emerald-400 dark:ring-black"
            />
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {role.title}
                <span className="font-normal text-gray-600 dark:text-white/60">
                  {" "}
                  · {role.org}
                </span>
              </h3>
              <span className="shrink-0 font-mono text-xs text-gray-500 tabular-nums dark:text-white/50">
                {role.period}
              </span>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-white/70">
              {role.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
              {role.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-emerald-600/10 px-3 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
