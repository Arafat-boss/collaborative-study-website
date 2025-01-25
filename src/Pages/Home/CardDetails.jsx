import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdEmail, MdPerson } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";

const CardDetails = () => {
  const [role, isRoleLoading] = useAdmin();
  const axiosPublic = useAxiosPublic();
  const specificData = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  // State to track if the session is already booked
  const [isBooked, setIsBooked] = useState(false);

  const {
    classEndTime,
    classStartTime,
    maxParticipant,
    registrationEndDate,
    registrationFee,
    registrationStartDate,
    sessionDescription,
    sessionImage,
    sessionTitle,
    tutorEmail,
    tutorName,
    _id,
  } = specificData;

  // Check if the session is already booked
  useEffect(() => {
    const checkBooking = async () => {
      try {
        const res = await axiosPublic.get(`/booked-sessions/${_id}`, {
          params: { user: user.email },
        });
        if (res.data?.isBooked) {
          setIsBooked(true);
        }
      } catch (error) {
        console.error("Error checking booking:", error);
      }
    };

    if (user?.email) {
      checkBooking();
    }
  }, [axiosPublic, _id, user?.email]);

 

  if (isRoleLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="m-10 flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden p-4">
        {/* Left: Session Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={sessionImage}
            alt={sessionTitle}
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>

        {/* Right: Card Information */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
          {/* Session Title */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {sessionTitle}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">{sessionDescription}</p>

          {/* Tutor Details */}
          <div className="mb-4 flex items-center gap-4">
            <MdPerson className="text-primary text-xl" />
            <span className="text-gray-700 font-semibold">{tutorName}</span>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <MdEmail className="text-primary text-xl" />
            <span className="text-gray-700 font-semibold">{tutorEmail}</span>
          </div>

          {/* Session Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500 text-sm">Class Start Time</p>
              <p className="text-gray-800 font-semibold">{classStartTime}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Class End Time</p>
              <p className="text-gray-800 font-semibold">{classEndTime}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Max Participants</p>
              <p className="text-gray-800 font-semibold">{maxParticipant}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Registration Fee</p>
              <p className="text-gray-800 font-semibold">
                {registrationFee === 0 ? "Free" : `$${registrationFee}`}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Registration Start Date</p>
              <p className="text-gray-800 font-semibold">
                {registrationStartDate}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Registration End Date</p>
              <p className="text-gray-800 font-semibold">
                {registrationEndDate}
              </p>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="mt-4">
            {isBooked ? (
              <button
                disabled
                className="group relative inline-block overflow-hidden border border-gray-300 px-5 py-2 focus:outline-none focus:ring w-full bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Already Booked
              </button>
            ) : (
              <Link to={`/payment/${_id}`}>
                <button className="group relative inline-block overflow-hidden border border-indigo-600 px-5 py-2 focus:outline-none focus:ring w-full hover:bg-indigo-600 hover:text-white">
                  <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                  <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                    Buy the course
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
