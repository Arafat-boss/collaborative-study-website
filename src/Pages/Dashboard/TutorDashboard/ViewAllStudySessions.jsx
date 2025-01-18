import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

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

  console.log(specificUser);

  return (
    <div>
      <SectionTitle
        header={"View All Study Sessions"}
        subHeader={`The "View All Study Sessions" page offers filters for subjects, tutors, timings, and registration status, alongside highlights like popular, upcoming, and recent sessions, ensuring quick access to personalized learning opportunities.`}
      ></SectionTitle>

      {/* TODO: added all session for specific tutor */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {specificUser.map((item) => (
          <div
            key={item._id}
            className="card group bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image with hover zoom effect */}
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
              <p className="text-sm text-gray-600">{item.sessionDescription}</p>
              <div className="lg:flex justify-between">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Tutor: {item.tutorName}</span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllStudySessions;
