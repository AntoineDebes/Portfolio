"use client";
import React, { useEffect, useState } from "react";

const items = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Selected Work" },
  { id: "writing", label: "Writing" },
];

export default function ScrollSpyNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }
        let best = "";
        let bestRatio = 0;
        for (const { id } of items) {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-15% 0px -35% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Section navigation" className="hidden lg:block">
      <ul className="mt-14 space-y-1">
        {items.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-4 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-200 ${
                    isActive
                      ? "w-14 bg-emerald-600 dark:bg-emerald-400"
                      : "w-7 bg-gray-300 group-hover:w-14 group-hover:bg-gray-500 dark:bg-white/25 dark:group-hover:bg-white/60"
                  }`}
                />
                <span
                  className={`text-[13px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 group-hover:text-gray-900 dark:text-white/55 dark:group-hover:text-white"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
