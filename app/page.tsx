import type { Metadata } from "next";
import HeroSection from "../src/components/sections/HeroSection";
import ExperienceSection from "../src/components/sections/ExperienceSection";
import AboutSection from "../src/components/sections/AboutSection";
import FeaturedProjectsSection from "../src/components/sections/FeaturedProjectsSection";
import EducationSection from "../src/components/sections/EducationSection";
import VolunteerSection from "../src/components/sections/VolunteerSection";
import ContactSection from "../src/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore Phy Vathanak's software engineering portfolio, experience, education, and projects.",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nak-dev.netlify.app";
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Phy Vathanak",
    url: siteUrl,
    jobTitle: "Software Developer",
    description:
      "Fourth-year Bachelor of Computer Science student at CADT specializing in Software Engineering.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Cambodia Academy of Digital Technology",
      alternateName: "CADT",
    },
    sameAs: [
      "https://github.com/vathanakphy",
      "https://www.linkedin.com/in/phy-vathanak/",
    ],
    knowsAbout: [
      "Software Development",
      "Backend Development",
      "Machine Learning",
      "Artificial Intelligence",
      "Web Application Development",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
