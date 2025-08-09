import React from 'react';
import { Download } from 'lucide-react';
import { contactInfo } from '../../data';
import AnimatedWrapper from '../utility/AnimatedWrapper';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedWrapper>
          {/* UPDATED: Title text color for consistency */}
          <h2 className="text-3xl font-bold mb-4 text-gray-100">Get In Touch</h2>
          
          {/* UPDATED: Paragraph text color */}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm currently seeking backend internship opportunities. If you have
            a role that aligns with my skills, I'd love to hear from you!
          </p>
        </AnimatedWrapper>
        <div className="max-w-md mx-auto space-y-4">
          {contactInfo.map((item, index) => (
            <AnimatedWrapper key={index} delay={index * 100}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                // UPDATED: Card styles for permanent dark mode
                className="flex items-center p-4 bg-black/30 backdrop-blur-xl rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-800 hover:border-blue-500/40"
              >
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {item.icon}
                </div>
                {/* UPDATED: Span text color */}
                <span className="ml-4 text-gray-200">
                  {item.text}
                </span>
              </a>
            </AnimatedWrapper>
          ))}
        </div>
        <div className="mt-12">
          <AnimatedWrapper delay={contactInfo.length * 100}>
            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
            >
              <Download className="mr-3 h-6 w-6" />
              Download My Full Resume
            </a>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;