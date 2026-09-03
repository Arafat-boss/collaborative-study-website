import { useEffect, useState, useMemo } from "react";
import StudySessionCard from "../StudySessionCard/StudySessionCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { LuBookOpen, LuFlame, LuSparkles, LuCheck, LuArrowRight } from "react-icons/lu";

const StudySession = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'ongoing' | 'free'
  const axiosPublic = useAxiosPublic();

  const fetchData = async () => {
    try {
      const { data } = await axiosPublic.get('/studySession');
      setAllData(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching study sessions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper to determine if a session is currently ongoing
  const checkIsOngoing = (session) => {
    if (!session.registrationEndDate) return true;
    const end = new Date(session.registrationEndDate);
    end.setHours(23, 59, 59, 999);
    return new Date() <= end;
  };

  // Filter approved sessions and sort ONGOING sessions FIRST
  const { sortedSessions, ongoingCount, freeCount } = useMemo(() => {
    const approved = allData.filter((session) => session.status === "success");

    // Sort: Ongoing sessions come FIRST
    const sorted = [...approved].sort((a, b) => {
      const aOngoing = checkIsOngoing(a);
      const bOngoing = checkIsOngoing(b);

      if (aOngoing && !bOngoing) return -1;
      if (!aOngoing && bOngoing) return 1;

      // If both ongoing, sort by registration deadline ascending
      if (aOngoing && bOngoing) {
        if (a.registrationEndDate && b.registrationEndDate) {
          return new Date(a.registrationEndDate) - new Date(b.registrationEndDate);
        }
        return 0;
      }

      // If both closed, sort newest first
      if (a.registrationEndDate && b.registrationEndDate) {
        return new Date(b.registrationEndDate) - new Date(a.registrationEndDate);
      }
      return 0;
    });

    const ongoing = sorted.filter((s) => checkIsOngoing(s)).length;
    const free = sorted.filter((s) => Number(s.registrationFee) === 0).length;

    return { sortedSessions: sorted, ongoingCount: ongoing, freeCount: free };
  }, [allData]);

  // Apply active tab filter
  const filteredSessions = useMemo(() => {
    if (filterType === "ongoing") {
      return sortedSessions.filter((s) => checkIsOngoing(s));
    }
    if (filterType === "free") {
      return sortedSessions.filter((s) => Number(s.registrationFee) === 0);
    }
    return sortedSessions;
  }, [sortedSessions, filterType]);

  const sessionsToShow = showAll ? filteredSessions : filteredSessions.slice(0, 6);

  return (
    <section id="study-sessions" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Programming Hero Style */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-extrabold border border-violet-200 dark:border-violet-500/30 backdrop-blur-md">
          <LuSparkles className="text-fuchsia-600 dark:text-fuchsia-400" />
          <span>Interactive Live Batches</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Explore Available
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-300 dark:to-cyan-300">
            Study Sessions & Batches
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 max-w-xl mx-auto">
          Enroll in live interactive batches, access mentor notes, and accelerate your learning journey today.
        </p>
      </div>

      {/* Programming Hero Glowing Filter Tabs */}
      {!loading && sortedSessions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12">
          <button
            onClick={() => { setFilterType("all"); setShowAll(false); }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 ${
              filterType === "all"
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/30 scale-105"
                : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#151e33] shadow-sm"
            }`}
          >
            <LuSparkles className="text-fuchsia-500 dark:text-fuchsia-400" />
            <span>All Sessions ({sortedSessions.length})</span>
          </button>

          <button
            onClick={() => { setFilterType("ongoing"); setShowAll(false); }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 ${
              filterType === "ongoing"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 scale-105"
                : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#151e33] shadow-sm"
            }`}
          >
            <LuFlame className="text-emerald-500 dark:text-emerald-400" />
            <span>🔥 Ongoing Batches ({ongoingCount})</span>
          </button>

          <button
            onClick={() => { setFilterType("free"); setShowAll(false); }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 ${
              filterType === "free"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 scale-105"
                : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#151e33] shadow-sm"
            }`}
          >
            <LuCheck className="text-cyan-500 dark:text-cyan-400" />
            <span>Free Sessions ({freeCount})</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-gray-200 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
              <div className="aspect-video bg-gray-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-10 bg-gray-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredSessions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sessionsToShow.map((session) => (
              <StudySessionCard key={session._id || session.sessionTitle} data={session} />
            ))}
          </div>

          {!showAll && filteredSessions.length > 6 && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => setShowAll(true)}
                className="px-9 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-xl shadow-violet-950/20 dark:shadow-violet-950/40 transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <span>Explore All Sessions ({filteredSessions.length})</span>
                <LuArrowRight />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 px-4 bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
            <LuBookOpen className="text-2xl" />
          </div>
          <h3 className="text-lg font-black text-gray-900 dark:text-white">No Study Sessions Found</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Check back soon as new sessions are published daily by our verified tutors.
          </p>
        </div>
      )}
    </section>
  );
};

export default StudySession;
