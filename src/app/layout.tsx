import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antoine Debes - Full Stack Developer",
  description:
    "Full-stack developer skilled in Three.js, creating engaging, high-performance, and visually dynamic web experiences.",
  keywords: [
    "Full Stack Developer",
    "Three.js",
    "React",
    "Next.js",
    "Web Development",
    "Frontend",
    "Backend",
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
    title: "Antoine Debes - Full Stack Developer",
    description:
      "Full-stack developer skilled in Three.js, creating engaging, high-performance, and visually dynamic web experiences.",
    siteName: "Antoine Debes Portfolio",
    images: [
      {
        url: "/new-profile-pic.webp",
        width: 1200,
        height: 630,
        alt: "Antoine Debes - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antoine Debes - Full Stack Developer",
    description:
      "Full-stack developer skilled in Three.js, creating engaging, high-performance, and visually dynamic web experiences.",
    images: ["/new-profile-pic.webp"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar name="Antoine Debes" />
        {children}
      </body>
    </html>
  );
}
