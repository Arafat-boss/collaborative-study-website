import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bgImg from "../../assets/authenticationLogin.png";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { LuMail, LuLock, LuArrowRight, LuSparkles } from "react-icons/lu";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  const publicAxios = useAxiosPublic();
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || (typeof location.state?.from === "string" ? location.state.from : "/");

  const isDemoFirebase = import.meta.env.VITE_apiKey?.includes("Dummy");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await loginUser(email, password);
      // Ensure user record is synced to MongoDB
      if (res.user?.email) {
        await publicAxios.post("/users", {
          name: res.user.displayName || email.split("@")[0],
          email: res.user.email,
          image: res.user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
          role: "student"
        }).catch((err) => console.log("User sync notice:", err));
      }
      toast.success(`Welcome back, ${res.user?.displayName || "User"}!`);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-api-key") {
        toast.error("Firebase API Key is invalid. Please add your real Firebase keys to .env.local file.");
      } else if (error.message?.includes("invalid-credential") || error.message?.includes("wrong-password") || error.code === "auth/user-not-found") {
        toast.error("Invalid email or password. Please try again or create an account.");
      } else {
        toast.error(error.message || "Failed to log in. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      const res = await googleLogin();
      const userInfo = {
        name: res.user?.displayName || "Google User",
        email: res.user?.email,
        image: res.user?.photoURL,
        role: "student"
      };

      await publicAxios.post("/users", userInfo).catch((err) => {
        console.log("User entry sync:", err);
      });

      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Google sign-in popup was closed before completion.");
      } else if (error.code === "auth/invalid-api-key" || error.message?.includes("API key not valid")) {
        toast.error("Invalid Firebase API Key! Please replace placeholder credentials in .env.local with your real Firebase Project keys.");
      } else if (error.code === "auth/unauthorized-domain") {
        toast.error("Domain unauthorized! Add localhost to Firebase Console > Authentication > Settings > Authorized domains.");
      } else {
        toast.error(error.message || "Google sign-in failed. Please check your Firebase configuration.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <Fade triggerOnce className="max-w-4xl w-full">
        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-gray-100 dark:border-slate-800 transition-colors">

        {/* Left Section with Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full filter blur-2xl pointer-events-none" />
          <div className="relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-md">
              <LuSparkles /> Collaborative Study
            </div>
            <h2 className="text-2xl lg:text-3xl font-black leading-tight">
              Unlock Your Full Learning Potential
            </h2>
            <p className="text-xs lg:text-sm text-blue-100 max-w-xs mx-auto">
              Join live study sessions, collaborate with mentors, and access curated materials in real time.
            </p>
            <img
              src={bgImg}
              alt="Illustration"
              className="object-contain h-56 lg:h-64 mt-4 drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="text-center sm:text-left mb-6 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
              Enter your account credentials to continue
            </p>
          </div>

          {/* Protected Access Login Prompt (Only shown when redirected from a session/protected action) */}
          {location.state?.from && (
            <div className="mb-5 p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <LuLock className="text-base mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-bold">Login Required</p>
                <p className="text-[11px] text-blue-700 dark:text-blue-400/90 mt-0.5">
                  Please sign in to access this study session, enroll, and view learning materials.
                </p>
              </div>
            </div>
          )}

          {isDemoFirebase && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs space-y-1">
              <p className="font-bold flex items-center gap-1">
                ⚠️ Firebase Keys Required for Live Auth:
              </p>
              <p className="text-[11px] leading-relaxed text-amber-700 dark:text-amber-400">
                Put your real Firebase credentials in <code>.env.local</code> to enable live Google Popup Sign-in and email authentication.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LuMail />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LuLock />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? "Signing in..." : "Sign In"}</span>
              <LuArrowRight />
            </button>
          </form>

          {/* Social Google Login */}
          <div className="mt-6 space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-xs text-gray-400 dark:text-slate-500 uppercase font-semibold absolute">
                Or continue with
              </span>
            </div>

            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-sm"
            >
              <FaGoogle className="text-red-500 text-base" />
              <span>Google Account</span>
            </button>
          </div>

          <div className="text-center mt-6 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </div>

        </div>
      </Fade>
    </div>
  );
};

export default Login;
