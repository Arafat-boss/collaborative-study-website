import React, { useContext } from "react";
import useAuth from "../../Hooks/useAuth";
import { CiLogout } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Navbar = () => {
  const { user, LogOutUser } = useContext(AuthContext);

  const handelLogOut = () => {
    LogOutUser();
  };

  return (
    <div className="navbar fixed lg:px-20 md:px-10 px-5 z-10 opacity-90 bg-red-200 flex justify-center items-center">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">Logo</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-5">
          {user ? <div className=" avatar ">
            <div className="w-10 rounded-full ">
              <img referrerPolicy="no-referrer"
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL}
              />
            </div>
          </div>: ''}
          <li className="flex justify-center items-center">
            <Link to='/dashboard'>Dashboard</Link>
          </li>

          <div>
            {user ? (
              <>
                <div>
                <a
                  onClick={handelLogOut}
                  className="btn btn-sm  bg-gradient-to-r from-red-400 to-[#fd0259] text-white "
                >
                  <CiLogout></CiLogout> Sign Out
                </a>
                </div>
              </>
            ) : (
              <div>
                <Link
                  className="btn btn-sm bg-gradient-to-r from-red-400 to-[#fd0259] text-white"
                  to="/login"
                >
                  <IoLogInOutline></IoLogInOutline> Login
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
