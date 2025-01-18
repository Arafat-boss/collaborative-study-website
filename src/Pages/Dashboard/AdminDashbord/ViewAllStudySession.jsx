import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ViewAllStudySession = () => {
  const axiosPublic = useAxiosPublic();
  const { data: sessions = [] } = useQuery({
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
    (session) => session.status === "pending"
  );
  const rejectSessions = sessions.filter(
    (session) => session.status === "reject"
  );

  return (
    <div className="p-4">
      <h4 className="text-xl font-bold mb-4">Pending Study Sessions</h4>
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
          <p className="text-gray-500">No pending sessions found.</p>
        )}
      </div>

      <div>
        <h4 className="text-xl font-bold mb-4">Reject Study Sessions</h4>
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
                    <td className="border border-gray-300 px-4 py-2">
                      <p>{session.status}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-500">No Rejected sessions found.</p>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default ViewAllStudySession;
