import { useLoaderData } from "react-router-dom";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

const BookedDetails = () => {
    const booked = useLoaderData();
    console.log(booked);
    const { title, registrationFee, sessionImage } = booked;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-white shadow-lg">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-primary">Checkout</h2>
                    
                    {/* Course Details */}
                    <div className="text-center mb-6">
                        <figure>
                            <img
                                src={sessionImage}
                                alt={title}
                                className="rounded-md object-cover w-full h-40 mb-4"
                            />
                        </figure>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-gray-600">Fee: <span className="font-bold">${registrationFee}</span></p>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-4">
                        <div className="flex justify-center gap-3 mb-4">
                            <FaCcVisa size={32} className="text-blue-600" />
                            <FaCcMastercard size={32} className="text-red-600" />
                            <FaCcAmex size={32} className="text-indigo-600" />
                            <FaCcDiscover size={32} className="text-orange-600" />
                        </div>

                        <input
                            type="text"
                            placeholder="Card number"
                            className="input input-bordered w-full"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="MM / YY"
                                className="input input-bordered w-1/2"
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                className="input input-bordered w-1/2"
                            />
                        </div>

                        <button className="btn btn-primary w-full">Pay ${registrationFee}</button>
                        <button className="btn btn-secondary w-full mt-2">Pay Later</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedDetails;
