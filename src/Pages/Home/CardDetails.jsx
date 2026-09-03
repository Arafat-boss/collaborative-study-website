import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdEmail, MdPerson } from "react-icons/md";
import { LuCalendar, LuClock, LuUsers, LuDollarSign, LuCheck, LuArrowLeft } from "react-icons/lu";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";

const CardDetails = () => {
  const [role, isRoleLoading] = useAdmin();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const specificData = useLoaderData() || {};
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isBooked, setIsBooked] = useState(false);
  const [isBookingFree, setIsBookingFree] = useState(false);

  const {
    classEndTime,
    classStartTime,
    maxParticipant,
    registrationEndDate,
    registrationFee = 0,
    registrationStartDate,
    sessionDescription,
    sessionImage,
    sessionTitle,
    tutorEmail,
    tutorName,
    _id,
  } = specificData;

  // Check if the session is already booked
  useEffect(() => {
    const checkBooking = async () => {
      try {
        const res = await axiosPublic.get(`/booked-sessions/${_id}`, {
          params: { user: user.email },
        });
        if (res.data?.isBooked) {
          setIsBooked(true);
        }
      } catch (error) {
        console.error("Error checking booking:", error);
      }
    };

    if (user?.email && _id) {
      checkBooking();
    }
  }, [axiosPublic, _id, user?.email]);

  // Handle Free Session Booking
  const handleFreeBooking = async () => {
    if (!user) {
      toast.error("Please login to book this study session.");
      navigate("/login");
      return;
    }

    try {
      setIsBookingFree(true);
      const bookingData = {
        sessionId: _id,
        sessionTitle,
        tutorName,
        tutorEmail,
        sessionImage,
        registrationFee: 0,
        classStartTime,
        classEndTime,
        user: user.email,
        studentName: user.displayName || "Student",
        bookingDate: new Date().toISOString()
      };

      const res = await axiosPublic.post("/booked-sessions", bookingData);
      if (res.data.insertedId || res.status === 200 || res.status === 201) {
        toast.success("Free session booked successfully!");
        setIsBooked(true);
        navigate("/dashboard/viewBookedSession");
      } else if (res.data.message === "Session already booked") {
        toast.error("You have already booked this session.");
        setIsBooked(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book free session. Please try again.");
    } finally {
      setIsBookingFree(false);
    }
  };

  const isFree = Number(registrationFee) === 0;

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
      >
        <LuArrowLeft />
        <span>Back to All Sessions</span>
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 transition-colors">
        
        {/* Left Column: Image & Tutor Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-800/50 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden shadow-md">
              <img
                src={sessionImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"}
                alt={sessionTitle || "Study Session"}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow">
                  {isFree ? "FREE ENROLLMENT" : `$${registrationFee}`}
                </span>
              </div>
            </div>

            {/* Tutor Info Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                Session Instructor
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                  <MdPerson />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {tutorName || "Verified Tutor"}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 truncate">
                    <MdEmail className="text-gray-400" />
                    <span>{tutorEmail || "instructor@example.com"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 dark:text-slate-500 text-center">
            Verified study material & live meeting links available after booking.
          </div>
        </div>

        {/* Right Column: Details & Booking Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            
            {/* Title & Badge */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-900/40">
                Official Study Session
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                {sessionTitle}
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                About this Session
              </h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed">
                {sessionDescription || "No detailed description provided for this session."}
              </p>
            </div>

            {/* Key Schedule Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-slate-400">
                  <LuClock className="text-blue-500 dark:text-blue-400" /> Class Timings
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-white">
                  {classStartTime || "TBA"} - {classEndTime || "TBA"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-slate-400">
                  <LuUsers className="text-blue-500 dark:text-blue-400" /> Max Capacity
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-white">
                  {maxParticipant ? `${maxParticipant} Participants` : "Open Seats"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-slate-400">
                  <LuCalendar className="text-blue-500 dark:text-blue-400" /> Reg. Start Date
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-white">
                  {registrationStartDate || "Open"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-slate-400">
                  <LuCalendar className="text-blue-500 dark:text-blue-400" /> Reg. Deadline
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-white">
                  {registrationEndDate || "Open"}
                </div>
              </div>
            </div>

          </div>

          {/* Action CTA Block */}
          <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
            {isBooked ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <LuCheck className="text-lg" /> You have already booked this session!
                </div>
                <Link
                  to="/dashboard/viewBookedSession"
                  className="inline-block text-xs font-bold text-emerald-800 dark:text-emerald-300 underline hover:text-emerald-900"
                >
                  Go to your Booked Sessions in Dashboard →
                </Link>
              </div>
            ) : role === "admin" || role === "tutor" ? (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-center text-sm font-medium">
                You are currently logged in as an <strong>{role}</strong>. Only student accounts can enroll in sessions.
              </div>
            ) : isFree ? (
              <button
                onClick={handleFreeBooking}
                disabled={isBookingFree}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isBookingFree ? "Processing Enrollment..." : "Book Session for Free"}
              </button>
            ) : (
              <Link
                to={`/payment/${_id}`}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout (${registrationFee})</span>
              </Link>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default CardDetails;
