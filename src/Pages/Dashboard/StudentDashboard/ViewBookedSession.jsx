import React, { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Card from "../../../Components/StudySessionCard/Card";
import InvoiceModal from "../../../Components/InvoiceModal/InvoiceModal";
import { Link } from "react-router-dom";
import { LuBookOpen, LuCalendar, LuSparkles } from "react-icons/lu";

const ViewBookedSession = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const { data: booked = [], isLoading } = useQuery({
    queryKey: ["booked", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosPublic.get(`/bookedSessions/${user.email}`);
      return Array.isArray(result.data) ? result.data : [];
    },
  });

  const handleOpenInvoice = (session) => {
    setSelectedInvoice({
      ...session,
      studentName: user?.displayName,
      user: session.user || user?.email,
    });
    setIsInvoiceOpen(true);
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        header="My Booked Study Sessions"
        subHeader="Access all sessions you have enrolled in, review schedules, download official invoice receipts, and access study materials."
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 animate-pulse space-y-3">
              <div className="aspect-video bg-gray-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : booked.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {booked.map((session) => (
            <Card
              key={session._id || session.sessionId}
              session={session}
              onViewInvoice={handleOpenInvoice}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 max-w-lg mx-auto transition-colors">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mx-auto">
            <LuCalendar />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-800 dark:text-white text-lg">You Haven't Booked Any Sessions Yet</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 max-w-sm mx-auto">
              Browse our catalog of ongoing study sessions and enroll to learn with expert tutors.
            </p>
          </div>
          <Link
            to="/#study-sessions"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
          >
            <LuSparkles /> Browse Available Sessions
          </Link>
        </div>
      )}

      {/* Invoice Modal for Student */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        data={selectedInvoice}
      />
    </div>
  );
};

export default ViewBookedSession;
