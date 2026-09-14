import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { CiLogout } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RxDashboard, RxHome } from "react-icons/rx";
import { LuGraduationCap, LuBookOpen } from "react-icons/lu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, LogOutUser } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    LogOutUser();
    setMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          end
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-[5px] font-semibold text-sm transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-sm [&>svg]:!text-white"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-slate-800"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <RxHome
                className={`text-base transition-colors ${
                  isActive
                    ? "!text-white text-white"
                    : "text-blue-600 dark:text-blue-400 group-hover:text-blue-600"
                }`}
              />
              <span>Home</span>
            </>
          )}
        </NavLink>
      </li>

      <li>
        <a
          href="/#study-sessions"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-[5px] font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200"
        >
          <LuBookOpen className="text-blue-600 dark:text-blue-400" />
          <span>Study Sessions</span>
        </a>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-[5px] font-semibold text-sm transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm [&>svg]:!text-white"
                  : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-slate-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <RxDashboard
                  className={`text-base transition-colors ${
                    isActive
                      ? "!text-white text-white"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <span>Dashboard</span>
              </>
            )}
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-[5px] bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <LuGraduationCap className="text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                  Collaborative<span className="text-blue-600 dark:text-blue-400">Study</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-400 tracking-wider hidden sm:inline-block">
                  Let's Learn & Collaborate
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-2">{navLinks}</ul>
          </nav>

          {/* Desktop User / Auth / Theme Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-slate-800 p-1.5 pr-3 rounded-[5px]">
                {user.photoURL ? (
                  <img
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-9 h-9 rounded-[5px] object-cover border border-blue-500"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-[5px] bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </div>
                )}
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-gray-800 dark:text-white truncate max-w-[120px]">
                    {user.displayName || "User"}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 truncate max-w-[120px]">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogOut}
                  className="p-2 text-gray-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-[5px] transition-colors ml-1"
                  title="Sign Out"
                >
                  <CiLogout className="text-xl" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white rounded-[5px] hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <IoLogInOutline className="text-lg text-blue-600 dark:text-blue-400" />
                  <span>Log in</span>
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-[5px] shadow-sm transition-all active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button & Theme */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            {user && (
              <Link to="/dashboard">
                <img
                  referrerPolicy="no-referrer"
                  src={user.photoURL || "https://placehold.co/100x100?text=User"}
                  alt="User"
                  className="w-8 h-8 rounded-[5px] border border-blue-500 object-cover"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[5px] text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <HiX className="text-2xl text-blue-600 dark:text-blue-400" />
              ) : (
                <HiMenuAlt3 className="text-2xl text-blue-600 dark:text-blue-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-4 shadow-xl transition-all">
          {user && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/90 rounded-[5px] border border-gray-200 dark:border-slate-800">
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL || "https://placehold.co/100x100?text=User"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-[5px] object-cover border border-blue-500"
              />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <ul className="space-y-1.5">{navLinks}</ul>

          <div className="pt-2 border-t border-gray-200 dark:border-slate-800">
            {user ? (
              <button
                onClick={handleLogOut}
                className="w-full py-2.5 px-4 rounded-[5px] text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center gap-2 transition-colors"
              >
                <CiLogout className="text-lg" />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-[5px]"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-[5px] shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
