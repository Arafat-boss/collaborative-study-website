import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { LuCheck, LuGraduationCap, LuSparkles, LuStar } from "react-icons/lu";

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
    <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-extrabold border border-violet-200 dark:border-violet-500/30 backdrop-blur-md">
          <LuSparkles className="text-fuchsia-600 dark:text-fuchsia-400" />
          <span>Top Industry Educators</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Learn Directly From
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-300 dark:to-cyan-300">
            Passionate Expert Mentors
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 max-w-xl mx-auto">
          Get real-time guidance, code reviews, and direct 1-on-1 interaction with subject matter specialists.
        </p>
      </div>

      {/* Marquee Tutors Carousel */}
      <div className="rounded-3xl overflow-hidden py-4">
        <Marquee pauseOnHover={true} speed={38} gradient={false}>
          <div className="flex gap-6 py-4 px-3">
            {displayTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="w-72 sm:w-80 p-5 rounded-3xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-800 hover:border-violet-500/50 shadow-md hover:shadow-2xl hover:shadow-violet-950/20 transition-all duration-300 flex items-center gap-4 flex-shrink-0 group hover:-translate-y-1"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={tutor.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}
                  alt={tutor.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/40 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-gray-900 dark:text-white truncate group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors">
                      {tutor.name}
                    </h3>
                    <LuCheck className="text-cyan-600 dark:text-cyan-400 text-xs flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5 font-mono">
                    {tutor.email}
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50">
                      <LuGraduationCap className="text-xs" /> Verified Mentor
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500 dark:text-amber-400 text-xs font-bold">
                      <LuStar className="fill-amber-400 text-[10px]" /> 5.0
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