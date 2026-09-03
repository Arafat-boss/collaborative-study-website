import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import GridBackground from "../../Components/GridBackground/GridBackground";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 antialiased selection:bg-violet-600 selection:text-white transition-colors duration-300">
      {/* Blueprint / Graph Grid Matrix Background */}
      <GridBackground />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar />
        <main className="flex-grow w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
