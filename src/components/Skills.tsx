import React from "react";

const groups: { label: string; items: string[] }[] = [
  {
    label: "Core",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js"],
  },
  {
    label: "Styling & Motion",
    items: ["Tailwind CSS", "SASS", "GSAP", "Three.js"],
  },
  {
    label: "Platforms & CMS",
    items: [
      "Sitecore Headless",
      "Payload CMS",
      "WordPress",
      "Optimizely",
      "GraphQL",
    ],
  },
  {
    label: "Tooling & Infra",
    items: ["Docker", "AWS", "CI/CD", "Git", "Figma"],
  },
];

export default function Skills() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.label}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {group.label}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
