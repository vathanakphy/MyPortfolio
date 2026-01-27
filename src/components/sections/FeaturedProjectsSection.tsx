import React from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data';
import AnimatedWrapper from '../utility/AnimatedWrapper';
import ProjectCard from '../cards/ProjectCard';

const FeaturedProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Featured Projects
          </h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <AnimatedWrapper key={project.title} delay={index * 150}>
              <ProjectCard project={project} />
            </AnimatedWrapper>
          ))}
        </div>
        <div className="text-center mt-16">
          <AnimatedWrapper delay={300}>
            <Link
              to="/projects"
              className="group relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
            >
              View All My Projects
            </Link>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;