import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuArrowLeft, LuHouse } from 'react-icons/lu';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-12 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Left text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
          <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-100">
            404 Error
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            The page you are looking for might have been moved, removed, or doesn't exist. Let's get you back on track!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <LuArrowLeft />
              <span>Go Back</span>
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <LuHouse />
              <span>Take Me Home</span>
            </Link>
          </div>
        </div>

        {/* Right illustration */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=600&auto=format&fit=crop&q=80"
            alt="404 illustration"
            className="w-full max-w-sm h-64 sm:h-80 object-cover rounded-2xl shadow-md"
          />
        </div>

      </div>
    </section>
  );
};

export default ErrorPage;
