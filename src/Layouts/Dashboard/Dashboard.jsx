import React from "react";
import { Outlet } from "react-router-dom";
import Student from "../../Pages/Dashboard/StudentDashboard/Student";
import Tutor from "../../Pages/Dashboard/TutorDashboard/Tutor";
import Admin from "../../Pages/Dashboard/AdminDashbord/Admin";

const Dashboard = () => {

    const admin = false;
    const student = false;
    const tutor = true;
  return (
    <div className="flex">
      {/* dashboard side menu */}
      <div className="w-64 min-h-screen bg-blue-100">
        {
            student && <Student></Student>
        }
        {
            tutor && <Tutor></Tutor>
        }
        {
            admin && <Admin></Admin>
        }
      </div>

      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
