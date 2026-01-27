import React from "react";
import { Download } from "lucide-react";
import { contactInfo } from "../../data";
import AnimatedWrapper from "../utility/AnimatedWrapper";

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold mb-4 text-black">
            Get In Touch
          </h2>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            I'm currently seeking backend internship opportunities. If you have
            a role that aligns with my skills, I'd love to hear from you.
          </p>
        </AnimatedWrapper>

        {/* Contact cards */}
        <div className="max-w-md mx-auto space-y-4">
          {contactInfo.map((item, index) => (
            <AnimatedWrapper key={index} delay={index * 100}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-blue-500">
                  {item.icon}
                </div>

                <span className="ml-4 text-gray-800 font-medium">
                  {item.text}
                </span>
              </a>
            </AnimatedWrapper>
          ))}
        </div>

        {/* Resume button */}
        <div className="mt-10">
          <AnimatedWrapper delay={contactInfo.length * 100}>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              <Download className="mr-2 h-5 w-5" />
              Download My Resume
            </a>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
