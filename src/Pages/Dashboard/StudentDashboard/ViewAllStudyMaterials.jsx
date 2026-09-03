import React, { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import {
  LuExternalLink,
  LuFileText,
  LuBookOpen,
  LuUser,
  LuCalendar,
  LuFilter,
  LuSparkles,
} from "react-icons/lu";

const ViewAllStudyMaterials = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSessionFilter = searchParams.get("session") || "all";
  const [selectedSessionFilter, setSelectedSessionFilter] = useState(initialSessionFilter);

  // 1. Fetch student's booked sessions to know what sessions they enrolled in
  const { data: bookedSessions = [], isLoading: isBookedLoading } = useQuery({
    queryKey: ["bookedSessionsForMaterials", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookedSessions/${user?.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // 2. Fetch study materials only for sessions the student enrolled in
  const { data: materials = [], isLoading: isMaterialsLoading } = useQuery({
    queryKey: ["studentEnrolledMaterials", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/student-materials/${user?.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const isLoading = isBookedLoading || isMaterialsLoading;

  // Filter materials if a specific session is selected
  const filteredMaterials =
    selectedSessionFilter === "all"
      ? materials
      : materials.filter(
          (m) =>
            String(m.sessionId) === String(selectedSessionFilter) ||
            m.sessionTitle?.toLowerCase() === selectedSessionFilter.toLowerCase()
        );

  const handleFilterChange = (val) => {
    setSelectedSessionFilter(val);
    if (val === "all") {
      searchParams.delete("session");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ session: val });
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        header="My Study Materials"
        subHeader="Access exclusive lecture notes, slides, and learning materials for the study sessions you have enrolled in."
      />

      {/* Enrolled Status Header & Filter Bar */}
      {bookedSessions.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
            <span className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              <LuBookOpen />
            </span>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                Enrolled in {bookedSessions.length} Study Session{bookedSessions.length > 1 ? "s" : ""}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {materials.length} material file{materials.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          {/* Session Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <LuFilter className="text-gray-400 dark:text-slate-500 text-sm flex-shrink-0" />
            <select
              value={selectedSessionFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="all">All Enrolled Sessions ({materials.length})</option>
              {bookedSessions.map((s) => (
                <option key={s._id || s.sessionId} value={s.sessionId || s._id}>
                  {s.sessionTitle}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 animate-pulse space-y-3">
              <div className="aspect-video bg-gray-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-2/3" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : bookedSessions.length === 0 ? (
        /* Empty State 1: Student not enrolled in any session */
        <div className="py-16 px-6 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 max-w-xl mx-auto transition-colors">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
            <LuBookOpen />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Enroll in Sessions to Unlock Materials</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Study materials (slides, PDF notes, reference files) are shared exclusively with students enrolled in each tutor's study session.
            </p>
          </div>
          <Link
            to="/#study-sessions"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all"
          >
            <LuSparkles /> Browse & Enroll in Study Sessions
          </Link>
        </div>
      ) : filteredMaterials.length > 0 ? (
        /* Materials Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMaterials.map((item) => (
            <div
              key={item._id || item.sessionId}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <img
                    src={
                      item.materialImage ||
                      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600"
                    }
                    alt={item.sessionTitle || "Study Material"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                      <FaCheckCircle /> Enrolled Access
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/50">
                    {item.sessionTitle || "Study Session"}
                  </span>
                  
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white line-clamp-2">
                    {item.sessionTitle || "Class Study Material"}
                  </h3>

                  <div className="space-y-1 text-xs text-gray-500 dark:text-slate-400 pt-1 border-t border-gray-100 dark:border-slate-800">
                    <p className="flex items-center gap-1.5 truncate">
                      <LuUser className="text-gray-400 dark:text-slate-500" />
                      <span>Instructor: <strong className="text-gray-700 dark:text-slate-200">{item.tutorName || item.tutorEmail}</strong></span>
                    </p>
                    {item.createdAt && (
                      <p className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-slate-500">
                        <LuCalendar />
                        <span>Uploaded: {new Date(item.createdAt).toLocaleDateString()}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                {item.materialLink ? (
                  <a
                    href={item.materialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <LuExternalLink />
                    <span>Open / Download Material</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 font-medium text-xs cursor-not-allowed"
                  >
                    No link provided
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State 2: Enrolled, but no materials uploaded yet */
        <div className="py-16 px-6 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-3 max-w-md mx-auto transition-colors">
          <LuFileText className="text-4xl mx-auto text-gray-400 dark:text-slate-500 mb-2" />
          <h3 className="font-bold text-gray-800 dark:text-white text-base">No Materials Uploaded Yet</h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 leading-relaxed">
            Your instructor has not uploaded materials for this session yet. Please check back before or after class!
          </p>
          {selectedSessionFilter !== "all" && (
            <button
              onClick={() => handleFilterChange("all")}
              className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Show all enrolled materials
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAllStudyMaterials;