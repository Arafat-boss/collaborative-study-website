import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Student from "../../Pages/Dashboard/StudentDashboard/Student";
import Tutor from "../../Pages/Dashboard/TutorDashboard/Tutor";
import Admin from "../../Pages/Dashboard/AdminDashbord/Admin";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import Loader from "../../Components/Loader/Loader";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { LuGraduationCap } from "react-icons/lu";
import GridBackground from "../../Components/GridBackground/GridBackground";

const Dashboard = () => {
  const { user } = useAuth();
  const [role, isLoading] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  const roleFormatted =
    role === "admin"
      ? "Administrator"
      : role === "tutor"
      ? "Instructor / Tutor"
      : "Student";

  const roleBadgeColor =
    role === "admin"
      ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
      : role === "tutor"
      ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
      : "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#080d1a] text-gray-800 dark:text-slate-100 flex flex-col lg:flex-row antialiased transition-colors duration-300">
      {/* Blueprint / Graph Grid Pattern */}
      <GridBackground />

      {/* Mobile & Tablet Header Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/90 dark:bg-[#0c1222]/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 focus:outline-none transition-colors"
            aria-label="Open sidebar menu"
          >
            <HiMenuAlt2 className="text-2xl" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-violet-600 flex items-center justify-center text-white">
              <LuGraduationCap className="text-lg" />
            </div>
            <span className="font-black text-gray-900 dark:text-white text-sm sm:text-base">Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle className="w-8 h-8 p-0 flex items-center justify-center rounded-lg" />
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${roleBadgeColor}`}>
            {role || "User"}
          </span>
          <img
            referrerPolicy="no-referrer"
            src={user?.photoURL || "https://placehold.co/100x100?text=User"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-gray-300 dark:border-slate-700 object-cover"
          />
        </div>
      </div>

      {/* Mobile Sidebar Overlay / Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={closeSidebar}
          />

          {/* Drawer Content */}
          <aside className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-[#0c1222] shadow-2xl p-6 overflow-y-auto border-r border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
              <Link to="/" onClick={closeSidebar} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-violet-600 flex items-center justify-center text-white">
                  <LuGraduationCap className="text-lg" />
                </div>
                <span className="font-black text-gray-900 dark:text-white text-base">Collaborative Study</span>
              </Link>
              <button
                onClick={closeSidebar}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <HiX className="text-2xl" />
              </button>
            </div>

            {/* Profile Block */}
            <div className="flex items-center gap-3 py-4 my-2 border-b border-gray-100 dark:border-slate-800">
              <img
                referrerPolicy="no-referrer"
                src={user?.photoURL || "https://placehold.co/100x100?text=User"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-violet-500 object-cover flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {user?.displayName || "Anonymous User"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user?.email}</p>
                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border w-max ${roleBadgeColor}`}>
                  {roleFormatted}
                </span>
              </div>
            </div>

            {/* Navigation links based on role */}
            <div className="mt-2 flex-1">
              {role === "student" && <Student onItemClick={closeSidebar} />}
              {role === "tutor" && <Tutor onItemClick={closeSidebar} />}
              {role === "admin" && <Admin onItemClick={closeSidebar} />}
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Persistent Sidebar (lg+) */}
      <aside className="hidden lg:flex flex-col w-72 min-h-screen bg-white dark:bg-[#0c1222] border-r border-gray-200 dark:border-slate-800/80 p-5 flex-shrink-0 sticky top-0 h-screen overflow-y-auto z-20 transition-colors">
        {/* Brand & Theme Toggle Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-900/30 flex-shrink-0">
              <LuGraduationCap className="text-2xl" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-black tracking-tight text-gray-900 dark:text-white leading-tight truncate">
                Collaborative<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500">Study</span>
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-gray-400 dark:text-slate-500 mt-0.5">
                Dashboard Portal
              </span>
            </div>
          </Link>
          <div className="flex-shrink-0 ml-2">
            <ThemeToggle className="w-9 h-9 p-0 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm" />
          </div>
        </div>

        {/* User Card */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-br from-violet-50/60 to-fuchsia-50/40 dark:from-slate-800/80 dark:to-slate-800/40 border border-violet-100/80 dark:border-slate-700/80 flex flex-col items-center text-center">
          <img
            referrerPolicy="no-referrer"
            src={user?.photoURL || "https://placehold.co/100x100?text=User"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-violet-500/40 shadow-md object-cover mb-3"
          />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate w-full px-2">
            {user?.displayName || "User"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 truncate w-full px-2 mt-0.5 font-mono">
            {user?.email}
          </p>
          <span className={`inline-block mt-2.5 text-xs font-bold px-3 py-1 rounded-full border ${roleBadgeColor}`}>
            {roleFormatted}
          </span>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 w-full">
          {role === "student" && <Student />}
          {role === "tutor" && <Tutor />}
          {role === "admin" && <Admin />}
        </div>
      </aside>

      {/* Dashboard Main Content Area */}
      <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 bg-slate-50 dark:bg-[#080d1a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
