import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { MdOutlineStreetview } from "react-icons/md";
import { RxDashboard, RxHome } from "react-icons/rx";
import { IoCloudUploadOutline, IoCreateOutline } from "react-icons/io5";
import useAuth from "../../../Hooks/useAuth";
import { RiLogoutCircleLine } from "react-icons/ri";

const Tutor = () => {
  const {LogOutUser} = useAuth();

  const handelLogOut = () => {
    LogOutUser();
  };
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
              <NavLink to="/dashboard/viewAllMaterials">
                <MdOutlineStreetview size={25} />View all materials
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

export default Tutor;
