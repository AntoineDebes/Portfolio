import React from "react";

const groups: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "SASS"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "C# / .NET", "PHP", "MySQL", "GraphQL"],
  },
  {
    label: "Platforms & CMS",
    items: ["Sitecore Headless", "Payload CMS", "WordPress", "Optimizely"],
  },
  {
    label: "Motion & 3D",
    items: ["GSAP", "Three.js"],
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
          <h3 className="text-[13px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {group.label}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-[15px] text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/90"
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
