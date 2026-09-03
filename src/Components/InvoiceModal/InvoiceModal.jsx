import React, { useRef } from "react";
import { LuPrinter, LuX, LuGraduationCap, LuCalendar, LuUser, LuMail, LuHash } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";

const InvoiceModal = ({ isOpen, onClose, data }) => {
  const printRef = useRef(null);

  if (!isOpen || !data) return null;

  const {
    invoiceNumber = `INV-${Date.now().toString().slice(-6)}`,
    sessionTitle = "Collaborative Study Session",
    tutorName = "Instructor",
    tutorEmail = "",
    user: studentEmail = "student@example.com",
    studentName,
    registrationFee = 0,
    transactionId = "FREE_ENROLLMENT",
    bookingDate = new Date().toISOString(),
    classStartTime,
    classEndTime,
  } = data;

  const fee = parseFloat(registrationFee) || 0;
  const isPaid = fee > 0;
  const formattedDate = new Date(bookingDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden my-8 transition-all">
        
        {/* Top Control Bar (Hidden on Print) */}
        <div className="no-print px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Official Payment Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all"
            >
              <LuPrinter className="text-sm" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close invoice"
            >
              <LuX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div ref={printRef} className="p-6 sm:p-10 space-y-8 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 printable-area">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <LuGraduationCap className="text-2xl" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                  Collaborative<span className="text-blue-600 dark:text-blue-400">Study</span>
                </h1>
                <p className="text-xs text-gray-400 dark:text-slate-400">Collaborative Study & Tutoring Hub</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isPaid
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                }`}
              >
                <FaCheckCircle className="text-[10px]" />
                {isPaid ? "Payment Successful" : "Free Enrollment"}
              </span>
              <p className="text-xs font-mono font-semibold text-gray-500 dark:text-slate-400">
                {invoiceNumber}
              </p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800/80 space-y-2">
              <p className="font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider text-[10px]">
                Billed To (Student)
              </p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">
                {studentName || "Enrolled Student"}
              </p>
              <p className="text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <LuMail className="text-gray-400" /> {studentEmail}
              </p>
              <p className="text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <LuCalendar className="text-gray-400" /> Date: {formattedDate}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800/80 space-y-2">
              <p className="font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider text-[10px]">
                Session & Instructor
              </p>
              <p className="font-bold text-sm text-gray-900 dark:text-white truncate">
                {sessionTitle}
              </p>
              <p className="text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <LuUser className="text-gray-400" /> Tutor: {tutorName} {tutorEmail && `(${tutorEmail})`}
              </p>
              {classStartTime && (
                <p className="text-gray-500 dark:text-slate-400">
                  Class Schedule: {classStartTime} - {classEndTime}
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3 text-center">Type</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                <tr>
                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{sessionTitle}</p>
                    <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">
                      Includes lifetime access to study materials, live collaboration & tutor sessions.
                    </p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-[10px]">
                      Enrollment
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-gray-900 dark:text-white">
                    {fee === 0 ? "FREE" : `$${fee.toFixed(2)}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="space-y-1 text-xs text-gray-500 dark:text-slate-400">
              <p className="font-mono text-[11px] flex items-center gap-1">
                <LuHash className="text-gray-400" /> TxID: <span className="text-gray-800 dark:text-slate-200">{transactionId}</span>
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Verified by Collaborative Study Platform
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500 dark:text-slate-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">
                  {fee === 0 ? "$0.00" : `$${fee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-slate-400">
                <span>Tax & Platform Fee:</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">$0.00</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-slate-800">
                <span>Total Paid:</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {fee === 0 ? "FREE" : `$${fee.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-6 border-t border-gray-100 dark:border-slate-800 text-[11px] text-gray-400 dark:text-slate-500">
            <p>Thank you for learning with us! Keep this receipt for your personal academic records.</p>
            <p className="mt-0.5">Need help? Contact support@collaborativestudy.com</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoiceModal;
