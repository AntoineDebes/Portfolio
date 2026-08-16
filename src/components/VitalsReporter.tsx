"use client";
import { useEffect } from "react";

// Reports anonymous Core Web Vitals (LCP / INP / CLS) to a first-party endpoint.
// ~3 kB of JS, no cookies, no identifiers — see /perf for why and what's collected.
export default function VitalsReporter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    let cancelled = false;
    import("web-vitals").then(({ onLCP, onINP, onCLS }) => {
      if (cancelled) return;
      const report = (metric: {
        name: string;
        value: number;
        rating: string;
        navigationType: string;
      }) => {
        const body = JSON.stringify({
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          navigationType: metric.navigationType,
          path: location.pathname,
        });
        // Absolute URL so beacons also arrive from mirror deployments
        // (the /api/vitals function only exists on the Netlify host).
        navigator.sendBeacon?.("https://antoinedebes.com/api/vitals", body);
      };
      onLCP(report);
      onINP(report);
      onCLS(report);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
