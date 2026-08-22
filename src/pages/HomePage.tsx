import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import AboutSection from '../components/sections/AboutSection';
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection';
import EducationSection from '../components/sections/EducationSection';
import VolunteerSection from '../components/sections/VolunteerSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <div className="bg-white">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <FeaturedProjectsSection />
        <EducationSection />
        <VolunteerSection />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
