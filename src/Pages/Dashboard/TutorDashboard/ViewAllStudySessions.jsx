import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LuPlus, LuCalendar, LuClock, LuUsers, LuCircleAlert, LuSend } from "react-icons/lu";

const ViewAllStudySessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosPublic.get(`/studySession/${user?.email}`);
        setSessions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching tutor sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [axiosPublic, user?.email]);

  const handleSendApprovalRequest = async (id) => {
    try {
      const response = await axiosPublic.patch(`/studySession/${id}`, {
        status: "pending",
      });

      if (response.data.modifiedCount > 0 || response.status === 200) {
        toast.success("Approval re-request submitted!");
        setSessions((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status: "pending" } : s))
        );
      } else {
        toast.error("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error resending approval:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle
          header="My Created Study Sessions"
          subHeader="Track approval status, schedule timings, and feedback from administrators on your sessions."
        />
        <Link
          to="/dashboard/createStudySession"
          className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center gap-1.5"
        >
          <LuPlus className="text-lg" />
          <span>New Session</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 animate-pulse space-y-3">
              <div className="aspect-video bg-gray-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-2/3" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : sessions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((item) => {
            const statusBadge =
              item.status === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                : item.status === "reject"
                ? "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";

            return (
              <div
                key={item._id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <img
                      src={item.sessionImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"}
                      alt={item.sessionTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${statusBadge}`}>
                        {item.status === "success" ? "Approved" : item.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                      {item.sessionTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 line-clamp-2">
                      {item.sessionDescription}
                    </p>

                    <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300 pt-2 border-t border-gray-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500">
                          <LuCalendar /> Registration:
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-slate-200">
                          {item.registrationStartDate} - {item.registrationEndDate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500">
                          <LuClock /> Class Timing:
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-slate-200">
                          {item.classStartTime} - {item.classEndTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500">
                          <LuUsers /> Capacity:
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-slate-200">
                          {item.maxParticipant} Students
                        </span>
                      </div>
                    </div>

                    {item.rejectionReason && item.status === "reject" && (
                      <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 space-y-1 text-xs">
                        <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1">
                          <LuCircleAlert /> Admin Feedback:
                        </span>
                        <p className="text-rose-600 dark:text-rose-300">{item.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {item.status === "reject" && (
                    <button
                      onClick={() => handleSendApprovalRequest(item._id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <LuSend />
                      <span>Resend Approval Request</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 max-w-lg mx-auto">
          <p className="font-bold text-gray-800 dark:text-white text-lg">No Study Sessions Created Yet</p>
          <p className="text-xs text-gray-400 dark:text-slate-500">
            Publish your first session to start collaborating and sharing resources with students.
          </p>
          <Link
            to="/dashboard/createStudySession"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20"
          >
            <LuPlus /> Create Your First Session
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewAllStudySessions;
