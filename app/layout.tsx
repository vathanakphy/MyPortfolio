import type { Metadata } from "next";
import type React from "react";
import SiteShell from "../src/components/layout/SiteShell";
import "../src/index.css";
import { siteDescription, siteName, siteUrl, socialImage } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Phy Vathanak",
  },
  description: siteDescription,
  keywords: [
    "Phy Vathanak",
    "CADT student",
    "software developer",
    "software engineering student",
    "backend developer Cambodia",
    "web developer Cambodia",
    "machine learning projects",
    "AI software projects",
    "ChromaDB",
    "RAG",
    "YOLO",
  ],
  authors: [{ name: "Phy Vathanak" }],
  verification: {
    google: "6_rLIXGLYoCTHyACZpchBD7-nvLvWfQp6pkQbF2RNbU",
  },
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    siteName: "Phy Vathanak",
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: socialImage,
        width: 1022,
        height: 980,
        type: "image/jpeg",
        alt: "Phy Vathanak software engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
