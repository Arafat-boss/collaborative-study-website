import React from "react";
import { NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { IoIosCreate } from "react-icons/io";
import { RiChatPrivateFill } from "react-icons/ri";
import { MdOutlineStreetview } from "react-icons/md";
import { RxDashboard, RxHome } from "react-icons/rx";

const Student = () => {
  return (
    <div className="flex">
      {/* dashboard side menu */}
      <div >
        <ul className="menu p-4 space-y-3">
         
            <li>
              <NavLink to="/dashboard/viewBookedSession">
                <CiViewList size={25} /> View Booked Session
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/payment">
                <IoIosCreate size={25} />
                Create Note
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/history">
                <RiChatPrivateFill size={25} /> Manage Personal Notes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/cart">
                <MdOutlineStreetview size={25} /> View All Study Materials
              </NavLink>
            </li>

          <div className="divider"></div>
          <li>
            <NavLink to="/dashboard">
            <RxDashboard size={25} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <RxHome size={25} /> Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Student;
