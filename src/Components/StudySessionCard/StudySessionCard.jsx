import React from "react";
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
  return (
    <div className="card w-full bg-base-100 shadow-xl border">
      <figure>
        <img
          src={sessionImage}
          alt="Database Management Systems"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-lg font-bold ">{tutorName}</h2>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-extrabold ">{sessionTitle}</h3>
          <span className="text-lg font-bold ">${registrationFee}</span>
        </div>
        <p className="text-sm text-gray-600">{sessionDescription}</p>
        <div className="text-sm text-gray-500 mt-3">
          <p>
            <strong>Registration Start Date:</strong> {registrationStartDate}
          </p>
          <p>
            <strong>Registration End Date:</strong> {registrationEndDate}
          </p>
        </div>
        <div className="card-actions justify-between mt-5">
          {new Date() <= new Date(registrationStartDate) &&
          new Date() >= new Date(registrationEndDate) ? (
            <a className="btn btn-warning btn-sm cursor-not-allowed">Closed</a>
          ) : (
            <a className="btn btn-success btn-sm">Ongoing</a>
          )}
          <Link to={`/cardDetails/${_id}`}>
            {/* <button className="btn btn-primary btn-sm flex items-center gap-2">
              view detail <FaArrowRight />
            </button> */}
            <button
              className="group relative inline-block overflow-hidden border border-indigo-600 px-5 py-2 focus:outline-none focus:ring"
              href="#"
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
  );
};

export default StudySessionCard;
