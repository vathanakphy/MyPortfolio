import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Phy Vathanak. All Rights Reserved.
        </p>
        <p className="text-sm mt-1">
          Built with React, Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;