import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <Link to="/boards" className="text-blue-500">Go Back to Boards</Link>
    </div>
  );
};

export default NotFound;
