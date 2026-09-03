import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuCalendar, LuUser, LuArrowRight, LuSparkles, LuCheck } from "react-icons/lu";
import useAuth from "../../Hooks/useAuth";

const StudySessionCard = ({ data }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    sessionTitle,
    tutorName,
    sessionDescription = "",
    registrationStartDate,
    registrationEndDate,
    registrationFee,
    sessionImage,
    _id,
  } = data || {};

  // Convert registration dates to Date objects for comparison
  let isOngoing = true;
  if (registrationEndDate) {
    const registrationEnd = new Date(registrationEndDate);
    registrationEnd.setHours(23, 59, 59, 999);
    isOngoing = new Date() <= registrationEnd;
  }
  const sessionStatus = isOngoing ? "Ongoing Batch" : "Registration Closed";

  // Safe truncate description
  const truncateDescription = (text, maxWords = 13) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const handleActionClick = (e) => {
    if (!isOngoing) return;
    if (!user) {
      e.preventDefault();
      navigate("/login", { state: { from: { pathname: `/cardDetails/${_id}` } } });
    }
  };

  return (
    <div className="group relative bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-violet-500/50 shadow-md hover:shadow-2xl hover:shadow-violet-950/20 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5">
      {/* Radiant Glow on Card Top */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-20 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Card Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={sessionImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"}
          alt={sessionTitle || "Study Session"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase shadow-md flex items-center gap-1.5 backdrop-blur-md ${
              isOngoing
                ? "bg-emerald-500/90 text-white border border-emerald-400/40"
                : "bg-rose-500/90 text-white border border-rose-400/40"
            }`}
          >
            {isOngoing && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            {sessionStatus}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-700/80 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1 shadow-md">
          <span className={Number(registrationFee) === 0 ? "text-emerald-400" : "text-amber-400"}>
            {Number(registrationFee) === 0 ? "FREE" : `$${registrationFee}`}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Tutor Info */}
          <div className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400">
            <LuUser className="text-sm flex-shrink-0" />
            <span className="truncate">{tutorName || "Instructor"}</span>
            <LuCheck className="text-xs text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
          </div>

          {/* Session Title */}
          <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white line-clamp-1 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
            {sessionTitle || "Untitled Session"}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {truncateDescription(sessionDescription, 12) || "Comprehensive interactive study session to boost your skills and career."}
          </p>
        </div>

        {/* Registration Dates */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 space-y-1.5 text-xs text-gray-500 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <LuCalendar className="text-violet-500 dark:text-violet-400" /> Reg Deadline:
            </span>
            <span className={`font-bold ${isOngoing ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-slate-400"}`}>
              {registrationEndDate || "Open"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            to={`/cardDetails/${_id}`}
            onClick={handleActionClick}
            className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 ${
              !isOngoing
                ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed pointer-events-none border border-gray-200 dark:border-slate-700"
                : "bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/20 dark:shadow-violet-900/40 active:scale-95"
            }`}
          >
            <span>{isOngoing ? "View Details & Enroll" : "Batch Closed"}</span>
            {isOngoing && <LuArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudySessionCard;
