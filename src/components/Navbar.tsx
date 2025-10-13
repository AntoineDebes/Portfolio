"use client";
import React from "react";
import GradientText from "@/components/GradientText";
import ThemeToggle from "@/components/ui/ThemeToggle";

type NavbarProps = {
  name?: string;
};

export default function Navbar({ name = "Antoine" }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/5 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Name with gradient */}
          <div className="flex items-center">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-2xl font-bold"
            >
              {name}
            </GradientText>
          </div>

          {/* Right side - Theme toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
