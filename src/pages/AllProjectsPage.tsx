import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { allProjects } from '../data';
import AnimatedWrapper from '../components/utility/AnimatedWrapper';
import ProjectCard from '../components/cards/ProjectCard';

const AllProjectsPage: React.FC = () => {
    return (
        <section id="all-projects" className="py-2 md:py-4 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedWrapper>
                <div className="flex items-center mb-4">
                    <Link to="/" className="flex items-center text-blue-600 hover:underline font-medium">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Home
                    </Link>
                </div>
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">All Projects</h2>
                <p className="text-lg text-gray-700 text-center mb-8">
                    A collection of my work, from backend systems to full-stack applications.
                </p>
            </AnimatedWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((project, index) => (
                <AnimatedWrapper key={project.title} delay={index * 100}>
                  <ProjectCard project={project} />
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </section>
      );
};

export default AllProjectsPage;