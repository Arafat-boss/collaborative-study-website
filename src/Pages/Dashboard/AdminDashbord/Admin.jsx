import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiViewList, CiViewTable } from "react-icons/ci";
import { RxHome } from "react-icons/rx";
import { LuNotebookPen, LuTrendingUp } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import useAuth from "../../../Hooks/useAuth";

const Admin = ({ onItemClick }) => {
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
          to="/dashboard/salesAnalytics"
          onClick={onItemClick}
          className={navItemClass}
        >
          <LuTrendingUp className="text-xl flex-shrink-0" />
          <span>Sales & Analytics</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/viewAllUser"
          onClick={onItemClick}
          className={navItemClass}
        >
          <CiViewList className="text-xl flex-shrink-0" />
          <span>Manage Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/viewAllStudySession"
          onClick={onItemClick}
          className={navItemClass}
        >
          <LuNotebookPen className="text-xl flex-shrink-0" />
          <span>All Study Sessions</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/viewAllMaterialsAdmin"
          onClick={onItemClick}
          className={navItemClass}
        >
          <CiViewTable className="text-xl flex-shrink-0" />
          <span>All Materials</span>
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

export default Admin;
