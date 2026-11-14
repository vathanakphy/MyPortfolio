import type { Metadata } from "next";

export const siteUrl = "https://www.vathanak.tech";

export const siteName = "Phy Vathanak | Software Engineer";
export const siteDescription =
  "Explore Phy Vathanak's portfolio, software engineering projects, technical skills, and experience.";
export const socialImage = "/web-portfolio.jpg";

export const profileLinks = [
  "https://github.com/vathanakphy",
  "https://www.linkedin.com/in/phy-vathanak/",
  "https://t.me/phyvathanak",
];

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | Phy Vathanak`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      siteName: "Phy Vathanak",
      url,
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
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
