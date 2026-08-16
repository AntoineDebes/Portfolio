import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";

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
  title: "Antoine Debes — Principal Software Engineer · Web Performance",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar name="Antoine Debes" />
        <SocialLinks />
        {children}
      </body>
    </html>
  );
}
