import React from "react";
import useTheme from "../../Hooks/useTheme";
import { LuSun, LuMoon } from "react-icons/lu";

const ThemeToggle = ({ className = "", showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-300 focus:outline-none ${
        isDark
          ? "bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-300 border border-slate-700 shadow-sm shadow-amber-500/10"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-blue-600 border border-slate-200 shadow-sm"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <LuSun className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100 text-amber-400 animate-spin-slow" />
        ) : (
          <LuMoon className="w-5 h-5 transition-transform duration-500 -rotate-12 scale-100 text-slate-700" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold capitalize">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
