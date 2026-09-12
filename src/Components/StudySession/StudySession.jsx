import { useEffect, useState, useMemo } from "react";
import StudySessionCard from "../StudySessionCard/StudySessionCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { LuBookOpen, LuCalendar, LuCheck, LuArrowRight } from "react-icons/lu";

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
    <section id="study-sessions" className="py-6 sm:py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-[5px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold border border-blue-200 dark:border-blue-900/50 shadow-sm">
          <span>Interactive Live Batches</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Explore Available
          <br />
          <span className="text-blue-600 dark:text-blue-400">
            Study Sessions & Batches
          </span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-400 max-w-xl mx-auto px-2 sm:px-0">
          Enroll in live interactive batches, access mentor notes, and accelerate your learning journey today.
        </p>
      </div>

      {/* Filter Tabs */}
      {!loading && sortedSessions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => { setFilterType("all"); setShowAll(false); }}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[5px] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              filterType === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#151e33] shadow-sm"
            }`}
          >
            <LuBookOpen className={filterType === "all" ? "text-white" : "text-blue-600 dark:text-blue-400"} />
            <span>All Sessions ({sortedSessions.length})</span>
          </button>

          <button
            onClick={() => { setFilterType("ongoing"); setShowAll(false); }}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[5px] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              filterType === "ongoing"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#151e33] shadow-sm"
            }`}
          >
            <LuCalendar className={filterType === "ongoing" ? "text-white" : "text-blue-600 dark:text-blue-400"} />
            <span>Ongoing Batches ({ongoingCount})</span>
          </button>

          <button
            onClick={() => { setFilterType("free"); setShowAll(false); }}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[5px] text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
              filterType === "free"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#151e33] shadow-sm"
            }`}
          >
            <LuCheck className={filterType === "free" ? "text-white" : "text-blue-600 dark:text-blue-400"} />
            <span>Free Sessions ({freeCount})</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white dark:bg-[#111827] rounded-[5px] p-5 border border-gray-200 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
              <div className="aspect-video bg-gray-200 dark:bg-slate-800 rounded-[5px] w-full" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-[5px] w-1/3" />
              <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-[5px] w-3/4" />
              <div className="h-10 bg-gray-200 dark:bg-slate-800 rounded-[5px] w-full" />
            </div>
          ))}
        </div>
      ) : filteredSessions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sessionsToShow.map((session) => (
              <StudySessionCard key={session._id || session.sessionTitle} data={session} />
            ))}
          </div>

          {!showAll && filteredSessions.length > 6 && (
            <div className="flex justify-center mt-8 sm:mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 rounded-[5px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm md:text-base shadow-sm transition-all duration-200 flex items-center gap-2"
              >
                <span>Explore All Sessions ({filteredSessions.length})</span>
                <LuArrowRight />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 px-4 bg-white dark:bg-[#111827] rounded-[5px] border border-gray-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
          <div className="w-12 h-12 mx-auto rounded-[5px] bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <LuBookOpen className="text-xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Study Sessions Found</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Check back soon as new sessions are published daily by our verified tutors.
          </p>
        </div>
      )}
    </section>
  );
};

export default StudySession;
