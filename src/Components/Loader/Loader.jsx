import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-screen py-12 w-full">
      <div className="loader-con flex items-center justify-center">
        <div style={{ "--i": 0 }} className="pfile"></div>
        <div style={{ "--i": 1 }} className="pfile"></div>
        <div style={{ "--i": 2 }} className="pfile"></div>
        <div style={{ "--i": 3 }} className="pfile"></div>
        <div style={{ "--i": 4 }} className="pfile"></div>
        <div style={{ "--i": 5 }} className="pfile"></div>
      </div>
      <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-slate-400 mt-2">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
