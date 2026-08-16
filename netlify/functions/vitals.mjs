// Receives anonymous Core Web Vitals beacons from the site (see src/components/VitalsReporter.tsx).
// Metrics land in the Netlify function logs; no cookies, no PII, no storage.
export default async (req) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });
  try {
    const body = await req.text();
    const data = JSON.parse(body);
    // One structured log line per beacon — query these in the Netlify UI.
    console.log(
      JSON.stringify({
        t: Date.now(),
        name: data.name,
        value: Math.round(data.value * 1000) / 1000,
        rating: data.rating,
        path: (data.path || "").slice(0, 100),
        navType: data.navigationType,
      })
    );
  } catch {
    // Malformed beacon — ignore.
  }
  return new Response(null, { status: 204 });
};

export const config = { path: "/api/vitals" };
