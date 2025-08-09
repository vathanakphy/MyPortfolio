import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Award, ExternalLink, Code, HeartHandshake, UserCheck } from 'lucide-react';
import { educationJourneyData } from '../data/educationJourneyData';
import { type MilestoneType } from '../types';
import CaptionedSlideshow from '../components/ui/CaptionedSlideshow';
import AnimatedWrapper from '../components/utility/AnimatedWrapper';

// Helper function to get the correct icon based on the milestone type
const getMilestoneIcon = (type: MilestoneType) => {
  const iconClass = "h-6 w-6";
  switch (type) {
    case 'award':
      return <Award className={`${iconClass} text-amber-400`} />;
    case 'hackathon':
      return <Code className={`${iconClass} text-blue-400`} />;
    case 'volunteer':
      return <HeartHandshake className={`${iconClass} text-pink-400`} />;
    case 'leadership':
      return <UserCheck className={`${iconClass} text-purple-400`} />;
    case 'academic':
    default:
      return <GraduationCap className={`${iconClass} text-green-400`} />;
  }
};

const EducationJourneyPage: React.FC = () => {
  const { mainTitle, mainDescription, stages } = educationJourneyData;

  return (
    <section className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <Link to="/" className="flex items-center text-blue-400 hover:underline font-medium mb-12">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-16">
            <GraduationCap className="mx-auto text-purple-400 h-16 w-16" />
            <h1 className="text-4xl font-bold mt-4">{mainTitle}</h1>
            <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">{mainDescription}</p>
          </div>
        </AnimatedWrapper>
        
        {/* Outer loop for STAGES */}
        <div className="max-w-4xl mx-auto space-y-20">
          {stages.map((stage) => (
            <AnimatedWrapper key={stage.title}>
              {/* Stage Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-purple-400">{stage.title}</h2>
                <p className="text-lg text-gray-400">{stage.institution} | {stage.period}</p>
              </div>

              {/* Timeline Container FOR THIS STAGE */}
              <div className="relative pl-12 border-l-2 border-gray-700/50">
                {/* Inner loop for MILESTONES */}
                {stage.milestones.map((milestone) => (
                  <div key={milestone.title} className="relative mb-12">
                    {/* The Icon on the timeline */}
                    <div className="absolute -left-[2.2rem] top-1 h-12 w-12 rounded-full bg-gray-800 border-4 border-gray-900 flex items-center justify-center">
                      {getMilestoneIcon(milestone.type)}
                    </div>
                    
                    {/* The Content Card */}
                    <div className="p-6 bg-black/30 rounded-lg shadow-lg border border-white/10 ml-4">
                      <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                              <p className="text-gray-300 mb-4">{milestone.description}</p>
                              {milestone.certificateUrl && (
                                  <a
                                  href={milestone.certificateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center mt-2 px-4 py-2 bg-blue-600/80 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors shadow-lg"
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