import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VitalsReporter from "@/components/VitalsReporter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Principal Software Engineer specializing in web performance and frontend architecture — Next.js, React, Core Web Vitals. I make React apps fast.";

export const metadata: Metadata = {
  title: {
    default: "Antoine Debes — Principal Software Engineer · Web Performance",
    template: "%s · Antoine Debes",
  },
  description,
  keywords: [
    "Web Performance",
    "Core Web Vitals",
    "React",
    "Next.js",
    "Frontend Architecture",
    "Principal Software Engineer",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Antoine Debes" }],
  creator: "Antoine Debes",
  publisher: "Antoine Debes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://antoinedebes.com"),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://antoinedebes.com",
    title: "Antoine Debes — Principal Software Engineer · Web Performance",
    description,
    siteName: "Antoine Debes",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Antoine Debes — Principal Software Engineer · Web Performance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antoine Debes — Principal Software Engineer · Web Performance",
    description,
    images: ["/og.png"],
    creator: "@antoine_debes",
    site: "@antoine_debes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://antoinedebes.com/#website",
  url: "https://antoinedebes.com",
  name: "Antoine Debes",
  description,
  author: { "@id": "https://antoinedebes.com/#person" },
  inLanguage: "en",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://antoinedebes.com/#person",
  name: "Antoine Debes",
  jobTitle: "Principal Software Engineer",
  url: "https://antoinedebes.com",
  image: "https://antoinedebes.com/new-profile-pic.webp",
  worksFor: {
    "@type": "Organization",
    name: "VML",
  },
  knowsAbout: [
    "Web Performance",
    "Core Web Vitals",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Architecture",
  ],
  email: "mailto:info@antoinedebes.com",
  sameAs: [
    "https://github.com/AntoineDebes",
    "https://www.linkedin.com/in/antoine-debes/",
  ],
};

const bootScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}
console.log("%c\\u26A1 Curious how this page loads so fast?","color:#3fd68f;font-weight:bold;font-size:14px");
console.log("Open the Network tab and read along: https://antoinedebes.com/writing/how-this-site-loads-in-under-one-second/");`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* Apply the saved/system theme before first paint to avoid a flash */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 dark:bg-black dark:text-white`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <VitalsReporter />
      </body>
    </html>
  );
}
