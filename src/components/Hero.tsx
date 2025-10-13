"use client";
import React, { useEffect, useState } from "react";
import LetterGlitch from "@/components/LetterGlitch";
import CircularText from "@/components/CircularText";

type HeroProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
};

export default function Hero({
  title = "Hi, I’m Your Name",
  subtitle = "Frontend Developer • UI Engineer • 3D Enthusiast",
  ctaText = "View my work",
  onCtaClick,
}: HeroProps) {
  const [dimmed, setDimmed] = useState(false);

  useEffect(() => {
    setDimmed(true);
  }, []);
  return (
    <section className="relative min-h-svh h-svh w-full overflow-hidden bg-gray-50 dark:bg-black">
      <LetterGlitch
        className="absolute inset-0"
        glitchSpeed={30}
        smooth
        outerVignette
      />
      {/* Overlay only in dark mode */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-out ${
          dimmed
            ? "opacity-0 dark:opacity-100 bg-black/20"
            : "opacity-0 dark:opacity-100 bg-black"
        }`}
        aria-hidden="true"
      />
      {/* Bottom fade overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-black"
        aria-hidden="true"
      />

      {/* Profile Container - Absolute positioned */}
      <div className="absolute inset-x-0 z-20 flex justify-center top-[50%] translate-y-[-50%]">
        <div className="relative">
          {/* Fading black background */}
          <div className="absolute inset-0 -z-10 rounded-full bg-black/90 dark:bg-black/100 blur-3xl scale-150"></div>

          <div className="text-center px-6 py-4">
            {/* Profile Image with Circular Text */}
            <div
              className="mb-4 opacity-0 animate-fade-in relative inline-block"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                {/* Circular Text Border */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircularText
                    text="• FULL STACK DEVELOPER • WEB DESIGNER • CREATIVE CODER "
                    spinDuration={20}
                    onHover="speedUp"
                    className="!w-[160px] !h-[160px] md:!w-[160px] md:!h-[160px]"
                  />
                </div>

                {/* Profile Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full overflow-hidden w-24 h-24 md:w-28 md:h-28 shadow-lg">
                    <img
                      src="/new-profile-pic.webp"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description under profile */}
            <p
              className="text-sm md:text-base text-white/90 max-w-xs mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Full-stack developer skilled in Three.js, creating engaging,
              high-performance, and visually dynamic web experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid h-full place-items-center px-6">
        <div className="text-center max-w-3xl">
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white opacity-0 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {title}
          </h1>
          <p
            className="mt-4 text-base md:text-lg text-gray-700 dark:text-white/90 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {subtitle}
          </p>
          <div
            className="mt-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center rounded-md bg-gray-900/10 dark:bg-white/20 px-5 py-2.5 text-sm font-medium text-gray-900 dark:text-white backdrop-blur transition hover:bg-gray-900/20 dark:hover:bg-white/30 border border-gray-900/20 dark:border-white/30"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
