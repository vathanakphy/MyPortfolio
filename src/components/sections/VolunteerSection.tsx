import React from "react";
import { HeartHandshake, ExternalLink } from "lucide-react";
import { volunteerExperiences } from "../../data";
import AnimatedWrapper from "../utility/AnimatedWrapper";
import ImageSlideshow from "../ui/ImageSlideshow";

const VolunteerSection: React.FC = () => {
  return (
    <section id="volunteer" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-10 text-black">
            Volunteer Experience
          </h2>
        </AnimatedWrapper>

        <div className="space-y-16">
          {volunteerExperiences.map((exp, index) => (
            <AnimatedWrapper key={index} delay={index * 150}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                
                {/* Images */}
                <div
                  className={`md:col-span-2 ${
                    index % 2 === 0 ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <ImageSlideshow urls={exp.imageUrls} alt={exp.role} />
                </div>

                {/* Content Card */}
                <div
                  className={`md:col-span-3 ${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      
                      <HeartHandshake
                        size={36}
                        className="text-blue-500 flex-shrink-0"
                      />

                      <div>
                        <h3 className="text-xl font-bold text-black">
                          {exp.role}
                        </h3>

                        <p className="text-md font-semibold text-blue-500">
                          {exp.organization}
                        </p>

                        <p className="text-sm text-gray-600 mb-2">
                          {exp.period}
                        </p>

                        <p className="text-gray-800 text-sm">
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    {exp.certificateUrl && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-blue-500 hover:underline"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          View Certificate of Appreciation
                        </a>
                      </div>
                    )}
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
