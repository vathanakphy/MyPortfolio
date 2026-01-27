import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Award, ExternalLink, Code, HeartHandshake, UserCheck } from 'lucide-react';
import { educationJourneyData } from '../data/educationJourneyData';
import { type MilestoneType } from '../types';
import CaptionedSlideshow from '../components/ui/CaptionedSlideshow';
import AnimatedWrapper from '../components/utility/AnimatedWrapper';

const getMilestoneIcon = (type: MilestoneType) => {
  const iconClass = "h-6 w-6";
  switch (type) {
    case 'award': return <Award className={`${iconClass} text-amber-400`} />;
    case 'hackathon': return <Code className={`${iconClass} text-blue-400`} />;
    case 'volunteer': return <HeartHandshake className={`${iconClass} text-pink-400`} />;
    case 'leadership': return <UserCheck className={`${iconClass} text-purple-400`} />;
    case 'academic':
    default: return <GraduationCap className={`${iconClass} text-green-400`} />;
  }
};

const EducationJourneyPage: React.FC = () => {
  const { mainTitle, mainDescription, stages } = educationJourneyData;

  return (
    <section className="py-2 md:py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedWrapper>
          <Link to="/" className="flex items-center text-blue-500 hover:underline font-medium mb-12">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-16">
            <GraduationCap className="mx-auto text-blue-500 h-16 w-16" />
            <h1 className="text-4xl font-bold mt-4 text-black">{mainTitle}</h1>
            <p className="text-lg text-gray-700 mt-2 max-w-3xl mx-auto">{mainDescription}</p>
          </div>
        </AnimatedWrapper>

        <div className="max-w-4xl mx-auto space-y-20">
          {stages.map((stage) => (
            <AnimatedWrapper key={stage.title}>
              {/* Stage Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-blue-500">{stage.title}</h2>
                <p className="text-lg text-gray-700">{stage.institution} | {stage.period}</p>
              </div>

              {/* Timeline */}
              <div className="relative pl-12 border-l-2 border-gray-300">
                {stage.milestones.map((milestone) => (
                  <div key={milestone.title} className="relative mb-12">
                    {/* Timeline Icon */}
                    <div className="absolute -left-[2.2rem] top-1 h-12 w-12 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center shadow-md">
                      {getMilestoneIcon(milestone.type)}
                    </div>

                    {/* Milestone Card */}
                    <div className="ml-4 p-6 bg-white rounded-xl shadow-md border border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <h3 className="text-xl font-bold mb-3 text-black">{milestone.title}</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-800 mb-4">{milestone.description}</p>
                          {milestone.certificateUrl && (
                            <a
                              href={milestone.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors shadow-md"
                            >
                              <ExternalLink size={16} className="mr-2" />
                              View Certificate
                            </a>
                          )}
                        </div>
                        <div>
                          <CaptionedSlideshow slides={milestone.slides} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationJourneyPage;
