import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import {
  LuBookOpen,
  LuCalendar,
  LuFileText,
  LuPlus,
  LuUsers,
  LuSparkles,
  LuArrowRight,
  LuGraduationCap,
  LuShield
} from "react-icons/lu";

const Welcome = () => {
  const { user } = useAuth();
  const [role] = useAdmin();

  const roleTitle =
    role === "admin"
      ? "Administrator"
      : role === "tutor"
      ? "Instructor / Tutor"
      : "Student";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-md">
            <LuSparkles />
            <span>Dashboard Overview</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Welcome back, {user?.displayName || "Student"}! 👋
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Manage your study sessions, collaborate with mentors, review lecture notes, and track your academic progress all in one place.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-white text-blue-600 font-bold text-xs sm:text-sm hover:bg-blue-50 shadow-md transition-colors inline-flex items-center gap-2"
            >
              <LuBookOpen />
              <span>Browse All Study Sessions</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Role-Specific Quick Action Hub */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          {role === "admin" ? (
            <LuShield className="text-purple-600 dark:text-purple-400" />
          ) : role === "tutor" ? (
            <LuGraduationCap className="text-emerald-600 dark:text-emerald-400" />
          ) : (
            <LuBookOpen className="text-blue-600 dark:text-blue-400" />
          )}
          <span>Quick Actions for {roleTitle}</span>
        </h2>

        {/* Student Cards */}
        {role === "student" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              to="/dashboard/viewBookedSession"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuCalendar />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  My Booked Sessions
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  View scheduled dates, timings, instructor profiles, and meeting links for your enrolled courses.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>View Sessions</span>
                <LuArrowRight />
              </div>
            </Link>

            <Link
              to="/dashboard/studyMaterials"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuBookOpen />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Study Materials
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Download shared lecture PDFs, reference resources, slides, and class notes from your instructors.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>Access Resources</span>
                <LuArrowRight />
              </div>
            </Link>

            <Link
              to="/dashboard/personalNotes"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuFileText />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Personal Study Notes
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Write, organize, and edit your personal exam notes, key points, formulas, and revision memos.
                </p>
              </div>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <span>Manage Notes</span>
                <LuArrowRight />
              </div>
            </Link>
          </div>
        )}

        {/* Tutor Cards */}
        {role === "tutor" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              to="/dashboard/createStudySession"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuPlus />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Create Study Session
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Launch a new live study course, set start/end times, student capacity, and submit for platform review.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>Create Session</span>
                <LuArrowRight />
              </div>
            </Link>

            <Link
              to="/dashboard/viewAllStudySessions"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuCalendar />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  My Study Sessions
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Track session approvals, view feedback from platform admins, and manage scheduled courses.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>View My Sessions</span>
                <LuArrowRight />
              </div>
            </Link>

            <Link
              to="/dashboard/uploadMaterials"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuFileText />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Upload Materials
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Attach Google Drive links, lecture slides, and notes for your approved sessions.
                </p>
              </div>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <span>Upload Resources</span>
                <LuArrowRight />
              </div>
            </Link>
          </div>
        )}

        {/* Admin Cards */}
        {role === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              to="/dashboard/viewAllStudySession"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuCalendar />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Review Sessions Portal
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Approve incoming tutor sessions, assign registration fees ($0 for free), or provide rejection feedback.
                </p>
              </div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Review Sessions</span>
                <LuArrowRight />
              </div>
            </Link>

            <Link
              to="/dashboard/viewAllUser"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuUsers />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  User Management
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Search, filter, and modify account roles for students, tutors, and platform administrators.
                </p>
              </div>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <span>Manage Users</span>
                <LuArrowRight />
              </div>
            </Link>

            <Link
              to="/dashboard/viewAllMaterialsAdmin"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <LuBookOpen />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  All Uploaded Materials
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Inspect, moderate, and manage all study documents and Google Drive resources across the platform.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>Moderate Materials</span>
                <LuArrowRight />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;