import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuFlame
} from "react-icons/lu";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Banner = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-transparent text-gray-900 dark:text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Hero Content Center */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold shadow-sm">
          <LuFlame className="text-blue-600 dark:text-blue-400" />
          <span>Next-Gen Collaborative Study & Career Hub</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-[5px] bg-blue-600/10 dark:bg-blue-600/30 text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            Batch 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.15]">
          Let’s Learn & Code_
          <br />
          <span className="text-blue-600 dark:text-blue-400">
            Your Future Career
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal px-2 sm:px-0">
          Empowering students with personalized mentorship, live interactive study sessions, curated notes, and real-world collaboration in one unified ecosystem.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
          <a
            href="#study-sessions"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-[5px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Explore Study Sessions</span>
            <LuArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/register"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-[5px] bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 font-bold text-sm sm:text-base transition-all duration-200 text-center shadow-sm"
          >
            Join as Tutor / Student
          </Link>
        </div>

        {/* Stats Highlight Bar with Animated ScrollTrigger CountUp */}
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 sm:pt-8 border-t border-gray-200 dark:border-slate-800 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-[5px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                {counterOn ? (
                  <CountUp start={0} end={500} duration={2.5} suffix="+" />
                ) : (
                  "0+"
                )}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5">Active Learners</div>
            </div>
            <div className="p-3.5 rounded-[5px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                {counterOn ? (
                  <CountUp start={0} end={50} duration={2.5} suffix="+" />
                ) : (
                  "0+"
                )}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5">Top Instructors</div>
            </div>
            <div className="p-3.5 rounded-[5px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                {counterOn ? (
                  <CountUp start={0} end={100} duration={2.5} suffix="%" />
                ) : (
                  "0%"
                )}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5">Verified Sessions</div>
            </div>
            <div className="p-3.5 rounded-[5px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                {counterOn ? (
                  <CountUp start={0} end={24} duration={2} suffix="/7" />
                ) : (
                  "0/7"
                )}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5">Resource Access</div>
            </div>
          </div>
        </ScrollTrigger>

      </div>
    </section>
  );
};

export default Banner;
