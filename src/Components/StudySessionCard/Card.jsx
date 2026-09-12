import React from "react";
import { Link } from "react-router-dom";
import { LuUser, LuClock, LuExternalLink, LuBookOpen, LuFileText } from "react-icons/lu";

const Card = ({ session = {}, onViewInvoice }) => {
  const fee = parseFloat(session.registrationFee) || 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[5px] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800 rounded-t-[5px]">
          <img
            src={session.sessionImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"}
            alt={session.sessionTitle || "Session"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-[5px] text-xs font-semibold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
              Enrolled
            </span>
          </div>

          <div className="absolute bottom-3 left-3 bg-gray-900/85 backdrop-blur-md text-white px-2.5 py-1 rounded-[5px] text-xs font-semibold shadow-sm">
            <span>{fee === 0 ? "FREE" : `$${fee.toFixed(2)} Paid`}</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
            {session.sessionTitle}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 line-clamp-2">
            {session.sessionDescription || "Enrolled study session with interactive collaboration."}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 dark:text-slate-500 flex items-center gap-1">
                <LuUser className="text-blue-600 dark:text-blue-400" /> Instructor:
              </span>
              <span className="font-semibold text-gray-800 dark:text-slate-200 truncate max-w-[150px]">
                {session.tutorName}
              </span>
            </div>

            {session.classStartTime && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 dark:text-slate-500 flex items-center gap-1">
                  <LuClock className="text-blue-600 dark:text-blue-400" /> Class Time:
                </span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">
                  {session.classStartTime} - {session.classEndTime}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 space-y-2 border-t border-gray-100 dark:border-slate-800 mt-2">
        <div className="flex gap-2">
          <Link
            to={`/cardDetails/${session.sessionId || session._id}`}
            className="flex-1 py-2.5 px-3 rounded-[5px] bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LuExternalLink className="text-blue-600 dark:text-blue-400" />
            <span>Info</span>
          </Link>
          <Link
            to={`/dashboard/studyMaterials?session=${session.sessionId || session._id}`}
            className="flex-1 py-2.5 px-3 rounded-[5px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <LuBookOpen className="text-white" />
            <span>Materials</span>
          </Link>
        </div>

        {onViewInvoice && (
          <button
            onClick={() => onViewInvoice(session)}
            className="w-full py-2 px-3 rounded-[5px] bg-blue-50 dark:bg-slate-800/80 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LuFileText className="text-blue-600 dark:text-blue-400" />
            <span>Download Invoice Receipt</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
