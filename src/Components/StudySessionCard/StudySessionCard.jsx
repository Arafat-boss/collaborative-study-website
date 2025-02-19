import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const StudySessionCard = ({ data }) => {
  const {
    sessionTitle,
    tutorName,
    sessionDescription,
    registrationStartDate,
    registrationEndDate,
    registrationFee,
    sessionImage,
    _id,
  } = data || {};

  // Convert registration dates to Date objects for comparison
  const registrationEnd = new Date(registrationEndDate);
  const today = new Date();

  // Determine the session status
  const sessionStatus = today <= registrationEnd ? "Ongoing" : "Closed";

  // Function to truncate the session description to 20 words
  const truncateDescription = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <Fade>
      <div className="card w-full bg-base-100 shadow-xl border">
        <figure>
          <img
            src={sessionImage}
            alt={sessionTitle}
            className="w-full h-48 object-cover rounded-md"
          />
        </figure>
        <div className="card-body p-5">
          <h2 className="text-lg font-bold">{tutorName}</h2>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-extrabold">{sessionTitle}</h3>
            <span className="text-lg font-bold">${registrationFee}</span>
          </div>
          <p className="text-sm text-gray-600">
            {truncateDescription(sessionDescription, 10)}
          </p>
          <div className="text-sm text-gray-500">
            <p>
              <strong>Registration Start Date:</strong> {registrationStartDate}
            </p>
            <p>
              <strong>Registration End Date:</strong> {registrationEndDate}
            </p>
          </div>
          <div className="card-actions justify-between mt-5">
            <button
              className={`btn ${
                sessionStatus === "Ongoing" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {sessionStatus}
            </button>
            <Link to={`/cardDetails/${_id}`}>
              <button
                className={`group relative inline-block overflow-hidden border border-indigo-600 px-5 py-2 focus:outline-none focus:ring ${
                  sessionStatus === "Closed"
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={sessionStatus === "Closed"}
              >
                <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                  View Details
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default StudySessionCard;
