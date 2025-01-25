// import { useLoaderData, useParams } from "react-router-dom";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import SectionTitle from "../../Components/SectionTitle/SectionTitle";
// import ReviewForm from "../../Pages/Home/ReviewForm";



// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)
// const Payment = () => {
//     const id = useParams();
//     console.log(id);
//     const booked = useLoaderData();
//     console.log(booked);
//     // const { title, registrationFee, sessionImage } = booked;

//     return (
//         <>
//         <SectionTitle header={'Payment Options'} subHeader={`Choose from multiple secure payment methods, including credit/debit cards, digital wallets, and bank transfers, for your convenience.`}></SectionTitle>
//         <Elements stripe={stripePromise}>
//             <CheckoutForm booked={booked}></CheckoutForm>
//         </Elements>
//         <ReviewForm></ReviewForm>
//         </>
//     );
// };

// export default Payment;


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import ReviewForm from "../../Pages/Home/ReviewForm";
import { useLoaderData, useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {
  const { id } = useParams();
  const booked = useLoaderData();
  console.log(booked,id);

  return (
    <>
      <SectionTitle
        header={"Payment Options"}
        subHeader={`Choose from multiple secure payment methods, including credit/debit cards, digital wallets, and bank transfers, for your convenience.`}
      />
      <Elements stripe={stripePromise}>
        <CheckoutForm booked={booked} />
      </Elements>
      <ReviewForm />
    </>
  );
};

export default Payment;

