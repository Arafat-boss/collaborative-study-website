import React from "react";
import { Link } from "react-router-dom";

/**
 * Creative Animated CTA Button with cut-corner notches and sliding background fill.
 * Supports direction 1 (left-to-right fill) and -1 (right-to-left fill) for paired side-by-side buttons.
 */
const CreativeButton = ({
  as = "button",
  to,
  href,
  onClick,
  children,
  className = "",
  variant = "blue", // "blue" | "indigo" | "slate" | "emerald"
  direction = 1,    // 1 (slide from left, corners TR & BL) | -1 (slide from right, corners TL & BR)
  cutBg = "bg-slate-50 dark:bg-[#080d1a]", // matches surrounding page background
  type = "button",
  disabled = false,
  ...props
}) => {
  // Theme color definitions
  const variants = {
    blue: {
      bg: "bg-blue-600",
      corner: "bg-blue-800 dark:bg-blue-900",
      fill: "bg-blue-700 dark:bg-blue-500",
      text: "text-white",
    },
    indigo: {
      bg: "bg-indigo-600",
      corner: "bg-indigo-800 dark:bg-indigo-900",
      fill: "bg-indigo-700 dark:bg-indigo-500",
      text: "text-white",
    },
    slate: {
      bg: "bg-slate-800 dark:bg-slate-800",
      corner: "bg-slate-950 dark:bg-slate-900",
      fill: "bg-slate-900 dark:bg-slate-700",
      text: "text-white",
    },
    emerald: {
      bg: "bg-emerald-600",
      corner: "bg-emerald-800 dark:bg-emerald-900",
      fill: "bg-emerald-700 dark:bg-emerald-500",
      text: "text-white",
    },
  };

  const v = variants[variant] || variants.blue;
  const isReverse = direction === -1;

  const baseClasses = `relative inline-flex items-center justify-center px-6 sm:px-8 py-3 overflow-hidden font-bold text-sm sm:text-base transition-all duration-300 ${v.bg} rounded-[5px] group shadow-sm hover:shadow-md select-none ${className}`;

  const content = (
    <>
      {/* Corner 1 */}
      {!isReverse ? (
        // Top-Right corner cut (Direction 1)
        <span
          className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${v.corner} rounded group-hover:-mr-4 group-hover:-mt-4 pointer-events-none z-10`}
        >
          <span
            className={`absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 ${cutBg}`}
          />
        </span>
      ) : (
        // Top-Left corner cut (Direction -1)
        <span
          className={`absolute top-0 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${v.corner} rounded group-hover:-ml-4 group-hover:-mt-4 pointer-events-none z-10`}
        >
          <span
            className={`absolute top-0 left-0 w-5 h-5 rotate-45 -translate-x-1/2 -translate-y-1/2 ${cutBg}`}
          />
        </span>
      )}

      {/* Corner 2 */}
      {!isReverse ? (
        // Bottom-Left corner cut (Direction 1)
        <span
          className={`absolute bottom-0 left-0 rotate-180 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${v.corner} rounded group-hover:-ml-4 group-hover:-mb-4 pointer-events-none z-10`}
        >
          <span
            className={`absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 ${cutBg}`}
          />
        </span>
      ) : (
        // Bottom-Right corner cut (Direction -1)
        <span
          className={`absolute bottom-0 right-0 rotate-180 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${v.corner} rounded group-hover:-mr-4 group-hover:-mb-4 pointer-events-none z-10`}
        >
          <span
            className={`absolute top-0 left-0 w-5 h-5 rotate-45 -translate-x-1/2 -translate-y-1/2 ${cutBg}`}
          />
        </span>
      )}

      {/* Sliding Fill Background Overlay */}
      <span
        className={`absolute bottom-0 w-full h-full transition-all duration-500 ease-in-out delay-150 ${v.fill} rounded-[5px] pointer-events-none z-0 ${
          !isReverse
            ? "left-0 -translate-x-full group-hover:translate-x-0" // Slides from Left -> Right
            : "right-0 translate-x-full group-hover:translate-x-0" // Slides from Right -> Left
        }`}
      />

      {/* Button Text / Content */}
      <span
        className={`relative z-10 flex items-center justify-center gap-2 ${v.text} transition-colors duration-200 ease-in-out`}
      >
        {children}
      </span>
    </>
  );

  if (as === "Link" || to) {
    return (
      <Link to={to} onClick={onClick} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (as === "a" || href) {
    return (
      <a href={href} onClick={onClick} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default CreativeButton;
