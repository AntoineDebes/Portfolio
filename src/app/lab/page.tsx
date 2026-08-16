import type { Metadata } from "next";
import SubpageHeader from "@/components/SubpageHeader";
import InpDemo from "@/components/InpDemo";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Small interactive experiments about how the web performs — feel the metrics instead of reading about them.",
  alternates: { canonical: "/lab/" },
};

export default function LabPage() {
  return (
    <div className="mx-auto min-h-svh max-w-3xl px-6 py-14">
      <SubpageHeader />
      <main id="content">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lab
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-700 dark:text-white/70">
          Reading about performance metrics is one thing; feeling them is
          better. Small, self-contained experiments — more to come.
        </p>

        <h2 className="mt-12 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          What does a slow INP feel like?
        </h2>
        <p className="mt-2 mb-6 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-white/65">
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
