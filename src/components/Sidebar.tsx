import React from "react";
import ScrollSpyNav from "@/components/ScrollSpyNav";
import SocialIcons from "@/components/SocialIcons";
import PerfHud from "@/components/PerfHud";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Sidebar() {
  return (
    <header className="pt-14 lg:sticky lg:top-0 lg:flex lg:h-svh lg:w-[320px] lg:shrink-0 lg:flex-col lg:justify-between lg:py-20">
      <div>
        <div className="flex items-start justify-between">
          <img
            src="/profile.webp"
            alt="Antoine Debes"
            width={256}
            height={256}
            fetchPriority="high"
            className="h-16 w-16 rounded-full object-cover ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-gray-50 dark:ring-offset-black"
          />
          <ThemeToggle />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Antoine Debes
        </h1>
        <h2 className="mt-2 text-xl font-medium text-gray-800 dark:text-white/90">
          Full-Stack Engineer
        </h2>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-gray-600 dark:text-white/75">
          I build fast web platforms end to end — Next.js, React and Node,
          measured in Core Web Vitals.
        </p>
        <ScrollSpyNav />
      </div>

      <div className="mt-10 lg:mt-0">
        <PerfHud />
        <div className="mt-6">
          <SocialIcons />
        </div>
      </div>
    </header>
  );
}
