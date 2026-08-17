"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const GA_ID = "G-CDWZ7PNW1Z";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Analytics 4, injected by hand rather than via next/script.
//
// next/script's afterInteractive strategy emits a <link rel="preload"> for
// gtag.js into the static HTML, which makes a ~90 kB third-party script
// compete for bandwidth during the initial load. Injecting it ourselves after
// hydration keeps the served HTML free of any third-party reference — the
// perf budget in CI asserts exactly that — while still starting analytics
// early enough to count short visits.
//
// Route changes are reported manually: this is a client-navigated App Router
// site, so gtag's automatic page_view only fires on the first load.
export default function Analytics() {
  const pathname = usePathname();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Skip the first run: the config call above already reports that page view.
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
