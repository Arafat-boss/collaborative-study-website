import React from "react";
import { FaArrowRight } from "react-icons/fa";

const StudySessionCard = ({ data }) => {
  const {
    sessionTitle,
    tutorName,
    sessionDescription,
    registrationStartDate,
    registrationEndDate,
    registrationFee,
    sessionImage
  } = data || {};
  return (
    <div className="card w-full bg-base-100 shadow-xl border">
      <figure>
        <img
          src={sessionImage} // Replace with your image URL
          alt="Database Management Systems"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-lg font-bold text-primary">{tutorName}</h2>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-extrabold text-accent">{sessionTitle}</h3>
          <span className="text-lg font-bold text-secondary">${registrationFee}</span>
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
            <a className="btn btn-warning btn-sm cursor-not-allowed">
              Closed
            </a>
          ) : (
            <a className="btn btn-success btn-sm">Ongoing</a>
          )}
          <button className="btn btn-primary btn-sm flex items-center gap-2">
            Read More <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudySessionCard;
