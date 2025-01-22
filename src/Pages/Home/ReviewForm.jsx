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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-4">Submit Your Review</h2>
        <p className="text-center text-gray-600 mb-6">
          Share your experience and rate us!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={user?.displayName}
              readOnly
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-gray-700 mb-1">Student Email</label>
            <input
              type="email"
              name="studentEmail"
              value={user?.email}
              readOnly
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-gray-700 mb-1">Your Review</label>
            <textarea
              name="reviewText"
              placeholder="Write your review here"
              className="textarea textarea-bordered w-full h-28"
              required
            ></textarea>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 mb-1">Add Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
