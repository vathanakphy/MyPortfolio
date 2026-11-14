import type { Metadata } from "next";
import HeroSection from "../src/components/sections/HeroSection";
import ExperienceSection from "../src/components/sections/ExperienceSection";
import AboutSection from "../src/components/sections/AboutSection";
import FeaturedProjectsSection from "../src/components/sections/FeaturedProjectsSection";
import EducationSection from "../src/components/sections/EducationSection";
import VolunteerSection from "../src/components/sections/VolunteerSection";
import ContactSection from "../src/components/sections/ContactSection";
import { absoluteUrl, profileLinks, safeJsonLd, siteDescription, siteName } from "./seo";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  alternates: { canonical: "/" },
  keywords: [
    "Phy Vathanak",
    "CADT student",
    "software developer",
    "software engineering portfolio",
    "backend developer",
    "machine learning and AI projects",
  ],
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: "Phy Vathanak",
        description: siteDescription,
        publisher: { "@id": `${absoluteUrl("/")}#person` },
      },
      {
        "@type": "Person",
        "@id": `${absoluteUrl("/")}#person`,
        name: "Phy Vathanak",
        url: absoluteUrl("/"),
        jobTitle: "Software Engineer",
        description: "Computer Science student and software developer.",
        sameAs: profileLinks,
        knowsAbout: ["Software Development", "Backend Development", "Machine Learning", "Artificial Intelligence", "Web Application Development"],
      },
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl("/")}#profile`,
        url: absoluteUrl("/"),
        name: siteName,
        description: siteDescription,
        mainEntity: { "@id": `${absoluteUrl("/")}#person` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <div className="bg-white">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <FeaturedProjectsSection />
        <EducationSection />
        <VolunteerSection />
        <ContactSection />
      </div>
    </>
  );
}
