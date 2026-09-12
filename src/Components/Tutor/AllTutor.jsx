import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { LuCheck, LuGraduationCap, LuStar } from "react-icons/lu";

const AllTutor = () => {
  const axiosPublic = useAxiosPublic();

  const { data: fetchedTutors = [] } = useQuery({
    queryKey: ["public-tutors"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/tutors");
        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        console.error("Error loading tutors:", err);
        return [];
      }
    },
  });

  const tutors = fetchedTutors.filter((item) => (item.role || "").toLowerCase() === "tutor");

  // Fallback demo tutors if no tutors created yet
  const displayTutors = tutors.length > 0 ? tutors : [
    {
      _id: "demo1",
      name: "Dr. Sarah Jenkins",
      email: "sarah.j@example.com",
      role: "tutor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
    },
    {
      _id: "demo2",
      name: "Prof. Michael Chen",
      email: "m.chen@example.com",
      role: "tutor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80"
    },
    {
      _id: "demo3",
      name: "Ayesha Rahman",
      email: "ayesha.r@example.com",
      role: "tutor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
    },
    {
      _id: "demo4",
      name: "David Miller",
      email: "david.m@example.com",
      role: "tutor",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-6 sm:py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-[5px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold border border-blue-200 dark:border-blue-900/50 shadow-sm">
          <span>Top Industry Educators</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Learn Directly From
          <br />
          <span className="text-blue-600 dark:text-blue-400">
            Passionate Expert Mentors
          </span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400 max-w-xl mx-auto px-2 sm:px-0">
          Get real-time guidance, code reviews, and direct 1-on-1 interaction with subject matter specialists.
        </p>
      </div>

      {/* Marquee Tutors Carousel */}
      <div className="rounded-[5px] overflow-hidden py-2 sm:py-3">
        <Marquee pauseOnHover={true} speed={38} gradient={false}>
          <div className="flex gap-6 py-4 px-3">
            {displayTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="w-72 sm:w-80 p-5 rounded-[5px] bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 flex-shrink-0 group hover:-translate-y-1"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={tutor.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}
                  alt={tutor.name}
                  className="w-14 h-14 rounded-[5px] object-cover border border-blue-500/30 shadow-sm flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tutor.name}
                    </h3>
                    <LuCheck className="text-blue-600 dark:text-blue-400 text-xs flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5 font-mono">
                    {tutor.email}
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[5px] bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                      <LuGraduationCap className="text-xs text-blue-600 dark:text-blue-400" /> Verified Mentor
                    </span>
                    <div className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 text-xs font-bold">
                      <LuStar className="fill-blue-500 text-[10px]" /> 5.0
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default AllTutor;