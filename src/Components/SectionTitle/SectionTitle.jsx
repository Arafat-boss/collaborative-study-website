import React from 'react';

const SectionTitle = ({ header, subHeader }) => {
  return (
    <div className="text-center max-w-2xl mx-auto my-8 px-4 space-y-2">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white capitalize">
        {header}
      </h3>
      {subHeader && (
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {subHeader}
        </p>
      )}
      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-3" />
    </div>
  );
};

export default SectionTitle;