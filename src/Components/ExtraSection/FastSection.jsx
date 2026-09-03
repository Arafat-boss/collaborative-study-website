import React from "react";
import {
  LuSearch,
  LuVideo,
  LuBookOpen,
  LuAward,
  LuSparkles,
  LuCheck
} from "react-icons/lu";

const roadmapSteps = [
  {
    step: "01",
    title: "Discover Sessions & Mentors",
    description: "Browse verified live study tracks across STEM, Computer Science, and Academic topics led by top instructors.",
    icon: LuSearch,
    badgeColor: "from-fuchsia-500 to-pink-500",
  },
  {
    step: "02",
    title: "Interactive Live Classes",
    description: "Join live meeting rooms with two-way Q&A, screen sharing, real-time code collaboration, and instant tutor help.",
    icon: LuVideo,
    badgeColor: "from-violet-500 to-indigo-500",
  },
  {
    step: "03",
    title: "Exclusive Notes & Resources",
    description: "Enrolled students gain instant access to curated lesson PDFs, session recordings, reference notes, and study guides.",
    icon: LuBookOpen,
    badgeColor: "from-cyan-500 to-blue-500",
  },
  {
    step: "04",
    title: "Invoice & Certification",
    description: "Download official tax-ready payment invoices and earn verifiable completion certificates upon finishing your tracks.",
    icon: LuAward,
    badgeColor: "from-amber-500 to-orange-500",
  }
];

const FastSection = () => {
  return (
    <section className="py-6 sm:py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-slate-800/90 shadow-xl dark:shadow-2xl p-5 sm:p-8 lg:p-12 overflow-hidden transition-colors duration-300">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-fuchsia-500/10 dark:bg-fuchsia-600/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-extrabold border border-violet-200 dark:border-violet-500/30 backdrop-blur-md">
            <LuSparkles className="text-fuchsia-600 dark:text-fuchsia-400" />
            <span>Structured Learning Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            How Collaborative Study
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-300 dark:to-cyan-300">
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
                className="relative rounded-3xl bg-slate-50 dark:bg-[#111827]/80 hover:bg-white dark:hover:bg-[#151e33] border border-gray-200 dark:border-slate-800 hover:border-violet-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 shadow-sm hover:shadow-lg"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.badgeColor} flex items-center justify-center text-white text-xl shadow-lg shadow-black/10 dark:shadow-black/30 group-hover:scale-110 transition-transform`}>
                    <Icon />
                  </div>
                  <span className="font-mono text-2xl font-black text-gray-400 dark:text-slate-600 group-hover:text-violet-600 dark:group-hover:text-slate-400 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer status check */}
                <div className="pt-5 mt-4 border-t border-gray-200 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <LuCheck className="text-sm" />
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