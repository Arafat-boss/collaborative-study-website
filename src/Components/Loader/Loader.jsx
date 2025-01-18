import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">Loading ...</p>
          <div className="mt-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
};

export default Loader;
