import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ session }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src={session.sessionImage}
          alt="Session"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{session.sessionTitle}</h2>
        <p className="text-sm text-gray-600">{session.sessionDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-semibold text-gray-700">
            Tutor: {session.tutorName}
          </span>
          <span className="text-sm text-primary font-bold">
            ${session.registrationFee}
          </span>
        </div>
        <div className="card-actions mt-4">
          <Link to={`/bookedDetails/${session._id}`}>
            <button className="btn btn-primary w-full flex items-center justify-center gap-2">
              Pay Session <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
