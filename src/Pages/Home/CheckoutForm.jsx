import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booked }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isBooking, setIsBooking] = useState(false); 
  const navigate = useNavigate(); 

  // Convert registrationFee to a number
  const registrationFee = parseFloat(booked.registrationFee);

  useEffect(() => {
    if (registrationFee > 0) {
      axiosPublic
        .post("/create-payment-intent", { registrationFee })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosPublic, registrationFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Payment Error:", error);
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Payment Confirmation Error:", confirmError);
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      toast.success("Payment successful! Thank you.");
      handleBookedSession(); 
    }
  };

  //===============================

  const handleBookedSession = async () => {
    try {
      const { _id, ...data } = booked;
      setIsBooking(true);
      const res = await axiosPublic.post("/booked-sessions", {
        ...data,
        sessionId: _id,
        user: user.email,
      });

      if (res.data.message === "Session already booked") {
        toast.error("You have already booked this session.");
        navigate(`/dashboard/viewBookedSession`);
      } else if (res.data.insertedId) {
        // toast.success("Session successfully booked!");
        navigate(`/dashboard/viewBookedSession`);
      }
    } catch (error) {
      toast.error("Failed to book the session. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>

      <div className="flex items-center mb-4">
        <img
          src={booked.sessionImage}
          alt="Session"
          className="w-16 h-16 rounded-lg mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{booked.sessionTitle}</h3>
          <p className="text-sm text-gray-600">
            By <span className="font-semibold">{booked.tutorName}</span>
          </p>
        </div>
      </div>

      <p className="text-gray-700">
        Please complete your payment for the session{" "}
        <span className="font-semibold">{booked.sessionTitle}</span>. The
        registration fee is{" "}
        <span className="text-blue-600 font-semibold">${registrationFee}</span>.
      </p>

      <p className="text-gray-500 text-sm mt-2">
        Registration closes on{" "}
        <span className="font-semibold">{booked.registrationEndDate}</span>.
      </p>

      {transactionId && (
        <p className="text-green-500 mt-4">
          Payment Successful! Transaction ID: {transactionId}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="p-4 border rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {transactionId ? (
          <>
            <button
              type="submit"
              disabled={!stripe || !clientSecret || isBooking}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300"
            >
              Paid ${registrationFee}
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              disabled={!stripe || !clientSecret || isBooking}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Pay ${registrationFee}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;




