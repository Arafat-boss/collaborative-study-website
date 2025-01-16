import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

const img_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UploadMaterials = () => {
  const { user } = useAuth();
  const [specificUser, setSpecificUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const axiosPublic = useAxiosPublic();

  // Fetch user-specific data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosPublic.get(`/studySession/${user.email}`);
        setSpecificUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [axiosPublic, user?.email]);

  // Modal control
  const handleUploadMaterials = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedSession(null); // Reset the selected session
  };

  // Handle upload materials
  const handelUploadModal = async (e) => {
    e.preventDefault();
    const link = e.target.link.value; // Fetch Google Drive link
    const uploadImage = e.target.fileUpload.files[0]; // Fetch file input

    if (!link || !uploadImage) {
      Swal.fire({
        icon: "error",
        title: "Please fill out all fields!",
        text: "Google Drive link and file upload are mandatory.",
      });
      return;
    }

    try {
      // Upload file to imgbb
      const formData = new FormData();
      formData.append("image", uploadImage);

      const imgResponse = await axios.post(img_hosting_api, formData);

      if (imgResponse.data.success) {
        const imageUrl = imgResponse.data.data.display_url;

        // Prepare material data
        const materialData = {
          sessionId: selectedSession._id,
          sessionTitle: selectedSession.sessionTitle,
          tutorEmail: selectedSession.tutorEmail,
          materialLink: link,
          materialImage: imageUrl,
        };

        // Send data to the server
        const response = await axiosPublic.post("/materials", materialData);

        if (response.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Materials for "${selectedSession.sessionTitle}" uploaded successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          closeModal(); // Close the modal
        }
      }
    } catch (error) {
      console.error("Error uploading materials:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text: "There was an error uploading your materials. Please try again.",
      });
    }
  };

  return (
    <div>
      <SectionTitle
        header={"Upload materials"}
        subHeader={
          'The "Upload Materials" section allows tutors to share essential study resources like PDFs, videos, and presentations, ensuring students have easy access to comprehensive learning materials for their sessions.'
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        {specificUser.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-lg rounded-lg overflow-hidden p-4"
          >
            <figure className="overflow-hidden">
              <img
                src={item.sessionImage}
                alt={item.sessionTitle}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="text-center mt-4">
              <p
                className={`text-sm font-medium ${
                  item.status === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                <span className="badge bg-blue-200">{item.status}</span>
              </p>
              <h2 className="text-lg font-bold my-2">{item.sessionTitle}</h2>
              <button
                onClick={() => handleUploadMaterials(item)}
                className="btn btn-primary"
              >
                Upload Materials
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                Upload Materials for {selectedSession?.sessionTitle}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
               <IoIosCloseCircle size={30} className="text-red-500"/>
              </button>
            </div>
            <div className="flex justify-between px-5 py-3 font-semibold">
              <p>{selectedSession.tutorName}</p>
              <p>{selectedSession.tutorEmail}</p>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <form onSubmit={handelUploadModal}>
                <div className="mb-4">
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Materials Google Drive Link
                  </label>
                  <input
                    type="url"
                    name="link"
                    id="link"
                    className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Google Drive Link"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="fileUpload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload File
                  </label>
                  <input
                    type="file"
                    name="fileUpload"
                    id="fileUpload"
                    className="mt-1 block w-full"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMaterials;
