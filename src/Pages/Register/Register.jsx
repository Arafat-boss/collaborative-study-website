import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import bgImg from "../../assets/Sign.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { LuUser, LuMail, LuLock, LuImage, LuGraduationCap, LuSparkles } from "react-icons/lu";
import { Fade } from "react-awesome-reveal";

const Register = () => {
  const { createUserEmailAndPass, userUpdateProfile, googleLogin } = useContext(AuthContext);
  const publicAxios = useAxiosPublic();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await createUserEmailAndPass(data.email, data.password);
      await userUpdateProfile(data.name, data.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200");

      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        image: data.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
      };

      await publicAxios.post("/users", userInfo);
      toast.success("Account created successfully!");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message?.includes("email-already-in-use")
        ? "This email is already registered. Please sign in instead."
        : err.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      const res = await googleLogin();
      const userInfo = {
        name: res.user?.displayName,
        email: res.user?.email,
        image: res.user?.photoURL,
        role: "student"
      };

      await publicAxios.post("/users", userInfo).catch((err) => {
        console.log("User may already exist:", err);
      });

      toast.success("Account created with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google sign-up error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Google sign-in popup was closed before completion.");
      } else if (error.code === "auth/invalid-api-key" || error.message?.includes("API key not valid")) {
        toast.error("Invalid Firebase API Key! Please set your real Firebase credentials in .env.local file.");
      } else if (error.code === "auth/unauthorized-domain") {
        toast.error("Domain unauthorized in Firebase Console. Add localhost under Authentication Settings.");
      } else {
        toast.error(error.message || "Google sign-up failed. Check your Firebase keys.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <Fade triggerOnce className="max-w-4xl w-full">
        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-gray-100 dark:border-slate-800 transition-colors">

        {/* Left Section - Form */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="text-center sm:text-left mb-6 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
              Join as a student or tutor to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LuUser />
                </div>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Profile Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LuImage />
                </div>
                <input
                  type="url"
                  {...register("photo")}
                  placeholder="https://example.com/avatar.jpg (optional)"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LuMail />
                </div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LuLock />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Category / Role */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                I am joining as
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LuGraduationCap />
                </div>
                <select
                  defaultValue="student"
                  {...register("role", { required: "Please select a category" })}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white transition-all"
                >
                  <option value="student">Student (Learn & Book Sessions)</option>
                  <option value="tutor">Tutor / Instructor (Teach & Publish)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
            </button>
          </form>

          {/* Social Google Login */}
          <div className="mt-5 space-y-3">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-xs text-gray-400 uppercase font-semibold absolute">
                Or sign up with
              </span>
            </div>

            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-sm"
            >
              <FaGoogle className="text-red-500 text-base" />
              <span>Google Account</span>
            </button>
          </div>

          <div className="text-center mt-5 text-xs sm:text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Section with Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full filter blur-2xl pointer-events-none" />
          <div className="relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-md">
              <LuSparkles /> Collaborative Study
            </div>
            <h2 className="text-2xl lg:text-3xl font-black leading-tight">
              Join a Community of Lifelong Learners
            </h2>
            <p className="text-xs lg:text-sm text-blue-100 max-w-xs mx-auto">
              Schedule sessions, exchange resources, and achieve your academic goals together.
            </p>
            <img
              src={bgImg}
              alt="Sign up illustration"
              className="object-contain h-56 lg:h-64 mt-4 drop-shadow-xl"
            />
          </div>
        </div>

        </div>
      </Fade>
    </div>
  );
};

export default Register;
