import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import { useState } from "react";
import useVIewAllStudy from "../../../Hooks/useVIewAllStudy";
import { Link } from "react-router-dom";

const ViewAllStudySession = () => {
  const axiosPublic = useAxiosPublic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [registrationFee, setRegistrationFee] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [sessions, refetch] = useVIewAllStudy();

  // Filtering only pending status sessions========
  const pendingSessions = sessions.filter(
    (session) => session.status === "pending"
  );
  const acceptSessions = sessions.filter(
    (session) => session.status === "success"
  );
  const rejectSessions = sessions.filter(
    (session) => session.status === "reject"
  );

  //Handel Accept=======================
  const handleAccept = (sessionId) => {
    setSelectedSessionId(sessionId);
    setIsModalOpen(true);
  };

  //handel update registration fee=====================
  const handleUpdateSession = async () => {
    if (!registrationFee) {
      toast.error("Please enter a registration fee.");
      return;
    }

    try {
      const res = await axiosPublic.patch(
        `/sessions/success/${selectedSessionId}`,
        { registrationFee }
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Session accepted and fee updated successfully!");
        setIsModalOpen(false);
        setRegistrationFee("");
      }
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error("Failed to update session. Please try again.");
    }
  };

   // Handle Reject====rejection Reason======================
   const handleReject = (sessionId) => {
    setSelectedSessionId(sessionId);
    setIsRejectModalOpen(true);
  };
  const handleRejectSession = async () => {
    if (!rejectionReason) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    try {
      const res = await axiosPublic.patch(
        `/sessions/reject/${selectedSessionId}`,
        { rejectionReason }
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Session rejected with a reason.");
        setIsRejectModalOpen(false);
        setRejectionReason("");
      }
    } catch (error) {
      console.error("Error rejecting session:", error);
      toast.error("Failed to reject session. Please try again.");
    }
  };

  //handel delete====================================
  const handleDelete = async (sessionId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this session permanently?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      });

      if (result.isConfirmed) {
        const response = await axiosPublic.delete(
          `/deleted/session/${sessionId}`
        );
        if (response.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The session has been deleted.", "success");
          refetch();
        } else {
          toast.error("Failed to delete the session. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("An error occurred while deleting the session.");
    }
  };

  return (
    <div className="p-4 ">
      <SectionTitle
        header={"View All Study session"}
        subHeader={
          "The View All Study Sessions page allows users to search for and participate in study sessions. It shows scheduled meetings, including information such as topic, date, time, and participants."
        }
      ></SectionTitle>
      <h4 className="text-xl font-bold mb-4">
        Pending Study Sessions: {pendingSessions.length}
      </h4>
      {/*============Accept section=========== */}
      <div>
        {pendingSessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Session Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Tutor</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Start Time
                  </th>
                  <th className="border border-gray-300 px-4 py-2">End Time</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSessions.map((session) => (
                  <tr key={session._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {session.sessionTitle}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.tutorName} <br /> ({session.tutorEmail})
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.classStartTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.classEndTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                        onClick={() => handleAccept(session._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleReject(session._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="flex justify-center font-semibold text-red-500">
            No pending sessions found.
          </p>
        )}
      </div>
      {/*============Approved section=========== */}
      <div className="py-10">
        <h4 className="text-xl font-bold mb-4">
          Approved Study Sessions: {acceptSessions.length}
        </h4>
        {acceptSessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Session Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Tutor</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Start Time
                  </th>
                  <th className="border border-gray-300 px-4 py-2">End Time</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {acceptSessions.map((session) => (
                  <tr key={session._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {session.sessionTitle}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.tutorName} <br /> ({session.tutorEmail})
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.classStartTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.classEndTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-green-500 font-semibold">
                      <p>{session.status}</p>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Link to={`viewStudyUpdate/${session._id}`}>
                        <button className="bg-blue-300 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">
                          Update
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(session._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="flex justify-center font-semibold text-red-500">
            No Approved sessions found.
          </p>
        )}
      </div>
      {/*============reject section=========== */}
      <div>
        <h4 className="text-xl font-bold mb-4">
          Reject Study Sessions: {rejectSessions.length}
        </h4>
        {rejectSessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Session Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Tutor</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Start Time
                  </th>
                  <th className="border border-gray-300 px-4 py-2">End Time</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rejectSessions.map((session) => (
                  <tr key={session._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {session.sessionTitle}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.tutorName} <br /> ({session.tutorEmail})
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.classStartTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.classEndTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-red-500 font-semibold">
                      <p>{session.status}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="flex justify-center font-semibold text-red-500">
            No Rejected sessions found.
          </p>
        )}
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-blue-100 p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Set Registration Fee</h3>
            <p className="py-2">
              Please set the registration fee to ensure better participation and
              affordability for all attendees
            </p>
            <input
              type="number"
              placeholder="Enter Registration Fee"
              className="border border-gray-300 p-2 rounded w-full mb-4"
              value={registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                onClick={handleUpdateSession}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-blue-100 p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Provide Rejection Reason
            </h3>
            <textarea
              placeholder="Enter Rejection Reason"
              className="border border-gray-300 p-2 rounded w-full mb-4"
              rows="4"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                onClick={handleRejectSession}
              >
                Reject
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsRejectModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllStudySession;
