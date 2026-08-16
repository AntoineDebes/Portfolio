import type { Metadata, Viewport } from "next";
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
    // Largest first: Google reads the icons it finds in the home page head
    // and wants a square icon comfortably larger than 48px.
    icon: [
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  appleWebApp: {
    title: "Antoine Debes",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d0e" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://antoinedebes.com/#website",
  url: "https://antoinedebes.com",
  name: "Antoine Debes",
  alternateName: "antoinedebes.com",
  description,
  author: { "@id": "https://antoinedebes.com/#person" },
  publisher: { "@id": "https://antoinedebes.com/#person" },
  inLanguage: "en",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://antoinedebes.com/#person",
  name: "Antoine Debes",
  givenName: "Antoine",
  familyName: "Debes",
  jobTitle: "Principal Software Engineer",
  description,
  url: "https://antoinedebes.com",
  image: "https://antoinedebes.com/new-profile-pic.webp",
  worksFor: {
    "@type": "Organization",
    name: "VML",
    url: "https://www.vml.com",
  },
  knowsAbout: [
    "Web Performance",
    "Core Web Vitals",
    "Largest Contentful Paint",
    "Interaction to Next Paint",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Architecture",
    "Sitecore Headless",
  ],
  email: "mailto:info@antoinedebes.com",
  sameAs: [
    "https://github.com/AntoineDebes",
    "https://www.linkedin.com/in/antoine-debes/",
  ],
};

// Deliberately no ProfilePage node: it only powers the Discussions/Forums
// rich result, so on a portfolio it adds markup-vs-page-type mismatch risk
// for zero SERP upside. Person + WebSite carry the entity signals.

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
