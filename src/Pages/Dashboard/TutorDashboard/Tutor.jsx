import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { MdOutlineStreetview } from "react-icons/md";
import { RxHome } from "react-icons/rx";
import { IoCloudUploadOutline, IoCreateOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import useAuth from "../../../Hooks/useAuth";

const Tutor = ({ onItemClick }) => {
  const { LogOutUser } = useAuth();

  const handleLogOut = () => {
    LogOutUser();
    if (onItemClick) onItemClick();
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
        : "text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/80"
    }`;

  return (
    <ul className="space-y-1.5 w-full">
      <li>
        <NavLink
          to="/dashboard/createStudySession"
          onClick={onItemClick}
          className={navItemClass}
        >
          <IoCreateOutline className="text-xl flex-shrink-0" />
          <span>Create Session</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/viewAllStudySessions"
          onClick={onItemClick}
          className={navItemClass}
        >
          <CiViewList className="text-xl flex-shrink-0" />
          <span>My Sessions</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/uploadMaterials"
          onClick={onItemClick}
          className={navItemClass}
        >
          <IoCloudUploadOutline className="text-xl flex-shrink-0" />
          <span>Upload Materials</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/viewAllMaterials"
          onClick={onItemClick}
          className={navItemClass}
        >
          <MdOutlineStreetview className="text-xl flex-shrink-0" />
          <span>View All Materials</span>
        </NavLink>
      </li>

      <li className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800">
        <NavLink to="/" onClick={onItemClick} className={navItemClass}>
          <RxHome className="text-lg flex-shrink-0" />
          <span>Back to Home</span>
        </NavLink>
      </li>
      <li>
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <RiLogoutCircleLine className="text-lg flex-shrink-0" />
          <span>Log Out</span>
        </button>
      </li>
    </ul>
  );
};

export default Tutor;
