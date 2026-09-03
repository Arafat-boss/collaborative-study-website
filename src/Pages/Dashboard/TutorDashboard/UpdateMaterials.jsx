import React, { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { LuArrowLeft, LuSave, LuLink } from "react-icons/lu";

const UpdateMaterials = () => {
  const item = useLoaderData() || {};
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [link, setLink] = useState(item.materialLink || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!link) {
      toast.error("Please enter a valid link.");
      return;
    }

    try {
      setIsUpdating(true);
      const res = await axiosSecure.patch(`/materials/${item._id}`, {
        materialLink: link,
      });

      if (res.data?.modifiedCount > 0 || res.status === 200) {
        toast.success("Material updated successfully!");
        navigate("/dashboard/viewAllMaterials");
      } else {
        toast.error("No changes made.");
      }
    } catch (error) {
      console.error("Error updating material:", error);
      toast.error("Failed to update material.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Link
        to="/dashboard/viewAllMaterials"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
      >
        <LuArrowLeft /> Back to My Materials
      </Link>

      <SectionTitle
        header="Update Study Material"
        subHeader="Modify resource URLs and links for your enrolled students."
      />

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-5">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Session Title
            </label>
            <input
              type="text"
              readOnly
              value={item.sessionTitle || "Study Material"}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm font-semibold text-gray-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Google Drive / Document Link *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <LuLink />
              </div>
              <input
                type="url"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <LuSave />
              <span>{isUpdating ? "Updating..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMaterials;