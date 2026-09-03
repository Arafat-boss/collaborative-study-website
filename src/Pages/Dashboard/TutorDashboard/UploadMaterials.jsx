import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { LuUpload, LuX, LuLink, LuFileText, LuCheck, LuCircleAlert } from "react-icons/lu";

const img_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UploadMaterials = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

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

  const handleUploadMaterials = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const link = e.target.link.value;
    const uploadImage = e.target.fileUpload?.files?.[0];

    if (!link) {
      Swal.fire({
        icon: "warning",
        title: "Link Required",
        text: "Please provide a Google Drive / document link.",
      });
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = selectedSession.sessionImage || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600";

      if (uploadImage && img_hosting_key && img_hosting_key !== "sample_imgbb_key") {
        try {
          const formData = new FormData();
          formData.append("image", uploadImage);
          const imgResponse = await axios.post(img_hosting_api, formData);
          if (imgResponse.data?.success) {
            imageUrl = imgResponse.data.data.display_url;
          }
        } catch (imgErr) {
          console.warn("Image upload failed, using default:", imgErr);
        }
      }

      const materialData = {
        sessionId: selectedSession._id,
        sessionTitle: selectedSession.sessionTitle,
        tutorEmail: user.email,
        materialLink: link,
        materialImage: imageUrl,
        createdAt: new Date().toISOString()
      };

      const response = await axiosSecure.post("/materials", materialData);

      if (response.data?.insertedId || response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Materials Uploaded!",
          text: `Study materials for "${selectedSession.sessionTitle}" are now live for enrolled students.`,
          confirmButtonColor: "#2563eb",
        });
        closeModal();
      }
    } catch (error) {
      console.error("Error uploading materials:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error saving your study material.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Filter approved sessions
  const approvedSessions = sessions.filter((s) => s.status === "success");

  return (
    <div className="space-y-6">
      <SectionTitle
        header="Upload Session Study Materials"
        subHeader="Share PDFs, Google Drive folders, recorded lectures, and reading guides for your approved sessions."
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 animate-pulse space-y-3">
              <div className="aspect-video bg-gray-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : approvedSessions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedSessions.map((item) => (
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
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                      Approved
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {item.sessionTitle}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">
                    {item.sessionDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => handleUploadMaterials(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <LuUpload />
                  <span>Upload Materials</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-2">
          <LuFileText className="text-4xl mx-auto text-gray-400 dark:text-slate-500 mb-2" />
          <p className="font-bold text-gray-700 dark:text-slate-200 text-base">No Approved Sessions Available</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 max-w-sm mx-auto">
            You can upload study materials once your created study sessions are approved by an administrator.
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upload Study Resource</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate max-w-xs">
                  {selectedSession.sessionTitle}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <LuX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  Google Drive / Document URL *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <LuLink />
                  </div>
                  <input
                    type="url"
                    name="link"
                    required
                    placeholder="https://drive.google.com/..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  Optional Resource Cover Image
                </label>
                <input
                  type="file"
                  name="fileUpload"
                  accept="image/*"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 dark:file:bg-slate-800 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 text-xs text-gray-500 dark:text-slate-400 w-full"
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
                  disabled={isUploading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <LuUpload />
                  <span>{isUploading ? "Uploading..." : "Publish Material"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMaterials;
