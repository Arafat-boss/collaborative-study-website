import React, { useState } from "react"; 
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManagePersonalNotes = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedNote, setSelectedNote] = useState(null); // Selected note for update

  // Fetch all notes
  const { data: notes = [], refetch } = useQuery({
    queryKey: ["all-notes"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-notes/${user.email}`);
      return res.data;
    },
  });

  // Handle Delete Note with SweetAlert
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/all-notes/${id}`);
          if (res.status === 200) {
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

  // Handle Update Note (Open Modal)
  const handleUpdate = (note) => {
    setSelectedNote(note); // Set the selected note for updating
    setIsModalOpen(true); // Open the modal
  };

  // Close the Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null); // Clear selected note
  };

  // Handle Update Submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedNote = {
      title: form.title.value,
      description: form.description.value,
    };

    try {
      const res = await axiosPublic.put(`/all-notes/${selectedNote._id}`, updatedNote);
      if (res.status === 200) {
        toast.success("Note updated successfully!");
        refetch(); // Refresh notes
        closeModal(); // Close modal after update
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    }
  };

  return (
    <div>
      <SectionTitle
        header={"Manage Your Personal Notes"}
        subHeader={
          "You can manage personal notes by updating or deleting them easily from this page."
        }
      ></SectionTitle>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
          >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {note.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-600">
                  By {note.email}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">{note.description}</p>
            </div>

            {/* Update & Delete Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleUpdate(note)}
                className="px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-700"
              >
                Delete
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
              <h3 className="text-lg font-semibold">Update Note</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={selectedNote?.title}
                    className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    defaultValue={selectedNote?.description}
                    className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Update Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePersonalNotes;
