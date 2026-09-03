import React, { useContext, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LuPlus, LuMail, LuFileText } from "react-icons/lu";

const CreateNote = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!user?.email) {
      toast.error("Please log in to create personal notes.");
      return;
    }

    const noteData = {
      email: user.email,
      title: data.title,
      description: data.description,
    };

    setIsSubmitting(true);
    try {
      const response = await axiosPublic.post("/all-notes", noteData);
      if (
        response.data?.insertedId ||
        response.status === 200 ||
        response.status === 201
      ) {
        toast.success("Study note saved successfully!");
        reset();
        navigate("/dashboard/personalNotes");
      } else {
        toast.error("Could not save note. Server returned unexpected response.");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      const msg = error.response?.data?.message || error.message || "Failed to save note.";
      toast.error(`Error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <SectionTitle
        header="Create Personal Study Note"
        subHeader="Jot down important exam points, lecture summaries, questions, or key concepts for your revision."
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl p-6 sm:p-8 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Read-Only Email Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Student Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <LuMail />
              </div>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-gray-600 dark:text-slate-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Title Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Note Title *
            </label>
            <input
              {...register("title", { required: "Note title is required" })}
              type="text"
              placeholder="e.g. Chapter 4: Database Normalization Concepts"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs font-medium">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Note Content / Notes *
            </label>
            <textarea
              rows="6"
              {...register("description", {
                required: "Note content is required",
              })}
              placeholder="Write your detailed summary, formulas, or bullet points here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-xs font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LuPlus className="text-lg" />
              <span>{isSubmitting ? "Saving Note..." : "Save Note"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
