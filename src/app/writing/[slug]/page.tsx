import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubpageHeader from "@/components/SubpageHeader";
import { posts } from "#velite";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.filter((p) => !p.draft).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && !p.draft);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.permalink },
    openGraph: {
      type: "article",
      url: post.permalink,
      title: post.title,
      description: post.description,
      siteName: "Antoine Debes",
      locale: "en_US",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["Antoine Debes"],
      images: [
        {
          url: `/og/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/og/${post.slug}.png`],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && !p.draft);
  if (!post) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      keywords: post.tags.join(", "),
      url: `https://antoinedebes.com${post.permalink}`,
      image: `https://antoinedebes.com/og/${post.slug}.png`,
      author: { "@id": "https://antoinedebes.com/#person" },
      isPartOf: { "@id": "https://antoinedebes.com/#website" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://antoinedebes.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Writing",
          item: "https://antoinedebes.com/writing/",
        },
        { "@type": "ListItem", position: 3, name: post.title },
      ],
    },
  ];

  const related = posts
    .filter((p) => !p.draft && p.slug !== post.slug)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <div className="mx-auto min-h-svh max-w-3xl px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />
      <main id="content">
        <article>
          <header>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 font-mono text-[13px] text-gray-500 tabular-nums dark:text-white/65">
              {formatDate(post.date)} · {post.metadata.readingTime} min read ·{" "}
              {post.tags.join(" · ")}
            </p>
          </header>
          <div
            className="prose prose-lg prose-zinc mt-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-emerald-700 prose-a:decoration-emerald-600/40 hover:prose-a:decoration-emerald-600 dark:prose-a:text-emerald-400 prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
        <footer className="mt-14 border-t border-gray-200 pt-8 dark:border-white/10">
          {related.length > 0 && (
            <nav aria-label="More writing" className="mb-10">
              <h2 className="text-[13px] font-semibold uppercase tracking-widest text-gray-500 dark:text-white/70">
                More writing
              </h2>
              <ul className="mt-4 space-y-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.permalink}
                      className="text-base font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <p className="text-base text-gray-600 dark:text-white/80">
            Thoughts, corrections, or a waterfall you want a second opinion on?{" "}
            <a
              href="mailto:info@antoinedebes.com"
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Email me
            </a>{" "}
            — or subscribe via{" "}
            <a
              href="/feed.xml"
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              RSS
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}
