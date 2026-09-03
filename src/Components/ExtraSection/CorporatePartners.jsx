import React from 'react';
import { LuBuilding2, LuShieldCheck } from "react-icons/lu";

const CorporatePartners = () => {
  const partners = [
    'Stanford Community',
    'MIT OpenLearning Group',
    'Oxford Academic Circle',
    'Cambridge Study Guild',
    'Global Tech Academy',
    'NextGen Educators'
  ];

  return (
    <section className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50 dark:from-[#0c1222] dark:via-[#111827] dark:to-[#0c1222] border border-blue-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-6 transition-colors duration-300">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <LuBuilding2 className="text-base" />
          <span>Academic & Global Community Network</span>
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white max-w-2xl mx-auto">
          Trusted by Academic Groups and Global Study Communities
        </h2>

        {/* Partners Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-gray-200/80 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow transition-all duration-200"
            >
              <LuShieldCheck className="text-blue-500 dark:text-blue-400 text-base" />
              <span>{partner}</span>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 pt-2">
          Want to register your study circle or institution?{" "}
          <a href="mailto:support@collaborativestudy.com" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Contact Academic Partnerships →
          </a>
        </p>
      </div>
    </section>
  );
};

export default CorporatePartners;
