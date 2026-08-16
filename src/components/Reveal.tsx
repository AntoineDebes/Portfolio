"use client";
import { useEffect } from "react";

// Reveals [data-reveal] elements once, as they first scroll into view.
//
// Elements start visible in the HTML. Only those still below the fold when
// this runs get the pending (hidden) state, so there is never a flash of
// content disappearing, and if this script never runs the page is simply
// static — nothing can be left permanently invisible.
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!els.length) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const show = (el: HTMLElement) => {
      el.classList.add("reveal-in");
      el.classList.remove("reveal-pending");
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    const fold = window.innerHeight * 0.9;
    const pending: HTMLElement[] = [];
    for (const el of els) {
      // Already on screen: leave it exactly as rendered.
      if (el.getBoundingClientRect().top < fold) continue;
      el.classList.add("reveal-pending");
      observer.observe(el);
      pending.push(el);
    }

    // Safety net: if observer callbacks never arrive (background tab at load,
    // restored session), reveal anything that is actually on screen so no
    // content can be stranded invisible.
    const sweep = () => {
      for (const el of pending) {
        if (!el.classList.contains("reveal-pending")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
      }
    };
    const timer = window.setTimeout(sweep, 1500);
    document.addEventListener("visibilitychange", sweep);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", sweep);
    };
  }, []);

  return null;
}
