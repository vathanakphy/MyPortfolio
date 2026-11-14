import Link from "next/link";
import { ArrowLeft, Briefcase, Award, Home, Building } from "lucide-react";
import { experiences } from "../../src/data/experienceData";
import AnimatedWrapper from "../../src/components/utility/AnimatedWrapper";
import VolunteerSection from "../../src/components/sections/VolunteerSection";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Experience",
  description: "Phy Vathanak's internship experience and professional journey.",
  path: "/experience",
  keywords: ["Phy Vathanak experience", "software developer intern", "SINET intern", "CADT student experience"],
});

export default function Page() {
  return (
    <section className="py-2 md:py-4 bg-white min-h-screen">
      <Link href="/" className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back to Home</span>
        <Home size={18} className="sm:hidden" />
      </Link>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <div className="text-center mb-16 pt-4">
            <Briefcase className="mx-auto text-blue-500 h-16 w-16" />
            <h1 className="text-4xl font-bold mt-4 text-black">Internship Experience</h1>
            <p className="text-lg text-gray-700 mt-2 max-w-3xl mx-auto">A detailed look at my professional journey, internships, and work experience.</p>
          </div>
        </AnimatedWrapper>
        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((experience) => (
            <AnimatedWrapper key={experience.id}>
              <div className="bg-white rounded-xl shadow-md border border-gray-300 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start mb-6 border-b border-gray-200 pb-6">
                  {experience.companyLogo ? <img src={experience.companyLogo} alt={`${experience.company} logo`} className="w-16 h-16 mr-6 rounded-lg object-contain bg-white shadow-sm flex-shrink-0" /> : <Building size={48} className="mr-6 text-blue-500 flex-shrink-0" />}
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-2">{experience.company}</h2>
                    <p className="text-xl font-semibold text-blue-500">{experience.role}</p>
                    <p className="text-md text-gray-500 mt-2">{experience.duration} | {experience.location}</p>
                  </div>
                </div>
                {experience.companyInfo && <div className="mb-6 bg-blue-50 rounded-lg p-5 border border-blue-100"><h3 className="text-lg font-bold mb-2 text-blue-800">About {experience.company}</h3><p className="text-blue-900 text-sm leading-relaxed">{experience.companyInfo}</p></div>}
                <div className="mb-6"><h3 className="text-xl font-bold mb-3 text-black">Overview</h3><p className="text-gray-800 leading-relaxed">{experience.description}</p></div>
                <div className="mb-6 border-t border-gray-200 pt-6"><h3 className="text-xl font-bold mb-4 text-black">Key Responsibilities &amp; Achievements</h3><ul className="space-y-3">{experience.responsibilities.map((resp, index) => <li key={index} className="flex items-start"><Award size={20} className="mr-3 mt-1 text-blue-500 flex-shrink-0" /><p className="text-gray-800">{resp}</p></li>)}</ul></div>
                <div className="border-t border-gray-200 pt-6"><h3 className="text-xl font-bold mb-4 text-black">Technologies &amp; Tools</h3><div className="flex flex-wrap gap-2">{experience.technologies.map((tech, index) => <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border border-gray-200">{tech}</span>)}</div></div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
      <VolunteerSection />
    </section>
  );
}
