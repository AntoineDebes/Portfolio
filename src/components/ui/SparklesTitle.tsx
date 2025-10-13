"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

type SparklesTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SparklesTitle({
  children,
  className,
}: SparklesTitleProps) {
  return (
    <div
      className={`relative inline-flex flex-col items-center ${
        className ?? ""
      }`}
    >
      <h2 className="relative z-20 text-gray-900 dark:text-white text-center">
        <span className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-white/80 bg-clip-text text-transparent break-words leading-tight">
          {children}
        </span>
      </h2>
      <div className="relative mt-4 h-12 w-[15rem] md:w-[40rem] dark:block md:block">
        {/* decorative gradients */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent blur-sm" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-40 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent blur-sm" />
        <div className="pointer-events-none absolute inset-x-40 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />

        {/* sparkles core */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />

        {/* radial mask to soften edges */}
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(200px_80px_at_top,transparent_20%,white)]" />
      </div>
    </div>
  );
}
