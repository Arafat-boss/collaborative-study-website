import React, { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { LuPencil, LuTrash2, LuPlus, LuFileText, LuX, LuSave } from "react-icons/lu";

const ManagePersonalNotes = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch all notes for the current user
  const { data: notes = [], refetch, isLoading } = useQuery({
    queryKey: ["all-notes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-notes/${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Note?",
      text: "This note will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/all-notes/${id}`);
          if (res.status === 200 || res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your note has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          console.error("Error deleting note:", error);
          Swal.fire("Error!", "Failed to delete the note.", "error");
        }
      }
    });
  };

  const handleUpdate = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedNote = {
      title: form.title.value,
      description: form.description.value,
    };

    setIsUpdating(true);
    try {
      const res = await axiosPublic.put(`/all-notes/${selectedNote._id}`, updatedNote);
      if (res.status === 200 || res.data?.modifiedCount > 0) {
        toast.success("Note updated successfully!");
        refetch();
        closeModal();
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SectionTitle
          header="Manage Personal Study Notes"
          subHeader="Organize, edit, or delete your personal revision notes and key insights."
        />
        <Link
          to="/dashboard/createNote"
          className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center gap-1.5"
        >
          <LuPlus className="text-lg" />
          <span>New Note</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-16 bg-gray-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                  {note.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 line-clamp-4 leading-relaxed whitespace-pre-line">
                  {note.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleUpdate(note)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LuPencil /> Edit Note
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl text-base transition-colors"
                  title="Delete Note"
                >
                  <LuTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-3">
          <LuFileText className="text-4xl mx-auto text-gray-400 dark:text-slate-500 mb-2" />
          <p className="font-bold text-gray-700 dark:text-slate-200 text-base">No Personal Notes Found</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 max-w-sm mx-auto">
            You haven't written any personal study notes yet. Create one to organize your learning!
          </p>
          <Link
            to="/dashboard/createNote"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700"
          >
            <LuPlus /> Create Your First Note
          </Link>
        </div>
      )}

      {/* Update Note Modal */}
      {isModalOpen && selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Study Note</h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <LuX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  Note Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={selectedNote.title}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  Detailed Notes & Content
                </label>
                <textarea
                  name="description"
                  rows={5}
                  required
                  defaultValue={selectedNote.description}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <LuSave />
                  <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePersonalNotes;
