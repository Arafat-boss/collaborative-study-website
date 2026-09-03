import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import useVIewAllStudy from "../../../Hooks/useVIewAllStudy";
import { Link } from "react-router-dom";
import { LuCheck, LuX, LuTrash2, LuClock, LuCircleX } from "react-icons/lu";

const ViewAllStudySession = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("pending");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [registrationFee, setRegistrationFee] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [sessions = [], refetch] = useVIewAllStudy();

  const pendingSessions = sessions.filter((s) => s.status === "pending");
  const acceptSessions = sessions.filter((s) => s.status === "success");
  const rejectSessions = sessions.filter((s) => s.status === "reject");

  // Handle Accept (Open Fee Modal)
  const handleAccept = (sessionId) => {
    setSelectedSessionId(sessionId);
    setRegistrationFee(0);
    setIsModalOpen(true);
  };

  // Update session to Approved with fee
  const handleUpdateSession = async () => {
    if (registrationFee === "" || isNaN(Number(registrationFee))) {
      toast.error("Please enter a valid registration fee ($0 for Free).");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/sessions/success/${selectedSessionId}`, {
        registrationFee: Number(registrationFee),
      });
      if (res.data.modifiedCount > 0 || res.status === 200) {
        refetch();
        toast.success("Study session approved successfully!");
        setIsModalOpen(false);
        setRegistrationFee("");
      }
    } catch (error) {
      console.error("Error approving session:", error);
      toast.error("Failed to approve session. Please try again.");
    }
  };

  // Handle Reject Modal
  const handleReject = (sessionId) => {
    setSelectedSessionId(sessionId);
    setIsRejectModalOpen(true);
  };

  const handleRejectSession = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason for the instructor.");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/sessions/reject/${selectedSessionId}`, {
        rejectionReason,
      });
      if (res.data.modifiedCount > 0 || res.status === 200) {
        refetch();
        toast.success("Session marked as rejected.");
        setIsRejectModalOpen(false);
        setRejectionReason("");
      }
    } catch (error) {
      console.error("Error rejecting session:", error);
      toast.error("Failed to reject session.");
    }
  };

  // Delete Session
  const handleDelete = async (sessionId) => {
    const result = await Swal.fire({
      title: "Delete Study Session?",
      text: "This will permanently remove the study session from the platform.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/deleted/session/${sessionId}`);
        if (response.data.deletedCount > 0 || response.status === 200) {
          Swal.fire("Deleted!", "The session has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.error("Error deleting session:", error);
        toast.error("Failed to delete the session.");
      }
    }
  };

  const renderTable = (list, type) => {
    if (list.length === 0) {
      return (
        <div className="py-12 text-center text-gray-500 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-900/60 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
          No {type} study sessions found.
        </div>
      );
    }

    return (
      <div className="overflow-x-auto w-full rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-gray-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
              <th className="py-3.5 px-4 sm:px-6">Session Title</th>
              <th className="py-3.5 px-4 sm:px-6">Instructor</th>
              <th className="py-3.5 px-4 sm:px-6">Timing</th>
              <th className="py-3.5 px-4 sm:px-6">Fee</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm text-gray-700 dark:text-slate-300">
            {list.map((session) => (
              <tr key={session._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 px-4 sm:px-6 font-semibold text-gray-900 dark:text-white min-w-[160px]">
                  {session.sessionTitle}
                </td>

                <td className="py-4 px-4 sm:px-6 text-xs text-gray-600 dark:text-slate-300 min-w-[150px]">
                  <div className="font-bold text-gray-800 dark:text-white">{session.tutorName}</div>
                  <div className="text-gray-400 dark:text-slate-500 truncate max-w-[150px]">{session.tutorEmail}</div>
                </td>

                <td className="py-4 px-4 sm:px-6 text-xs text-gray-600 dark:text-slate-300 min-w-[140px]">
                  <div>{session.classStartTime} - {session.classEndTime}</div>
                </td>

                <td className="py-4 px-4 sm:px-6 text-xs font-bold text-gray-900 dark:text-white min-w-[80px]">
                  {session.registrationFee === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                  ) : (
                    `$${session.registrationFee || 0}`
                  )}
                </td>

                <td className="py-4 px-4 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {type === "pending" && (
                      <>
                        <button
                          onClick={() => handleAccept(session._id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                        >
                          <LuCheck /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(session._id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                        >
                          <LuX /> Reject
                        </button>
                      </>
                    )}

                    {type === "success" && (
                      <>
                        <Link
                          to={`viewStudyUpdate/${session._id}`}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 text-xs font-semibold"
                        >
                          Edit Fee
                        </Link>
                        <button
                          onClick={() => handleDelete(session._id)}
                          className="p-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-base"
                          title="Delete Session"
                        >
                          <LuTrash2 />
                        </button>
                      </>
                    )}

                    {type === "reject" && (
                      <button
                        onClick={() => handleDelete(session._id)}
                        className="p-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-base"
                        title="Delete Session"
                      >
                        <LuTrash2 />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        header="Study Sessions Review Portal"
        subHeader="Review incoming study sessions, approve with fee structures, give feedback, or manage published courses."
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 w-max shadow-sm">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "pending"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/25"
              : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <LuClock />
          <span>Pending ({pendingSessions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("success")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "success"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
              : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <LuCheck />
          <span>Approved ({acceptSessions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("reject")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "reject"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
              : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <LuCircleX />
          <span>Rejected ({rejectSessions.length})</span>
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="space-y-4">
        {activeTab === "pending" && renderTable(pendingSessions, "pending")}
        {activeTab === "success" && renderTable(acceptSessions, "success")}
        {activeTab === "reject" && renderTable(rejectSessions, "reject")}
      </div>

      {/* Approve / Fee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 border border-gray-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Approve Session & Set Fee</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Set the registration fee for this study session. Enter <strong>0</strong> for a free session.
            </p>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                Registration Fee ($)
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder="0"
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSession}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20"
              >
                Approve Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 border border-gray-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reject Session</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Please explain to the instructor why this session was rejected so they can revise and resubmit.
            </p>
            <textarea
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g. Schedule conflicts, incomplete description, or missing requirements..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSession}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllStudySession;
