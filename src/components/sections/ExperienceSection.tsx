import React from 'react';
import Link from 'next/link';
import { Briefcase, Award, Building } from 'lucide-react';
import { experiences } from '../../data/experienceData';
import AnimatedWrapper from '../utility/AnimatedWrapper';

const ExperienceSection: React.FC = () => {
  const latestExperience = experiences[0];

  return (
    <section id="experience" className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Experience</h2>
        </AnimatedWrapper>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-300 p-6">
          <AnimatedWrapper delay={150}>
            <div className="flex items-start mb-4">
              {latestExperience.companyLogo ? (
                latestExperience.companyUrl ? (
                  <a href={latestExperience.companyUrl} target="_blank" rel="noopener noreferrer" className="mr-4 flex-shrink-0 hover:opacity-80 transition-opacity">
                    <img src={latestExperience.companyLogo} alt={`${latestExperience.company} logo`} className="w-12 h-12 rounded-md object-contain bg-white" />
                  </a>
                ) : (
                  <img src={latestExperience.companyLogo} alt={`${latestExperience.company} logo`} className="w-12 h-12 mr-4 rounded-md object-contain bg-white flex-shrink-0" />
                )
              ) : (
                <Building size={48} className="mr-4 text-blue-500 flex-shrink-0" />
              )}
              <div>
                <h3 className="text-2xl font-bold text-black">{latestExperience.company}</h3>
                <p className="text-lg font-semibold text-blue-500">
                  {latestExperience.role}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {latestExperience.duration} | {latestExperience.location}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <h4 className="font-semibold mb-3 text-md text-black">Key Responsibilities:</h4>
              <ul className="space-y-2">
                {latestExperience.responsibilities.slice(0, 3).map((resp, index) => (
                  <li key={index} className="flex items-start">
                    <Award size={20} className="mr-2 mt-1 text-blue-500 flex-shrink-0" />
                    <p className="text-black">{resp}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center mt-6">
              <Link
                href="/experience"
                className="group relative inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <Briefcase className="mr-2" /> View Full Experience Details
              </Link>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
