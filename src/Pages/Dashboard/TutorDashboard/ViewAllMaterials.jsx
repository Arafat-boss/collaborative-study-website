import React, { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUploadeMaterials from "../../../Hooks/useUploadeMaterials";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { LuExternalLink, LuTrash2, LuPencil, LuFileText, LuX, LuSave } from "react-icons/lu";

const ViewAllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const [materials, refetch] = useUploadeMaterials();
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Material?",
      text: "This resource will be permanently removed for your students.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/materials/${id}`);
        if (res.data?.deletedCount > 0 || res.status === 200) {
          toast.success("Material deleted successfully!");
          refetch();
        } else {
          toast.error("Failed to delete the material.");
        }
      } catch (error) {
        console.error("Error deleting material:", error);
        toast.error("An error occurred while deleting the material.");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const link = e.target.link.value;
    if (!link) {
      toast.error("Please enter a valid link.");
      return;
    }

    try {
      setIsUpdating(true);
      const res = await axiosSecure.patch(`/materials/${editingMaterial._id}`, {
        materialLink: link,
      });

      if (res.data?.modifiedCount > 0 || res.status === 200) {
        toast.success("Material updated successfully!");
        setEditingMaterial(null);
        refetch();
      } else {
        toast.error("No changes were made.");
      }
    } catch (err) {
      console.error("Error updating material:", err);
      toast.error("Failed to update material link.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        header="My Uploaded Study Materials"
        subHeader="Manage and update study resources, links, and documents uploaded for your students."
      />

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <img
                    src={item.materialImage || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600"}
                    alt={item.sessionTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                    {item.sessionTitle || "Study Material"}
                  </h3>

                  <div className="text-xs text-gray-500 dark:text-slate-400 space-y-1">
                    <p className="font-mono text-[11px] text-gray-400 dark:text-slate-500">
                      ID: {item.sessionId}
                    </p>
                    <div className="pt-1">
                      <span className="font-semibold text-gray-700 dark:text-slate-300">Link: </span>
                      <a
                        href={item.materialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline truncate inline-block max-w-[200px] align-bottom"
                      >
                        {item.materialLink}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-2 border-t border-gray-100 dark:border-slate-800 mt-2">
                <button
                  onClick={() => setEditingMaterial(item)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LuPencil /> Update Link
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl text-base transition-colors"
                  title="Delete Material"
                >
                  <LuTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-2">
          <LuFileText className="text-4xl mx-auto text-gray-400 dark:text-slate-500 mb-2" />
          <p className="font-bold text-gray-700 dark:text-slate-200 text-base">No Materials Uploaded Yet</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 max-w-sm mx-auto">
            Go to the "Upload Materials" tab to add learning resources for your approved study sessions.
          </p>
        </div>
      )}

      {/* Quick Edit Modal */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Update Material Link</h3>
              <button
                onClick={() => setEditingMaterial(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <LuX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  Google Drive / Document Link
                </label>
                <input
                  type="url"
                  name="link"
                  required
                  defaultValue={editingMaterial.materialLink}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)}
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
                  <span>{isUpdating ? "Saving..." : "Save Link"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllMaterials;
