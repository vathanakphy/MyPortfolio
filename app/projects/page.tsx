import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { allProjects } from "../../src/data";
import AnimatedWrapper from "../../src/components/utility/AnimatedWrapper";
import ProjectCard from "../../src/components/cards/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of Phy Vathanak's software engineering projects.",
  keywords: ["Phy Vathanak projects", "CADT software projects", "web development projects", "AI projects"],
};

export default function Page() {
  return (
    <section id="all-projects" className="py-2 md:py-4 bg-gray-100 min-h-screen">
      <Link href="/" className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back to Home</span>
        <Home size={18} className="sm:hidden" />
      </Link>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 pt-4">All Projects</h1>
          <p className="text-lg text-gray-700 text-center mb-8">A collection of my work during my academic year, from CLI app to full-stack applications.</p>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <AnimatedWrapper key={project.title} delay={Math.min(index * 50, 300)}>
              <ProjectCard project={project} />
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
