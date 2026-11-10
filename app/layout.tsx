import type { Metadata } from "next";
import type React from "react";
import SiteShell from "../src/components/layout/SiteShell";
import "../src/index.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nak-dev.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Phy Vathanak | Software Engineering Portfolio",
    template: "%s | Phy Vathanak",
  },
  description:
    "Portfolio of Phy Vathanak, a software engineering student building web and backend applications.",
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
  alternates: { canonical: "/" },
  icons: {
    icon: "/web-portfolio.jpg",
    shortcut: "/web-portfolio.jpg",
  },
  openGraph: {
    title: "Phy Vathanak | Software Engineering Portfolio",
    description:
      "Portfolio of Phy Vathanak, a software engineering student building web and backend applications.",
    type: "website",
    images: [
      {
        url: "/web-portfolio.jpg",
        alt: "Phy Vathanak software engineering portfolio",
      },
    ],
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
