import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { RiChatPrivateFill, RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineStreetview } from "react-icons/md";
import { RxDashboard, RxHome } from "react-icons/rx";
import { FaBookmark } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const Student = () => {
  const {LogOutUser} = useAuth();

  const handelLogOut = () => {
    LogOutUser();
  };

  return (
    <div className="flex">
      {/* dashboard side menu */}
      <div >
        <ul className="menu p-4 space-y-3">
         
            <li>
              <NavLink to="/dashboard/viewBookedSession">
              <FaBookmark size={25} /> View Booked Session
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/createNote">
                <IoIosCreate size={25} />
                Create Note
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/personalNotes">
                <RiChatPrivateFill size={25} /> Manage Personal Notes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/studyMaterials">
                <MdOutlineStreetview size={25} /> View All Study Materials
              </NavLink>
            </li>

          <div className="divider"></div>
          <li>
            <NavLink to="/">
            <RxHome size={25} /> Home
            </NavLink>
          </li>
          <li>
            <Link to="" onClick={handelLogOut}>
            <RiLogoutCircleLine size={25} /> Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Student;
