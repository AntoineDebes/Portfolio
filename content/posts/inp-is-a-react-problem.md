---
title: "INP Is a React Problem (and React Has the Tools to Fix It)"
slug: inp-is-a-react-problem
date: 2026-08-16
description: "Interaction to Next Paint punishes exactly the thing React does by design: large synchronous renders on the main thread. Where the milliseconds go, how to see them in a trace, and the fix ladder from memoization to useTransition to leaving React out of it."
tags: [web-performance, react, inp]
draft: false
---

Since Interaction to Next Paint became a Core Web Vital, a pattern shows up in field data across the industry: sites pass LCP comfortably and fail INP — and the failing sites are disproportionately React apps. That's not an accident of popularity. INP punishes exactly the thing React does by design: **large synchronous renders on the main thread, triggered by state updates, in response to input.**

This isn't a React hit piece. It's a map of where the milliseconds go and the specific tools — most of them shipped by React itself — that get them back.

## What INP actually measures

INP takes (roughly) the worst interaction of a user's visit and measures **input to next painted frame**, in three phases:

1. **Input delay** — the event happened, but the main thread was busy finishing something else. Your handler hasn't even started.
2. **Processing** — your event handlers run. In React: the state update, the re-render of every affected component, the reconciliation, the commit.
3. **Presentation delay** — style, layout, paint, composite for the resulting frame.

Under 200 ms is good; over 500 ms is poor. If you want to *feel* the thresholds instead of reading them, I built a [30-second demo on this site's lab page](/lab/) — it blocks the main thread for a duration you choose and shows you the measured gap. 200 ms feels like a hesitation. 1000 ms feels broken.

The trap in the definition: **the click handler you wrote is only phase 2.** Profile just your handler and you'll miss the input delay caused by that analytics script chewing the thread, and the 300 ms render your `setState` scheduled.

## Why React concentrates the damage

React's model is: state changed → re-render the affected subtree → commit, **synchronously by default**. Three properties of real codebases turn that into long tasks:

- **Renders cascade wider than intended.** A context value changes and every consumer re-renders; a parent re-creates a callback and memoized children bail out of bailing out. The render tree is bigger than the mental model of it.
- **The expensive path is the common path.** A controlled input re-renders on every keystroke. Wire it to a 2,000-row filtered list without care, and typing becomes fifteen 250 ms tasks in a row — INP samples every one of them.
- **It all happens at input time.** Server components, SSR, and streaming moved *loading* work off the client, but interactions are still, definitionally, client work. INP is the metric your architecture migration didn't fix.

## Reading the trace

One recorded Performance-panel trace of a slow click tells you which phase to attack. The signature of each:

- A long yellow task *before* your handler's flame: **input delay** — something else (hydration, a third-party, a previous render) was hogging the thread. Your handler is innocent; the page's background work is guilty.
- A wide `onClick` frame with your code in it: **processing, your logic** — you're doing real computation in the handler. Move it off the interaction (worker, deferral, memoized ahead of time).
- A wide "Commit" / render flame *after* your code returns: **processing, React's render** — the state update redrew too much. This is the usual suspect, and the whole next section.
- Purple layout blocks after commit: **presentation** — you invalidated layout for thousands of nodes, or wrote layout-triggering styles from JS.

## The fix ladder

Ordered by effort-to-impact; stop at the first rung that gets you under 200 ms.

**1. Render less.** Push state down to the smallest component that needs it; split contexts so consumers subscribe to what they actually read; `memo` the expensive subtrees the update shouldn't touch. Boring, mechanical, and it's rung one because it's usually the whole fix.

**2. Split urgent from deferrable.** This is the rung React built specifically for INP:

```tsx
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
// input renders with `query` — urgent, every keystroke
// the 2,000-row list renders with `deferredQuery` — interruptible, lags harmlessly
```

`useTransition` is the same idea for updates you trigger (tab switches, filters): the click paints *now*, the heavy new tree renders concurrently and can be interrupted by the next input. This is concurrent rendering doing exactly what it was designed for — the frame after input stays cheap, which is the frame INP measures.

**3. Yield inside long work.** For genuinely long computation that must run on interaction, break it up so input can interleave: `scheduler.yield()` (or a `setTimeout(0)` chunk loop where unsupported) between batches. A 600 ms task becomes twelve 50 ms tasks, and the user's next click slots in between.

**4. Leave the main thread.** Search indexes, parsing, diffing — `Worker` + transferable data. The main thread's only job during an interaction is painting the response to it.

**5. Leave React out of it.** Hover states, open/close toggles, animations: CSS handles them at compositor priority with zero render cycles. The fastest re-render is the one that never happens — sometimes the senior fix is admitting the interaction never needed state.

## Measure like you mean it

Lab clicks on a dev machine won't reproduce what a mid-range Android feels. Two habits close the gap:

- **4–6× CPU throttling** in the Performance panel for every interaction you profile. This site's [lab demo](/lab/) at 200 ms feels fine unthrottled — throttle and watch it cross into "poor".
- **Field attribution.** The `web-vitals` library's attribution build tells you *which element* and *which phase* produced each bad INP sample in production. One week of field attribution beats a month of guessing which interaction to fix. (This site beacons its INP field data — the plain build for now, attribution upgrade queued — [details on /perf](/perf/).)

The one-sentence version: INP is where React's costs concentrate, React 18+ shipped the escape hatches, and the trace tells you which one you need. The rest is discipline.
