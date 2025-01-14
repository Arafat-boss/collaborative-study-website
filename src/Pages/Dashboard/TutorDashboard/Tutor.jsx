import React from "react";
import { NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { MdOutlineStreetview } from "react-icons/md";
import { RxDashboard, RxHome } from "react-icons/rx";
import { IoCloudUploadOutline, IoCreateOutline } from "react-icons/io5";

const Tutor = () => {
  return (
    <div className="flex">
      {/* dashboard side menu */}
      <div className="w-64 min-h-screen bg-blue-100">
        <ul className="menu p-4 space-y-3">
      
            <li>
              <NavLink to="/dashboard/createStudySession">
              <IoCreateOutline size={25} /> Create study session
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/viewAllStudySessions">
              <CiViewList size={25} />
                View all study sessions
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/uploadMaterials">
              <IoCloudUploadOutline size={25} /> Upload materials
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/cart">
                <MdOutlineStreetview size={25} />View all materials
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

export default Tutor;
