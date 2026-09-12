import React from "react";
import {
  LuSearch,
  LuVideo,
  LuBookOpen,
  LuAward,
  LuCheck
} from "react-icons/lu";

const roadmapSteps = [
  {
    step: "01",
    title: "Discover Sessions & Mentors",
    description: "Browse verified live study tracks across STEM, Computer Science, and Academic topics led by top instructors.",
    icon: LuSearch,
  },
  {
    step: "02",
    title: "Interactive Live Classes",
    description: "Join live meeting rooms with two-way Q&A, screen sharing, real-time code collaboration, and instant tutor help.",
    icon: LuVideo,
  },
  {
    step: "03",
    title: "Exclusive Notes & Resources",
    description: "Enrolled students gain instant access to curated lesson PDFs, session recordings, reference notes, and study guides.",
    icon: LuBookOpen,
  },
  {
    step: "04",
    title: "Invoice & Certification",
    description: "Download official tax-ready payment invoices and earn verifiable completion certificates upon finishing your tracks.",
    icon: LuAward,
  }
];

const FastSection = () => {
  return (
    <section className="py-6 sm:py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-[5px] bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-slate-800 shadow-sm p-5 sm:p-8 lg:p-12 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-[5px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold border border-blue-200 dark:border-blue-900/50 shadow-sm">
            <span>Structured Learning Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            How Collaborative Study
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              Accelerates Your Success
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-1">
            Follow a proven, structured milestone roadmap from session enrollment to interactive mentorship and career breakthroughs.
          </p>
        </div>

        {/* 4 Steps Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {roadmapSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative rounded-[5px] bg-slate-50 dark:bg-[#111827] hover:bg-white dark:hover:bg-[#151e33] border border-gray-200 dark:border-slate-800 hover:border-blue-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-[5px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-xl transition-transform group-hover:scale-105">
                    <Icon />
                  </div>
                  <span className="font-mono text-2xl font-black text-gray-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-slate-400 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer status check */}
                <div className="pt-5 mt-4 border-t border-gray-200 dark:border-slate-800 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <LuCheck className="text-sm text-blue-600 dark:text-blue-400" />
                  <span>Step {item.step} Milestone</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FastSection;