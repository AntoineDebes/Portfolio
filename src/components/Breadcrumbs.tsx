import React from "react";

const SITE = "https://antoinedebes.com";

// BreadcrumbList is one of the few rich results a personal site can actually
// win, so every section page emits one.
export default function Breadcrumbs({ name, path }: { name: string; path: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
