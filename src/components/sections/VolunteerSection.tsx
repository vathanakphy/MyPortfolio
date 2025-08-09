import React from 'react';
import { HeartHandshake, ExternalLink } from 'lucide-react';
import { volunteerExperiences } from '../../data';
import AnimatedWrapper from '../utility/AnimatedWrapper';
import ImageSlideshow from '../ui/ImageSlideshow'; // Import the new component

const VolunteerSection: React.FC = () => {
  return (
    <section id="volunteer" className="py-16 md:py-24 bg-gray-950/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-12">
            Volunteer Experience
          </h2>
        </AnimatedWrapper>
        <div className="space-y-16">
          {volunteerExperiences.map((exp, index) => (
            <AnimatedWrapper key={index} delay={index * 150}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div
                  className={`md:col-span-2 ${
                    index % 2 === 0 ? "md:order-1" : "md:order-2"
                  }`}
                >
                  {/* Replace the single img tag with the new ImageSlideshow component */}
                  <ImageSlideshow urls={exp.imageUrls} alt={exp.role} />
                </div>
                <div
                  className={`md:col-span-3 ${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="bg-black/30 backdrop-blur-xl rounded-2xl shadow-lg border border-black/20 p-8 h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start">
                        <div className="text-4xl mr-4 text-purple-500 flex-shrink-0">
                          <HeartHandshake />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{exp.role}</h3>
                          <p className="text-md font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            {exp.organization}
                          </p>
                          <p className="text-sm text-gray-400 mb-2">
                            {exp.period}
                          </p>
                          <p className="text-gray-300 text-sm">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                      
                      {exp.certificateUrl && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                           <a
                              href={exp.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                            >
                              <ExternalLink size={16} className="mr-2" />
                              View Certificate of Appreciation
                            </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;