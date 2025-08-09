import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout and Utility
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GlobalStyles from './components/utility/GlobalStyles';

// Pages
import HomePage from './pages/HomePage';
import AllProjectsPage from './pages/AllProjectsPage';
import EducationJourneyPage from './pages/EducationJourneyPage'; // <-- IMPORT NEW PAGE
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = (isOpen?: boolean) => setIsMobileMenuOpen(prev => isOpen !== undefined ? isOpen : !prev);

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalStyles />
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/education-journey" element={<EducationJourneyPage />} /> {/* <-- ADD NEW ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;