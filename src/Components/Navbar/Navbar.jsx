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
    // <div className="navbar justify-between fixed z-10 opacity-90 lg:px-10 md:px-5 bg-red-50">
    //   <div className="navbar-start">
    //     <div className="dropdown">
    //       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M4 6h16M4 12h8m-8 6h16"
    //           />
    //         </svg>
    //       </div>
    //       <ul
    //         tabIndex={0}
    //         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    //       >
    //         <li>
    //           <a>Item 1{user?.email}</a>
    //         </li>
    //         <li>
    //           <a>Parent</a>
    //           <ul className="p-2">
    //             <li>
    //               <a>Submenu 1</a>
    //             </li>
    //             <li>
    //               <a>Submenu 2</a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li>
    //           <a>Item 3</a>
    //         </li>
    //       </ul>
    //     </div>
    //     <a className="btn btn-ghost text-xl">Logo</a>
    //   </div>
    //   <div className="navbar-center hidden lg:flex">
    //     <ul className="menu menu-horizontal px-1">
    //       <li>
    //         <a>Item 1</a>
    //       </li>
    //     </ul>
    //   </div>
    //   {user ? (
    //       <>
    //         <a
    //           onClick={handelLogOut}
    //           className="btn btn-sm bg-gradient-to-r from-red-400 to-[#fd0259] text-white "
    //         >
    //           <CiLogout></CiLogout> Sign Out
    //         </a>
    //       </>
    //     ) : (
    //       <div>
    //         <Link
    //           className="btn btn-sm bg-gradient-to-r from-red-400 to-[#fd0259] text-white"
    //           to="/login"
    //         >
    //           <IoLogInOutline></IoLogInOutline> Login
    //         </Link>
    //       </div>
    //     )}
    // </div>
    <div className="navbar fixed z-10 opacity-90 bg-red-200 flex justify-center items-center">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">Logo</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user ? <div className=" avatar ">
            <div className="w-10 rounded-full ">
              <img referrerPolicy="no-referrer"
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL}
              />
            </div>
          </div>: ''}
          <li className="flex justify-center items-center">
            <a>Dashboard</a>
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
