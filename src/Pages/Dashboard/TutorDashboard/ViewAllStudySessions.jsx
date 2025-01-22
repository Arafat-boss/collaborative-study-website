// import React, { useEffect, useState } from "react";
// import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import useAuth from "../../../Hooks/useAuth";

// const ViewAllStudySessions = () => {
//   const { user } = useAuth();
//   const [specificUser, setSpecificUser] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axiosPublic.get(`/studySession/${user.email}`);
//         setSpecificUser(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchData();
//     }
//   }, [axiosPublic, user?.email]);

//   return (
//     <div>
//       <SectionTitle
//         header={"View All Study Sessions"}
//         subHeader={`The "View All Study Sessions" page offers filters for subjects, tutors, timings, and registration status, alongside highlights like popular, upcoming, and recent sessions, ensuring quick access to personalized learning opportunities.`}
//       />

//       {/* Conditional rendering using ternary operator */}
//       {loading ? (
//         <p className="flex justify-center text-blue-500 font-semibold">
//           Loading study sessions...
//         </p>
//       ) : specificUser.length > 0 ? (
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
//           {specificUser.map((item) => (
//             <div
//               key={item._id}
//               className="card group bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <figure className="overflow-hidden">
//                 <img
//                   src={item.sessionImage}
//                   alt={item.sessionTitle}
//                   className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title text-lg font-bold">
//                   {item.sessionTitle}
//                 </h2>
//                 <p className="text-sm text-gray-600">{item.sessionDescription}</p>
//                 <div className="lg:flex justify-between">
//                   <p className="text-sm text-gray-600">
//                     <span className="font-semibold">Tutor: {item.tutorName}</span>
//                   </p>
//                   <p className="text-sm text-gray-600 badge bg-yellow-200 gap-2">
//                     <span className="font-semibold">Status:</span> {item.status}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   <span className="font-semibold">Registration:</span>{" "}
//                   {item.registrationStartDate} - {item.registrationEndDate}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <span className="font-semibold">Class Timing:</span>{" "}
//                   {item.classStartTime} - {item.classEndTime}
//                 </p>
//                 <div className="flex justify-between">
//                   <p className="text-sm text-gray-600">
//                     <span className="font-semibold">Fee:</span>{" "}
//                     {item.registrationFee === 0
//                       ? "0"
//                       : `$${item.registrationFee}`}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <span className="font-semibold">Max Participants:</span>{" "}
//                     {item.maxParticipant}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="flex justify-center text-red-500 font-semibold">
//           You have not created any study sessions yet!<br />Please create your study session.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ViewAllStudySessions;

import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const ViewAllStudySessions = () => {
  const { user } = useAuth();
  const [specificUser, setSpecificUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

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

  const handleSendApprovalRequest = async (id) => {
    try {
      const response = await axiosPublic.patch(`/studySession/${id}`, {
        status: "pending",
      });

      if (response.data.modifiedCount > 0) {
        toast.success("Approval request sent successfully!");
        setSpecificUser((prev) =>
          prev.map((session) =>
            session._id === id ? { ...session, status: "pending" } : session
          )
        );
      } else {
        toast.error("Failed to send approval request. Try again later.");
      }
    } catch (error) {
      console.error("Error sending approval request:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <SectionTitle
        header={"View All Study Sessions"}
        subHeader={`The "View All Study Sessions" page offers filters for subjects, tutors, timings, and registration status, alongside highlights like popular, upcoming, and recent sessions, ensuring quick access to personalized learning opportunities.`}
      />

      {loading ? (
        <p className="flex justify-center text-blue-500 font-semibold">
          Loading study sessions...
        </p>
      ) : specificUser.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
          {specificUser.map((item) => (
            <div
              key={item._id}
              className="card group bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <figure className="overflow-hidden">
                <img
                  src={item.sessionImage}
                  alt={item.sessionTitle}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">
                  {item.sessionTitle}
                </h2>
                <p className="text-sm text-gray-600">
                  {item.sessionDescription}
                </p>
                <div className="lg:flex justify-between">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">
                      Tutor: {item.tutorName}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 badge bg-yellow-200 gap-2">
                    <span className="font-semibold">Status:</span> {item.status}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Registration:</span>{" "}
                  {item.registrationStartDate} - {item.registrationEndDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Class Timing:</span>{" "}
                  {item.classStartTime} - {item.classEndTime}
                </p>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Fee:</span>{" "}
                    {item.registrationFee === 0
                      ? "0"
                      : `$${item.registrationFee}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Max Participants:</span>{" "}
                    {item.maxParticipant}
                  </p>
                </div>
                <div className="flex items-center">
                  {item.rejectionReason && item.status !== "pending" && (
                    <p className="font-semibold">
                     Feedback:{" "}
                      <span className="text-red-500">
                        {item.rejectionReason}
                      </span>
                    </p>
                  )}

                  {item.status === "reject" && (
                    <button
                      onClick={() => handleSendApprovalRequest(item._id)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex justify-center text-red-500 font-semibold">
          You have not created any study sessions yet!
          <br />
          Please create your study session.
        </p>
      )}
    </div>
  );
};

export default ViewAllStudySessions;
