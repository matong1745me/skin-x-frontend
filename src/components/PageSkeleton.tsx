import React from 'react';

const PageSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-8 w-1/2 mb-4"></div>
      <div className="bg-gray-300 h-4 w-1/4 mb-2"></div>
      <div className="bg-gray-300 h-4 w-1/3"></div>
    </div>
  );
};

export default PageSkeleton;