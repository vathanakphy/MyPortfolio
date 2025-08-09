import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <section className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <p className="text-2xl mt-4 mb-8">Page Not Found</p>
        <Link 
          to="/" 
          className="px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;