import React from "react";
import { Briefcase, Download } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedWrapper from "../utility/AnimatedWrapper";
import { ReactTyped } from "react-typed";

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-4 md:pt-6 pb-4 md:pb-6 bg-white">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedWrapper delay={0}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Hi, I’m{' '}
            <span className="text-blue-400">
              <ReactTyped
                strings={["Phy Vathanak"]}
                typeSpeed={45}
                backSpeed={0}
                showCursor={false}
              />
            </span>
          </h1>
        </AnimatedWrapper>
        {/* Typing cursor blink style */}
        <style>{`
        .blinking-cursor {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      `}</style>

        <AnimatedWrapper delay={300}>
          <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
            A Year 3 Computer Science student with a specialization in Software
            Engineering
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper delay={600}>
          <p className="max-w-3xl mx-auto text-gray-600 mb-4 text-lg">
            I am a passionate web developer who enjoys turning ideas into
            technical solutions. I work well in a team and take ownership of
            my work. I stay patient while debugging, learn from mistakes to
            strengthen my technical skills, and enjoy helping teammates,
            sharing knowledge, and continuously learning.
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper delay={900}>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/projects"
              className="group relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              View My Projects
            </Link>
            <a
              href="/src/data/PhyVathanakCV.pdf"
              download
              className="group relative inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-200 bg-gray-800 hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-gray-500/20 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
