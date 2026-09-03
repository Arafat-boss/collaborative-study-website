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
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-transparent text-gray-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Radiant Glow Lights (Programming Hero Signature Spotlight) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] bg-gradient-to-r from-fuchsia-500/20 dark:from-fuchsia-600/30 via-violet-500/15 dark:via-violet-600/25 to-cyan-400/15 dark:to-cyan-500/25 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-violet-500/15 dark:bg-violet-600/20 rounded-full filter blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-500/15 dark:bg-cyan-600/20 rounded-full filter blur-[90px] pointer-events-none" />

      {/* Hero Content Center */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Top Radiant Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-400/30 text-violet-700 dark:text-violet-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
          <LuFlame className="text-fuchsia-600 dark:text-fuchsia-400 animate-bounce" />
          <span>Next-Gen Collaborative Study & Career Hub</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-violet-600/10 dark:bg-violet-600/40 text-[10px] uppercase font-bold text-violet-700 dark:text-violet-200 border border-violet-300 dark:border-violet-400/20">
            Batch 2026
          </span>
        </div>

        {/* Programming Hero Signature Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.15]">
          Let’s Learn & Code_
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-300 dark:to-cyan-300">
            Your Future Career
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Empowering students with personalized mentorship, live interactive study sessions, curated notes, and real-world collaboration in one unified ecosystem.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-3">
          <a
            href="#study-sessions"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-fuchsia-600/25 hover:shadow-fuchsia-600/45 flex items-center justify-center gap-2 group transition-all duration-200 active:scale-95"
          >
            <span>Explore Study Sessions</span>
            <LuArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </a>
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-900/80 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-violet-500/50 text-gray-800 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all duration-200 text-center shadow-sm"
          >
            Join as Tutor / Student
          </Link>
        </div>

        {/* Programming Hero Stats Highlight Bar with Animated ScrollTrigger CountUp */}
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-gray-200 dark:border-slate-800/80 max-w-3xl mx-auto">
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xl sm:text-2xl font-black text-fuchsia-600 dark:text-fuchsia-400">
                {counterOn ? (
                  <CountUp start={0} end={500} duration={2.5} suffix="+" />
                ) : (
                  "0+"
                )}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5">Active Learners</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400">
                {counterOn ? (
                  <CountUp start={0} end={50} duration={2.5} suffix="+" />
                ) : (
                  "0+"
                )}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5">Top Instructors</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xl sm:text-2xl font-black text-violet-600 dark:text-violet-400">
                {counterOn ? (
                  <CountUp start={0} end={100} duration={2.5} suffix="%" />
                ) : (
                  "0%"
                )}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5">Verified Sessions</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
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
