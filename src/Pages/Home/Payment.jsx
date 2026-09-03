import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { LuShieldCheck, LuArrowLeft } from "react-icons/lu";

const stripeKey = import.meta.env.VITE_PAYMENT || "pk_test_placeholder";
const stripePromise = loadStripe(stripeKey);

const Payment = () => {
  const { id } = useParams();
  const booked = useLoaderData() || {};

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to={booked?._id ? `/cardDetails/${booked._id}` : "/"}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <LuArrowLeft />
        <span>Back to Session Details</span>
      </Link>

      <SectionTitle
        header="Secure Checkout"
        subHeader="Complete your payment securely to reserve your seat in this study session."
      />

      <div className="mt-8">
        <Elements stripe={stripePromise}>
          <CheckoutForm booked={booked} />
        </Elements>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-8">
        <LuShieldCheck className="text-emerald-500 text-base" />
        <span>256-bit encrypted SSL checkout powered by Stripe</span>
      </div>
    </div>
  );
};

export default Payment;
