import React, { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { LuImage, LuPlus, LuCalendar, LuClock, LuUsers, LuFileText } from "react-icons/lu";

const img_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const CreateStudySession = () => {
  const secureAxios = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const sessionTitle = form.sessionTitle.value;
    const tutorName = user?.displayName || form.tutorName.value;
    const tutorEmail = user?.email || form.tutorEmail.value;
    const sessionImageFile = form.sessionImage?.files?.[0];
    const registrationStartDate = form.registrationStartDate.value;
    const registrationEndDate = form.registrationEndDate.value;
    const classStartTime = form.classStartTime.value;
    const classEndTime = form.classEndTime.value;
    const maxParticipant = form.maxParticipant.value;
    const sessionDescription = form.sessionDescription.value;
    const status = "pending";

    setIsLoading(true);

    try {
      let image_url = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800";

      // If an image file was provided and ImgBB key is configured, upload to ImgBB
      if (sessionImageFile && img_hosting_key && img_hosting_key !== "sample_imgbb_key") {
        try {
          const formData = new FormData();
          formData.append("image", sessionImageFile);
          const imgResponse = await axios.post(img_hosting_api, formData);
          if (imgResponse.data?.success) {
            image_url = imgResponse.data.data.display_url;
          }
        } catch (imgErr) {
          console.warn("ImgBB upload failed, falling back to default image:", imgErr);
        }
      }

      const sessionData = {
        sessionTitle,
        tutorName,
        tutorEmail,
        sessionImage: image_url,
        registrationStartDate,
        registrationEndDate,
        classStartTime,
        classEndTime,
        registrationFee: 0, // Admin sets this upon approval
        maxParticipant: parseInt(maxParticipant) || 20,
        sessionDescription,
        status,
        createdAt: new Date().toISOString()
      };

      const response = await secureAxios.post("/studySession", sessionData);

      if (response.data?.insertedId || response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Session Submitted!",
          text: `"${sessionTitle}" has been submitted for admin approval.`,
          confirmButtonColor: "#2563eb",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error creating study session:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: error.message || "Failed to create study session.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        header="Create a New Study Session"
        subHeader="Schedule a new interactive learning session, specify class timing, and submit for platform review."
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl p-6 sm:p-8 lg:p-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Session Title */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Session Title *
            </label>
            <input
              type="text"
              name="sessionTitle"
              required
              placeholder="e.g. Master Data Structures and Algorithms in Python"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Tutor Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Instructor Name
            </label>
            <input
              type="text"
              name="tutorName"
              readOnly
              value={user?.displayName || "Instructor"}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-gray-700 dark:text-slate-300 cursor-not-allowed"
            />
          </div>

          {/* Tutor Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Instructor Email
            </label>
            <input
              type="email"
              name="tutorEmail"
              readOnly
              value={user?.email || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-gray-700 dark:text-slate-300 cursor-not-allowed"
            />
          </div>

          {/* Session Cover Image */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Cover Image
            </label>
            <input
              type="file"
              name="sessionImage"
              accept="image/*"
              className="w-full file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 dark:file:bg-slate-800 file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-100 border border-gray-200 dark:border-slate-700 rounded-xl text-xs text-gray-500 dark:text-slate-400 cursor-pointer"
            />
          </div>

          {/* Registration Start Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Reg. Start Date *
            </label>
            <input
              type="date"
              name="registrationStartDate"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Registration End Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Reg. End Date *
            </label>
            <input
              type="date"
              name="registrationEndDate"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Max Participants */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Max Students Capacity
            </label>
            <input
              type="number"
              name="maxParticipant"
              placeholder="25"
              defaultValue={25}
              min="1"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Class Start Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Class Start Time *
            </label>
            <input
              type="time"
              name="classStartTime"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Class End Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Class End Time *
            </label>
            <input
              type="time"
              name="classEndTime"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Registration Fee Note */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Initial Fee
            </label>
            <input
              type="text"
              readOnly
              value="$0 (Admin sets fee upon review)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-gray-500 dark:text-slate-400 font-semibold cursor-not-allowed"
            />
          </div>

          {/* Session Description */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Detailed Session Outline & Description *
            </label>
            <textarea
              name="sessionDescription"
              required
              rows="4"
              placeholder="Outline topics covered, target audience, prerequisites, and learning outcomes..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 lg:col-span-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LuPlus className="text-xl" />
              <span>{isLoading ? "Submitting Session..." : "Submit Session for Approval"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateStudySession;
