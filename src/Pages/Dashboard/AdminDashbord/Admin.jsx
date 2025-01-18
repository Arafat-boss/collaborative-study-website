import React from "react";
import { NavLink } from "react-router-dom";
import { CiViewList, CiViewTable } from "react-icons/ci";
import { RxDashboard, RxHome } from "react-icons/rx";
import { LuNotebookPen } from "react-icons/lu";

const Admin = () => {
  return (
    <div className="flex">
      {/* dashboard side menu */}
      <div className="w-64 min-h-screen bg-blue-100">
        <ul className="menu p-4 space-y-3">
          <li>
            <NavLink to="/dashboard/viewAllUser">
              <CiViewList size={25} />
              View all users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/viewAllStudySession">
            <LuNotebookPen size={25} />
              View all study session
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/viewAllMaterials">
            <CiViewTable size={25} /> View all materials
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to="/">
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

export default Admin;
