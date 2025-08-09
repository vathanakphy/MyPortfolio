import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, School } from 'lucide-react';
import { achievements } from '../../data/educationData';
import AnimatedWrapper from '../utility/AnimatedWrapper';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
        </AnimatedWrapper>
        
        <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl rounded-2xl shadow-lg border border-black/20 p-8">
          <AnimatedWrapper delay={150}>
            <div className="flex items-start mb-6">
              <School size={40} className="mr-6 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold">Cambodia Academy of Digital Technology (CADT)</h3>
                <p className="text-lg font-semibold text-purple-400">
                  B.Sc. in Computer Science (Software Engineering)
                </p>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-semibold mb-4 text-md">Key Achievements:</h4>
              <ul className="space-y-3">
                {achievements.slice(0, 2).map((ach) => ( // Show first 2 achievements
                  <li key={ach.title} className="flex items-start">
                    <Award size={20} className="mr-3 mt-1 text-amber-400 flex-shrink-0" />
                    <p className="text-gray-300">{ach.title}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/education-journey"
                className="group relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
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