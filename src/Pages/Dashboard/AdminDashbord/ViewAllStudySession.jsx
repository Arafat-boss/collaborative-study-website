import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";

const ViewAllStudySession = () => {
  const axiosPublic = useAxiosPublic();
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await axiosPublic.get("/studySession");
      return res.data;
    },
  });
  //   console.log(status);
  // Filtering only pending status sessions
  const pendingSessions = sessions.filter(
    (session) => session.status === "pending"
  );
  const acceptSessions = sessions.filter(
    (session) => session.status === "success"
  );
  const rejectSessions = sessions.filter(
    (session) => session.status === "reject"
  );

  //handleAccept
  const handleAccept = (sessionId) => {
    console.log(sessionId);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you Accept this session",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept.",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.patch(`/sessions/success/${sessionId}`).then((res) => {
            refetch();

            Swal.fire({
              title: "Accepted!",
              text: "Your Session has been Accepted.",
              icon: "success",
            });
          });
        }
      });
      //   alert(`Session with ID ${sessionId} has been rejected!`);
    } catch (error) {
      console.error("Error rejecting session:", error);
      toast.error('"Failed to reject session. Please try again."');
    }
  };

  // Handle Reject
  const handleReject = async (sessionId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you reject this session",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Rejected.",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.patch(`/sessions/reject/${sessionId}`).then((res) => {
            refetch();

            Swal.fire({
              title: "Rejected!",
              text: "Your Session has been Rejected.",
              icon: "success",
            });
          });
        }
      });
      //   alert(`Session with ID ${sessionId} has been rejected!`);
    } catch (error) {
      console.error("Error rejecting session:", error);
      toast.error('"Failed to reject session. Please try again."');
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
          <p className="flex justify-center  text-red-500">
            No pending sessions found.
          </p>
        )}
      </div>

      {/*============Accept section=========== */}
      <div className="py-10">
        <h4 className="text-xl font-bold mb-4">
          Reject Study Sessions: {acceptSessions.length}
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
                      <button
                        className="bg-blue-300 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                        onClick={() => handleAccept(session._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleReject(session._id)}
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
          <p className="flex justify-center text-red-500">
            No Rejected sessions found.
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
          <p className="flex justify-center text-red-500">
            No Rejected sessions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewAllStudySession;
