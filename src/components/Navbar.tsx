import React from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

type NavbarProps = {
  name?: string;
};

export default function Navbar({ name = "Antoine Debes" }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#top"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {name}
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </a>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
