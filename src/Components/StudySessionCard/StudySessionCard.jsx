import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuCalendar, LuUser, LuArrowRight, LuCheck } from "react-icons/lu";
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
    <div className="group relative bg-white dark:bg-[#0f172a] rounded-[5px] border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Card Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={sessionImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"}
          alt={sessionTitle || "Study Session"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-[5px] text-[11px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1.5 ${
              isOngoing
                ? "bg-emerald-600 text-white"
                : "bg-slate-700 text-white"
            }`}
          >
            {sessionStatus}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white px-2.5 py-1 rounded-[5px] text-xs font-bold shadow-sm">
          <span>{Number(registrationFee) === 0 ? "FREE" : `$${registrationFee}`}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Tutor Info */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <LuUser className="text-sm flex-shrink-0" />
            <span className="truncate">{tutorName || "Instructor"}</span>
            <LuCheck className="text-xs flex-shrink-0" />
          </div>

          {/* Session Title */}
          <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {sessionTitle || "Untitled Session"}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {truncateDescription(sessionDescription, 12) || "Comprehensive interactive study session to boost your skills and career."}
          </p>
        </div>

        {/* Registration Dates */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 space-y-1.5 text-xs text-gray-500 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-gray-500 dark:text-slate-400">
              <LuCalendar className="text-blue-600 dark:text-blue-400" /> Reg Deadline:
            </span>
            <span className={`font-semibold ${isOngoing ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-slate-400"}`}>
              {registrationEndDate || "Open"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <Link
            to={`/cardDetails/${_id}`}
            onClick={handleActionClick}
            className={`w-full py-2.5 px-4 rounded-[5px] text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
              !isOngoing
                ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed pointer-events-none border border-gray-200 dark:border-slate-700"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
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
