import React from "react";
import AnimatedWrapper from "../utility/AnimatedWrapper";
import { techStack, userImage } from "../../data";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
            About Me
          </h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 text-center">
            <AnimatedWrapper>
              <div className="relative inline-block">
                <img
                  src={userImage}
                  alt="Phy Vathanak"
                  // Style updated for permanent dark mode
                  className="w-96 h-96 rounded-full mx-auto shadow-2xl border-4 border-gray-800 object-cover object-center"
                />
                <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob"></div>
                <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-purple-500 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob animation-delay-2s"></div>
              </div>
            </AnimatedWrapper>
          </div>
          <div className="lg:col-span-3">
            <AnimatedWrapper delay={150}>
              {/* Text color is now permanently a light gray */}
              <p className="text-lg mb-4 text-gray-300">
                I am a Year 3 Computer Science student at CADT with a strong
                interest in backend development. I keep an open mind
                and a growth mindset, always looking to learn new things and
                improve my skills. My goal is to use technology to solve
                problems in a simple and useful way, creating solutions that
                truly help people.
              </p>
              <p className="text-lg mb-6 italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                “ I see every challenge as a chance to learn and grow. ”
              </p>
              {/* Card styles are now permanently dark */}
              <div className="bg-black/30 backdrop-blur-xl p-6 rounded-xl border border-gray-800 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-100">
                  My Tech Stack
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(techStack).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-bold text-gray-300 mb-2">
                        {category}
                      </h4>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center text-sm text-gray-400"
                          >
                            <span className="text-blue-400">{item.icon}</span>
                            <span className="ml-2">{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
