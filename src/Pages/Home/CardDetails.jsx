import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdEmail, MdPerson } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import ReviewForm from "./ReviewForm";
import useAdmin from "../../Hooks/useAdmin";

const CardDetails = () => {
  const [role, isRoleLoading] = useAdmin(); // Adjusted to get loading state
  const axiosPublic = useAxiosPublic();
  const specificData = useLoaderData();
  const { user } = useAuth();

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

  const handleBookedSession = async (specificData, role) => {
    if (role === "admin") {
      toast.error("You are an admin and cannot make payment for this session!");
      return;
    }
    if (role === "tutor") {
      toast.error("You are a tutor and cannot make payment for this session!");
      return;
    }
    

    try {
      const { _id, ...data } = specificData;
      const res = await axiosPublic.post("/booked-sessions", {
        ...data,
        sessionId: _id,
        user: user.email,
      });

      if (res.data.message === "Session already booked") {
        toast.error("You have already booked this session.");
      } else if (res.data.insertedId) {
        toast.success("Successfully booked your session, but payment is pending.");
      }
    } catch (error) {
      toast.error("Failed to book the session. Please try again.");
      console.error("Booking error:", error);
    }
  };

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
            <button
              onClick={() => handleBookedSession(specificData, role)}
              className="group relative inline-block overflow-hidden border border-indigo-600 px-5 py-2 focus:outline-none focus:ring w-full"
              // disabled={role === "admin" || role === "tutor"}
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
              <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                Pay This Session
              </span>
            </button>
          </div>
        </div>
      </div>
      <ReviewForm></ReviewForm>
    </div>
  );
};

export default CardDetails;
