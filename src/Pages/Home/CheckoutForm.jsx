import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { LuCreditCard, LuLock, LuCalendar, LuUser, LuFileText, LuArrowRight, LuSparkles } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import InvoiceModal from "../../Components/InvoiceModal/InvoiceModal";

const CheckoutForm = ({ booked = {} }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const navigate = useNavigate();

  const registrationFee = parseFloat(booked.registrationFee || 0);

  useEffect(() => {
    if (registrationFee > 0) {
      axiosPublic
        .post("/create-payment-intent", { registrationFee })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          }
        })
        .catch((err) => {
          console.error("Payment intent error:", err);
        });
    }
  }, [axiosPublic, registrationFee]);

  const handleBookedSession = async (transId = "") => {
    try {
      const { _id, ...data } = booked;
      const res = await axiosPublic.post("/booked-sessions", {
        ...data,
        sessionId: _id,
        user: user?.email,
        studentName: user?.displayName || "Student",
        transactionId: transId,
        bookingDate: new Date().toISOString()
      });

      if (res.data?.message === "Session already booked") {
        toast.error("You have already booked this session.");
        navigate(`/dashboard/viewBookedSession`);
        return;
      }

      toast.success("Session successfully booked!");
      const invoiceData = {
        ...booked,
        sessionId: _id,
        user: user?.email,
        studentName: user?.displayName || "Student",
        transactionId: transId,
        invoiceNumber: res.data?.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`,
        bookingDate: new Date().toISOString(),
        registrationFee: registrationFee,
      };
      setBookingSuccessData(invoiceData);
    } catch (error) {
      toast.error("Failed to register session booking.");
      console.error("Booking error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registrationFee === 0) {
      setIsProcessing(true);
      await handleBookedSession("FREE_ENROLLMENT");
      setIsProcessing(false);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        toast.error(error.message);
        setIsProcessing(false);
        return;
      }

      if (!clientSecret) {
        toast.error("Payment initialization failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              email: user?.email || "student@example.com",
              name: user?.displayName || "Student",
            },
          },
        });

      if (confirmError) {
        toast.error(confirmError.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        toast.success("Payment completed successfully!");
        await handleBookedSession(paymentIntent.id);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Success Confirmation Screen with Download Invoice Option
  if (bookingSuccessData) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl p-6 sm:p-10 max-w-xl mx-auto text-center space-y-6 transition-colors">
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 dark:text-emerald-400 flex items-center justify-center text-4xl mx-auto shadow-inner">
          <FaCheckCircle />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Enrollment Confirmed!
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
            You are officially enrolled in <strong className="text-gray-900 dark:text-white">{booked.sessionTitle}</strong>. An official invoice receipt has been generated.
          </p>
        </div>

        {/* Invoice Info Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Invoice Number:</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {bookingSuccessData.invoiceNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Transaction ID:</span>
            <span className="font-mono text-gray-700 dark:text-slate-300">
              {bookingSuccessData.transactionId}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Amount Paid:</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {registrationFee === 0 ? "FREE" : `$${registrationFee.toFixed(2)}`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all"
          >
            <LuFileText className="text-base" />
            <span>Download / Print Invoice</span>
          </button>
          <Link
            to="/dashboard/viewBookedSession"
            className="flex-1 py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>My Booked Sessions</span>
            <LuArrowRight />
          </Link>
        </div>

        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          data={bookingSuccessData}
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl p-6 sm:p-8 md:p-10 max-w-xl mx-auto space-y-6 transition-colors">
      
      {/* Session Header Card */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800">
        <img
          src={booked.sessionImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200"}
          alt={booked.sessionTitle || "Session"}
          className="w-full sm:w-20 h-28 sm:h-20 rounded-xl object-cover shadow-sm flex-shrink-0"
        />
        <div className="min-w-0 flex-1 text-center sm:text-left space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/50">
            Enrolling in Session
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
            {booked.sessionTitle || "Study Session"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1">
            <LuUser className="text-gray-400" /> By {booked.tutorName || "Instructor"}
          </p>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 py-2 border-y border-gray-100 dark:border-slate-800 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-slate-400">
          <span>Session Enrollment Fee</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {registrationFee === 0 ? "FREE" : `$${registrationFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-slate-400">
          <span>Processing Fee</span>
          <span className="font-semibold text-gray-900 dark:text-white">$0.00</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-slate-800">
          <span>Total Payable</span>
          <span className="text-blue-600 dark:text-blue-400">
            {registrationFee === 0 ? "FREE" : `$${registrationFee.toFixed(2)}`}
          </span>
        </div>
      </div>

      {transactionId && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-mono">
          Transaction ID: {transactionId}
        </div>
      )}

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {registrationFee > 0 && (
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
              Card Information
            </label>
            <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      color: "#1e293b",
                      "::placeholder": {
                        color: "#94a3b8",
                      },
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing || (registrationFee > 0 && (!stripe || !clientSecret))}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LuLock className="text-base" />
          <span>
            {isProcessing
              ? "Processing..."
              : registrationFee === 0
              ? "Confirm Free Enrollment"
              : `Pay $${registrationFee.toFixed(2)} Now`}
          </span>
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
