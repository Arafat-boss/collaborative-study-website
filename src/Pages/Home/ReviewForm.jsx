import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ReviewForm = () => {
    const {user} = useAuth()
  const [rating, setRating] = useState(0);
  const axiosPublic = useAxiosPublic()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const studentName = form.studentName.value;
    const studentEmail = form.studentEmail.value;
    const reviewText = form.reviewText.value;

    const reviewData = {
      studentName,
      studentEmail,
      reviewText,
      rating,
    };
    console.log(reviewData);

    // Add your API call or data handling logic here
    try {
        const response = await axiosPublic.post("/all-reviews", reviewData);
        if (response.status === 201 || response.status === 200) {
          toast.success("Review submitted successfully!");
          form.reset();
          setRating(0); // Reset rating
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        toast.error("Failed to submit review. Please try again.");
      }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 p-5">
      <div className="bg-white dark:bg-slate-900 shadow-lg rounded-[5px] p-6 sm:p-8 max-w-3xl w-full border border-gray-100 dark:border-slate-800">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">Submit Your Review</h2>
        <p className="text-center text-gray-500 dark:text-slate-400 mb-6 text-sm">
          Share your experience and rate us!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={user?.displayName || ""}
              readOnly
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-[5px] border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-gray-800 dark:text-white focus:outline-none"
              required
            />
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">Student Email</label>
            <input
              type="email"
              name="studentEmail"
              value={user?.email || ""}
              readOnly
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-[5px] border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-gray-800 dark:text-white focus:outline-none"
              required
            />
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">Your Review</label>
            <textarea
              name="reviewText"
              placeholder="Write your review here"
              className="w-full px-4 py-3 rounded-[5px] border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 h-28"
              required
            ></textarea>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">Add Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer ${
                    star <= rating ? "text-amber-400" : "text-gray-300 dark:text-slate-700"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 px-6 rounded-[5px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
