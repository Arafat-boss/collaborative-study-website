

import { useParams, useNavigate } from "react-router-dom";
import useVIewAllStudy from "../../../Hooks/useVIewAllStudy";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useState, useEffect } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const UpdateSuccessSession = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [sessions] = useVIewAllStudy();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [registrationFee, setRegistrationFee] = useState("");

  // Fetch specific session details based on ID
  useEffect(() => {
    const fetchSession = async () => {
      const session = sessions.find((session) => session._id === id);
      if (session) {
        setSessionDetails(session);
        setRegistrationFee(session.registrationFee || "");
      } else {
        toast.error("Session not found!");
        navigate("/dashboard/viewAllStudySession");
      }
    };

    fetchSession();
  }, [id, sessions, navigate]);

  const handleUpdate = async () => {
    if (!registrationFee) {
      toast.error("Please enter a registration fee.");
      return;
    }

    try {
      const res = await axiosPublic.patch(`/sessions/success/${id}`, {
        registrationFee,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Session updated successfully!");
        navigate("/dashboard/viewAllStudySession");
      } else {
        toast.error("No changes made to the session.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update session. Please try again.");
    }
  };

  if (!sessionDetails) {
    return <div>Loading session details...</div>;
  }

  return (
    
      <div>
        <SectionTitle header={"Update Your Success Session"} />


        <div className="p-4 w-8/12 mx-auto border rounded shadow-md bg-blue-100">
          <h3 className="text-lg font-bold mb-4">Session Details</h3>

          <div className="lg:flex gap-5">
            <div className="mb-4">
              <label className="block font-medium mb-2">Session Title:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full mb-2"
                value={sessionDetails.sessionTitle}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Tutor:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full mb-2"
                value={`(${sessionDetails.tutorEmail})`}
                readOnly
              />
            </div>
          </div>
          <div className="lg:flex gap-5">
            <div className="mb-4">
              <label className="block font-medium mb-2">Start Time:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full mb-2"
                value={sessionDetails.classStartTime}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">End Time:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full mb-2"
                value={sessionDetails.classEndTime}
                readOnly
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-2">
              You can change the Registration Fee, If you want
            </label>
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-full mb-4"
              value={registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
  );
};

export default UpdateSuccessSession;
