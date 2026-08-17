"use client";
import React, { useState } from "react";

// Blocks the main thread for a chosen duration on click (keyboard activation
// included), then reports how long the interaction took from input to the
// next painted frame — the same window INP measures.
export default function InpDemo() {
  const [blockMs, setBlockMs] = useState(200);
  const [result, setResult] = useState<{
    requested: number;
    measured: number;
  } | null>(null);
  const [running, setRunning] = useState(false);

  const run = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRunning(true);
    const handlerStart = performance.now();
    // Trust the event timestamp only when it's sane (some synthetic events
    // report 0); otherwise measure from handler entry.
    const eventTime =
      e.timeStamp > 0 && e.timeStamp <= handlerStart
        ? e.timeStamp
        : handlerStart;
    // Synchronous main-thread block — the thing INP punishes.
    while (performance.now() - handlerStart < blockMs) {
      // busy-wait
    }
    // Two nested rAFs ≈ the next frame actually presented after handling.
    let settled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (settled) return;
        settled = true;
        const measured = performance.now() - eventTime;
        setResult({ requested: blockMs, measured: Math.round(measured) });
        setRunning(false);
      });
    });
    // rAF never fires in hidden tabs — don't leave the button stuck if the
    // user switches away mid-interaction.
    setTimeout(() => {
      if (settled) return;
      settled = true;
      setRunning(false);
    }, 2000);
  };

  const rating =
    result === null
      ? null
      : result.measured <= 200
        ? { label: "good", cls: "text-emerald-700 dark:text-emerald-400" }
        : result.measured <= 500
          ? { label: "needs improvement", cls: "text-amber-700 dark:text-amber-400" }
          : { label: "poor", cls: "text-red-700 dark:text-red-400" };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <fieldset>
        <legend className="text-base font-semibold text-gray-900 dark:text-white">
          1 · Choose how much main-thread work the click will do
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[50, 200, 500, 1000].map((ms) => (
            <label
              key={ms}
              className={`cursor-pointer rounded-md border px-3 py-2 font-mono text-base transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-emerald-500 ${
                blockMs === ms
                  ? "border-emerald-600 bg-emerald-600/10 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-300"
                  : "border-gray-300 text-gray-700 hover:border-gray-500 dark:border-white/15 dark:text-white/85 dark:hover:border-white/40"
              }`}
            >
              <input
                type="radio"
                name="blockMs"
                value={ms}
                checked={blockMs === ms}
                onChange={() => setBlockMs(ms)}
                className="sr-only"
              />
              {ms} ms
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
        2 · Click and <em>feel</em> the number
      </p>
      <button
        type="button"
        onClick={run}
        disabled={running}
        className="mt-3 inline-flex items-center rounded-md bg-gray-900 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
      >
        {running ? "Blocking the main thread…" : "Click me"}
      </button>

      <div aria-live="polite" className="mt-5 min-h-14">
        {result && rating && (
          <div className="rounded-md bg-gray-50 p-4 font-mono text-base dark:bg-white/5">
            <p className="text-gray-700 dark:text-white/85">
              requested block:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {result.requested} ms
              </span>
            </p>
            <p className="mt-1 text-gray-700 dark:text-white/85">
              input → next painted frame:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {result.measured} ms
              </span>{" "}
              <span className={`font-semibold ${rating.cls}`}>
                ({rating.label})
              </span>
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-white/60">
        INP thresholds: good ≤ 200 ms · needs improvement ≤ 500 ms · poor &gt;
        500 ms. Notice the measured number is always a bit higher than the
        requested block — input delay and presentation time are part of the
        interaction too, which is exactly why INP catches problems that
        handler-timing alone misses.
      </p>
    </div>
  );
}
