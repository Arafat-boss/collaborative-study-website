import React from "react";
import { Link } from "react-router-dom";
import { LuGraduationCap, LuHeart, LuSparkles, LuMail } from "react-icons/lu";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#070b14] text-slate-300 border-t border-slate-800/90 transition-colors relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-r from-fuchsia-600/10 via-violet-600/10 to-cyan-500/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-600/30">
                <LuGraduationCap className="text-2xl" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Collaborative<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">Study</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering students, developers, and passionate educators through live interactive study tracks, 1-on-1 mentorship, and structured career milestones.
            </p>

            {/* Social Icons (Programming Hero Style) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-violet-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-all duration-200 shadow-md"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-all duration-200 shadow-md"
                aria-label="YouTube"
              >
                <FaYoutube className="text-lg" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-all duration-200 shadow-md"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-all duration-200 shadow-md"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-all duration-200 shadow-md"
                aria-label="Discord"
              >
                <FaDiscord className="text-lg" />
              </a>
            </div>
          </div>

          {/* Student Tracks */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>For Students</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/#study-sessions" className="hover:text-fuchsia-400 transition-colors">
                  Explore Batches
                </Link>
              </li>
              <li>
                <Link to="/dashboard/viewBookedSession" className="hover:text-fuchsia-400 transition-colors">
                  Enrolled Sessions & Invoices
                </Link>
              </li>
              <li>
                <Link to="/dashboard/createNote" className="hover:text-fuchsia-400 transition-colors">
                  Create Study Notes
                </Link>
              </li>
              <li>
                <Link to="/dashboard/studyMaterials" className="hover:text-fuchsia-400 transition-colors">
                  Curated PDFs & Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Tutor & Mentor Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>For Mentors</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/dashboard/createStudySession" className="hover:text-fuchsia-400 transition-colors">
                  Create Live Session
                </Link>
              </li>
              <li>
                <Link to="/dashboard/viewAllStudySessions" className="hover:text-fuchsia-400 transition-colors">
                  My Active Batches
                </Link>
              </li>
              <li>
                <Link to="/dashboard/uploadMaterials" className="hover:text-fuchsia-400 transition-colors">
                  Upload Materials & PDFs
                </Link>
              </li>
              <li>
                <Link to="/dashboard/viewAllMaterials" className="hover:text-fuchsia-400 transition-colors">
                  Manage Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Platform */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
              <span>Admin & Portal</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/dashboard/salesAnalytics" className="hover:text-fuchsia-400 transition-colors">
                  Sales & Revenue Charts
                </Link>
              </li>
              <li>
                <Link to="/dashboard/viewAllUser" className="hover:text-fuchsia-400 transition-colors">
                  Manage Users
                </Link>
              </li>
              <li>
                <Link to="/dashboard/viewAllStudySession" className="hover:text-fuchsia-400 transition-colors">
                  Review Sessions
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-fuchsia-400 transition-colors">
                  Student / Tutor Sign In
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Mission */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Collaborative Study. Empowering Education & Careers.</p>
          <p className="text-slate-400 font-semibold flex items-center gap-1">
            Crafted with <LuHeart className="text-rose-500 text-sm fill-rose-500" /> for passionate lifelong learners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
