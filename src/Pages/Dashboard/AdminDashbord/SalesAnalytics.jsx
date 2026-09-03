import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import InvoiceModal from "../../../Components/InvoiceModal/InvoiceModal";
import Loader from "../../../Components/Loader/Loader";
import {
  LuDollarSign,
  LuCalendar,
  LuBookOpen,
  LuCreditCard,
  LuTrendingUp,
  LuSearch,
  LuFilter,
  LuFileText,
  LuPrinter,
  LuArrowUpRight,
  LuSparkles,
} from "react-icons/lu";
import { FaCheckCircle, FaChartBar, FaChartPie } from "react-icons/fa";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

const SalesAnalytics = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-sales-analytics"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin/sales-analytics");
      return res.data || {};
    },
  });

  const { summary = {}, monthlyStats = [], transactions = [] } = data || {};

  // Filter transactions
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      (item.user || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sessionTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.invoiceNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.transactionId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tutorName || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all"
        ? true
        : selectedStatus === "paid"
        ? item.registrationFee > 0
        : item.registrationFee === 0;

    const matchesMonth =
      selectedMonth === "all"
        ? true
        : new Date(item.bookingDate || Date.now()).getMonth() === parseInt(selectedMonth, 10);

    return matchesSearch && matchesStatus && matchesMonth;
  });

  const openInvoice = (booking) => {
    setSelectedInvoice(booking);
    setIsInvoiceOpen(true);
  };

  const pieData = [
    { name: "Paid Enrollments", value: summary.paidBookings || 0 },
    { name: "Free Enrollments", value: summary.freeBookings || 0 },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Financial & Sales Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">
            Real-time monthly revenue records, enrollment statistics, and downloadable invoice management.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-2"
        >
          <LuTrendingUp />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
              <LuDollarSign />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              ${(summary.totalRevenue || 0).toLocaleString()}
            </h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <LuSparkles /> Lifetime earnings from paid sessions
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
        </div>

        {/* This Month Revenue */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              This Month ({summary.currentMonthName || "Current"})
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
              <LuTrendingUp />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              ${(summary.thisMonthRevenue || 0).toLocaleString()}
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Earned in {summary.currentMonthName} {summary.currentYear}
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
        </div>

        {/* Total Bookings */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              Total Enrollments
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg">
              <LuBookOpen />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {(summary.totalBookings || 0).toLocaleString()}
            </h2>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1">
              Active student enrollments
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
        </div>

        {/* Paid vs Free Ratio */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              Paid vs Free
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg">
              <LuCreditCard />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {summary.paidBookings || 0} Paid
            </span>
            <span className="text-sm font-bold text-gray-400 dark:text-slate-500">/</span>
            <span className="text-lg font-bold text-gray-600 dark:text-slate-400">
              {summary.freeBookings || 0} Free
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {summary.totalBookings > 0
              ? `${Math.round(((summary.paidBookings || 0) / summary.totalBookings) * 100)}% paid conversions`
              : "0% conversions"}
          </p>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
        </div>

      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Monthly Revenue & Booking Trend Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaChartBar className="text-blue-600" /> Monthly Revenue & Enrollment Overview ({summary.currentYear})
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Monthly revenue ($) and student booking count breakdown for the year.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700">
              Year {summary.currentYear || new Date().getFullYear()}
            </span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyStats} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  stroke="#3b82f6"
                  fontSize={12}
                  tickFormatter={(val) => `$${val}`}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#10b981"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "16px",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                  formatter={(value, name) => [
                    name === "Revenue ($)" ? `$${value}` : `${value} enrollments`,
                    name,
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="Revenue ($)"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  name="Bookings Count"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                  activeDot={{ r: 7 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment Distribution Pie Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaChartPie className="text-emerald-500" /> Enrollment Distribution
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Ratio of paid course sales versus free enrollments.
            </p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            {summary.totalBookings > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      color: "#f8fafc",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-gray-400 text-center">No enrollment records to plot yet.</p>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                <span className="w-3 h-3 rounded-full bg-blue-500" /> Paid Enrollments
              </span>
              <span className="font-bold text-gray-900 dark:text-white">{summary.paidBookings || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Free Enrollments
              </span>
              <span className="font-bold text-gray-900 dark:text-white">{summary.freeBookings || 0}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Transaction & Invoice Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-6 sm:p-8">
        
        {/* Table Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              All Sales & Invoices ({filteredTransactions.length})
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Inspect student payments, transaction IDs, and generate official downloadable receipts.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search email, session, invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-xs text-gray-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Month Filter */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-xs font-semibold text-gray-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Months</option>
              {monthlyStats.map((m) => (
                <option key={m.monthIndex} value={m.monthIndex}>
                  {m.month} (Revenue: ${m.revenue})
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-xs font-semibold text-gray-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="paid">Paid Only</option>
              <option value="free">Free Only</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-gray-500 dark:text-slate-400 uppercase tracking-wider font-bold">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Student / Buyer</th>
                <th className="px-5 py-3.5">Study Session</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-gray-700 dark:text-slate-300">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item, idx) => (
                  <tr
                    key={item._id || idx}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {/* Invoice # */}
                    <td className="px-5 py-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.invoiceNumber || `INV-${String(idx + 1).padStart(5, '0')}`}
                    </td>

                    {/* Student Info */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-gray-900 dark:text-white truncate max-w-[180px]">
                        {item.user || "student@example.com"}
                      </p>
                      {item.studentName && (
                        <p className="text-[11px] text-gray-400 dark:text-slate-500">{item.studentName}</p>
                      )}
                    </td>

                    {/* Session Title & Tutor */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-1 max-w-[200px]">
                        {item.sessionTitle || "Study Session"}
                      </p>
                      <p className="text-[11px] text-gray-400 dark:text-slate-500">
                        Tutor: {item.tutorName || item.tutorEmail || "Instructor"}
                      </p>
                    </td>

                    {/* Fee & Status */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {item.registrationFee === 0 ? "FREE" : `$${Number(item.registrationFee).toFixed(2)}`}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            item.registrationFee > 0
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400"
                              : "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400"
                          }`}
                        >
                          {item.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Booking Date */}
                    <td className="px-5 py-4 text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {item.bookingDateFormatted || "N/A"}
                    </td>

                    {/* Transaction ID */}
                    <td className="px-5 py-4 font-mono text-[11px] text-gray-500 dark:text-slate-400 truncate max-w-[140px]">
                      {item.transactionId || "FREE_ENROLLMENT"}
                    </td>

                    {/* Action: View Invoice */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openInvoice(item)}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <LuFileText />
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 dark:text-slate-500">
                    No transactions or sales matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Invoice Modal for Admin preview and printing */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        data={selectedInvoice}
      />
    </div>
  );
};

export default SalesAnalytics;
