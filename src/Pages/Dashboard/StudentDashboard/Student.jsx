import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { RiChatPrivateFill, RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineStreetview } from "react-icons/md";
import { RxHome } from "react-icons/rx";
import { FaBookmark } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const Student = ({ onItemClick }) => {
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
          to="/dashboard/viewBookedSession"
          onClick={onItemClick}
          className={navItemClass}
        >
          <FaBookmark className="text-lg flex-shrink-0" />
          <span>Booked Sessions</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/createNote"
          onClick={onItemClick}
          className={navItemClass}
        >
          <IoIosCreate className="text-xl flex-shrink-0" />
          <span>Create Note</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/personalNotes"
          onClick={onItemClick}
          className={navItemClass}
        >
          <RiChatPrivateFill className="text-lg flex-shrink-0" />
          <span>Manage Notes</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/studyMaterials"
          onClick={onItemClick}
          className={navItemClass}
        >
          <MdOutlineStreetview className="text-xl flex-shrink-0" />
          <span>Study Materials</span>
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

export default Student;
