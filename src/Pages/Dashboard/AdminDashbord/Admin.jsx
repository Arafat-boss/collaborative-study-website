import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiViewList, CiViewTable } from "react-icons/ci";
import { RxDashboard, RxHome } from "react-icons/rx";
import { LuNotebookPen } from "react-icons/lu";
import useAuth from "../../../Hooks/useAuth";
import { RiLogoutCircleLine } from "react-icons/ri";

const Admin = () => {
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
            <NavLink to="/dashboard/viewAllMaterialsAdmin">
            <CiViewTable size={25} /> View all materials
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

export default Admin;
