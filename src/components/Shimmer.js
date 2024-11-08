import React from "react";

const Shimmer = () => {
  return (
    <div className="p-6 m-6 bg-opacity-70 text-white rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(12).fill("").map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div className="w-full h-65 bg-gray-400 animate-pulse"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-400 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-400 rounded mb-2 animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-400 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;