import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 text-gray-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
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