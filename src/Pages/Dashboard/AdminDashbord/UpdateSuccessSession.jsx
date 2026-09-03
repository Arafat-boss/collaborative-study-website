import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import { LuArrowLeft, LuDollarSign, LuSave } from "react-icons/lu";

const UpdateSuccessSession = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [registrationFee, setRegistrationFee] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axiosPublic.get(`/study/${id}`);
        if (data) {
          setSessionDetails(data);
          setRegistrationFee(data.registrationFee ?? 0);
        }
      } catch (err) {
        console.error("Error loading session:", err);
        toast.error("Failed to load session details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSession();
    }
  }, [id, axiosPublic]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (registrationFee === "" || isNaN(Number(registrationFee))) {
      toast.error("Please enter a valid registration fee.");
      return;
    }

    try {
      setIsUpdating(true);
      const res = await axiosSecure.patch(`/sessions/success/${id}`, {
        registrationFee: Number(registrationFee),
      });
      if (res.data.modifiedCount > 0 || res.status === 200) {
        toast.success("Registration fee updated successfully!");
        navigate("/dashboard/viewAllStudySession");
      } else {
        toast.error("No changes were made.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update session.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-slate-400">
        Loading session details...
      </div>
    );
  }

  if (!sessionDetails) {
    return (
      <div className="py-16 text-center text-red-500 space-y-4">
        <p>Session not found.</p>
        <Link
          to="/dashboard/viewAllStudySession"
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-bold"
        >
          <LuArrowLeft /> Back to All Study Sessions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Link
        to="/dashboard/viewAllStudySession"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <LuArrowLeft /> Back to Study Sessions
      </Link>

      <SectionTitle
        header="Update Registration Fee"
        subHeader="Modify pricing and access fee structure for this approved session."
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Read Only Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                Session Title
              </label>
              <input
                type="text"
                readOnly
                value={sessionDetails.sessionTitle || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-gray-800 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                Instructor
              </label>
              <input
                type="text"
                readOnly
                value={`${sessionDetails.tutorName} (${sessionDetails.tutorEmail})`}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-600 dark:text-slate-300 truncate"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                Class Timings
              </label>
              <input
                type="text"
                readOnly
                value={`${sessionDetails.classStartTime} - ${sessionDetails.classEndTime}`}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-600 dark:text-slate-300"
              />
            </div>
          </div>

          {/* Editable Fee */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Registration Fee ($)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <LuDollarSign />
              </div>
              <input
                type="number"
                min="0"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
                placeholder="0"
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-slate-500">
              Enter 0 to make this study session free for all students.
            </p>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <LuSave className="text-lg" />
            <span>{isUpdating ? "Saving..." : "Save Updated Fee"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSuccessSession;
