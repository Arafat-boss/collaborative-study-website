import { useLoaderData } from "react-router-dom";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

const BookedDetails = () => {
    const booked = useLoaderData();
    console.log(booked);
    const { title, registrationFee, sessionImage } = booked;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[5px] shadow-lg border border-gray-100 dark:border-slate-800 p-6 sm:p-8">
                <div>
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Checkout</h2>
                    
                    {/* Course Details */}
                    <div className="text-center mb-6">
                        <figure>
                            <img
                                src={sessionImage}
                                alt={title}
                                className="rounded-[5px] object-cover w-full h-40 mb-4"
                            />
                        </figure>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                        <p className="text-gray-500 dark:text-slate-400 mt-1">Fee: <span className="font-bold text-blue-600 dark:text-blue-400">${registrationFee}</span></p>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-4">
                        <div className="flex justify-center gap-3 mb-4">
                            <FaCcVisa size={32} className="text-blue-600 dark:text-blue-400" />
                            <FaCcMastercard size={32} className="text-blue-600 dark:text-blue-400" />
                            <FaCcAmex size={32} className="text-blue-600 dark:text-blue-400" />
                            <FaCcDiscover size={32} className="text-blue-600 dark:text-blue-400" />
                        </div>

                        <input
                            type="text"
                            placeholder="Card number"
                            className="w-full px-4 py-2.5 rounded-[5px] border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="MM / YY"
                                className="w-1/2 px-4 py-2.5 rounded-[5px] border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                className="w-1/2 px-4 py-2.5 rounded-[5px] border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button className="w-full py-2.5 px-4 rounded-[5px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all">
                            Pay ${registrationFee}
                        </button>
                        <button className="w-full py-2.5 px-4 rounded-[5px] border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 font-semibold text-sm mt-2 transition-all">
                            Pay Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedDetails;
