import React from "react";
import { Outlet } from "react-router-dom";
import Student from "../../Pages/Dashboard/StudentDashboard/Student";
import Tutor from "../../Pages/Dashboard/TutorDashboard/Tutor";
import Admin from "../../Pages/Dashboard/AdminDashbord/Admin";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useAdmin";

const Dashboard = () => {
  const { user } = useAuth();

  const [role] = useRole();
  console.log(role);
  return (
    <div className="flex">
      {/* dashboard side menu */}
      <div className="w-64 min-h-screen bg-blue-100">
        <div className="flex justify-evenly items-center pt-5">
          <img src={user?.photoURL} alt="" className="rounded-full  w-10 "/>
          <p className="text-blue-500 font-bold">{user?.displayName}</p>
        </div>
        {/* <span className="px-2 text-sm">(student)</span> */}
        <div className="divider divider-info"></div>
        {role == 'student' && <Student></Student>}
        {role == 'tutor' && <Tutor></Tutor>}
        {role == 'admin' && <Admin></Admin>}
      </div>

      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
