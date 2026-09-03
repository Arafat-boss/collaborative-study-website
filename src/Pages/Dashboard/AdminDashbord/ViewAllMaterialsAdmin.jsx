import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { LuExternalLink, LuTrash2, LuFileText, LuUser } from "react-icons/lu";

const ViewAllMaterialsAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allMaterials = [], refetch, isLoading } = useQuery({
    queryKey: ["allMaterialsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allMaterials");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Material?",
      text: "This resource file will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/materials/${id}`);
        if (res.data.deletedCount > 0 || res.status === 200) {
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

  return (
    <div className="space-y-6">
      <SectionTitle
        header="All Uploaded Study Materials"
        subHeader="Review, inspect, and moderate all study guides, documents, and resources uploaded by platform instructors."
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-gray-100 dark:border-slate-800 animate-pulse space-y-3">
              <div className="h-36 bg-gray-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : allMaterials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allMaterials.map((material) => (
            <div
              key={material._id || material.sessionId}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <img
                    src={material.materialImage || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400"}
                    alt={material.sessionTitle || "Material"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                    {material.sessionTitle || "Untitled Resource"}
                  </h3>
                  
                  <div className="space-y-1 text-xs text-gray-500 dark:text-slate-400">
                    <p className="flex items-center gap-1.5 truncate">
                      <LuUser className="text-gray-400 dark:text-slate-500 flex-shrink-0" />
                      <span>{material.tutorEmail}</span>
                    </p>
                    <p className="font-mono text-[11px] text-gray-400 dark:text-slate-500 truncate">
                      Session ID: {material.sessionId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-gray-100 dark:border-slate-800 mt-4">
                {material.materialLink ? (
                  <a
                    href={material.materialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                  >
                    <LuExternalLink />
                    <span>Open Link</span>
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 dark:text-slate-500">No link attached</span>
                )}

                <button
                  onClick={() => handleDelete(material._id)}
                  className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg text-sm transition-colors"
                  title="Delete Material"
                >
                  <LuTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <LuFileText className="text-4xl mx-auto text-gray-400 dark:text-slate-500 mb-2" />
          <p className="font-semibold text-gray-700 dark:text-slate-200">No study materials found</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Uploaded materials from tutors will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ViewAllMaterialsAdmin;
