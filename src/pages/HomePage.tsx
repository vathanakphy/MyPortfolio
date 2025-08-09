import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection';
import EducationSection from '../components/sections/EducationSection';
import VolunteerSection from '../components/sections/VolunteerSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjectsSection />
      <EducationSection />
      <VolunteerSection />
      <ContactSection />
    </>
  );
};

export default HomePage;