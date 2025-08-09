import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { allProjects } from '../data';
import AnimatedWrapper from '../components/utility/AnimatedWrapper';
import ProjectCard from '../components/cards/ProjectCard';

const AllProjectsPage: React.FC = () => {
    return (
        <section id="all-projects" className="py-32 md:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedWrapper>
                <div className="flex items-center mb-12">
                    <Link to="/" className="flex items-center text-blue-500 dark:text-blue-400 hover:underline font-medium">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Home
                    </Link>
                </div>
                <h2 className="text-4xl font-bold text-center mb-4">All Projects</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
                    A collection of my work, from backend systems to full-stack applications.
                </p>
            </AnimatedWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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