import type { Metadata } from "next";
import SubpageHeader from "@/components/SubpageHeader";
import InpDemo from "@/components/InpDemo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Small interactive experiments about how the web performs — feel the metrics instead of reading about them.",
  alternates: { canonical: "/lab/" },
  openGraph: {
    type: "website",
    url: "/lab/",
    title: "Lab — Antoine Debes",
    description:
      "Small interactive experiments about how the web performs — feel the metrics instead of reading about them.",
    images: [{ url: "/og/lab.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/lab.png"] },
};

export default function LabPage() {
  return (
    <div className="mx-auto min-h-svh max-w-3xl px-6 py-14">
      <Breadcrumbs name="Lab" path="/lab/" />
      <SubpageHeader />
      <main id="content">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lab
        </h1>
        <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-gray-700 dark:text-white/85">
          Reading about performance metrics is one thing; feeling them is
          better. Small, self-contained experiments — more to come.
        </p>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          What does a slow INP feel like?
        </h2>
        <p className="mt-2 mb-6 max-w-xl text-base leading-relaxed text-gray-600 dark:text-white/80">
          Interaction to Next Paint measures the time from your input to the
          next frame the browser actually paints. This demo blocks the main
          thread for a duration you choose, then measures the real gap — try
          200 ms, then try 1000 ms.
        </p>
        <InpDemo />
      </main>
    </div>
  );
}
