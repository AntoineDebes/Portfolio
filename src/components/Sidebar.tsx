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
            src="/new-profile-pic.webp"
            alt="Antoine Debes"
            width={200}
            height={217}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-gray-50 dark:ring-offset-black"
          />
          <ThemeToggle />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Antoine Debes
        </h1>
        <h2 className="mt-2 text-xl font-medium text-gray-800 dark:text-white/85">
          Principal Software Engineer
        </h2>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-gray-600 dark:text-white/60">
          I make React apps fast — web performance &amp; frontend architecture
          for Next.js, measured in Core Web Vitals.
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
