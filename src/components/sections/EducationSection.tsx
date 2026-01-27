import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, School } from 'lucide-react';
import { achievements } from '../../data/educationData';
import AnimatedWrapper from '../utility/AnimatedWrapper';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Education</h2>
        </AnimatedWrapper>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-300 p-6">
          <AnimatedWrapper delay={150}>
            <div className="flex items-start mb-4">
              <School size={40} className="mr-4 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-black">Cambodia Academy of Digital Technology (CADT)</h3>
                <p className="text-lg font-semibold text-blue-500">
                  B.Sc. in Computer Science (Software Engineering)
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <h4 className="font-semibold mb-3 text-md text-black">Key Achievements:</h4>
              <ul className="space-y-2">
                {achievements.slice(0, 2).map((ach) => (
                  <li key={ach.title} className="flex items-start">
                    <Award size={20} className="mr-2 mt-1 text-blue-500 flex-shrink-0" />
                    <p className="text-black">{ach.title}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center mt-6">
              <Link
                to="/education-journey"
                className="group relative inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <GraduationCap className="mr-2" /> View Full Education Journey
              </Link>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;