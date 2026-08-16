import React from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function SubpageHeader() {
  return (
    <header className="mb-12 flex items-center justify-between">
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-gray-900 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
      >
        ← Antoine Debes<span className="text-emerald-600 dark:text-emerald-400">.</span>
      </Link>
      <ThemeToggle />
    </header>
  );
}
