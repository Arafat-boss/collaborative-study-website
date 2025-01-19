
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Modal = ({ sessionId, onClose, onSubmit }) => {
  const { isOpen, setIsModalOpen } = useAuth(false);
  const [tuitionFee, setTuitionFee] = useState("");
  const axiosPublic = useAxiosPublic();

 
  const handleSubmit = async () => {
    if (!tuitionFee) {
      toast.error("Please enter a tuition fee.");
      return;
    }
    try {
      await axiosPublic.patch(`/sessions/fee/${sessionId}`, {tuitionFee});
      toast.success("Session updated successfully!");
      refetch(); // Refresh data
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error("Failed to update session.");
    }


    onSubmit(sessionId, tuitionFee); // Pass sessionId and tuitionFee to parent
    setTuitionFee(""); // Reset input field
    setIsModalOpen(false); // Close modal
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-blue-200">
            <h3 className="font-bold text-lg">Modify You Fee.</h3>
            <p className="py-4">You can add tuition fee here.</p>
            <input
             type="number"
             placeholder="Enter Tuition Fee"
             className="input input-bordered input-info w-full max-w-xs"
             value={tuitionFee}
             onChange={(e) => setTuitionFee(e.target.value)}
            />
            <div className="modal-action">
              {/* update Modal Button */}
              <button className="btn" onClick={handleSubmit}>
                Update
              </button>
              {/* Close Modal Button */}
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
