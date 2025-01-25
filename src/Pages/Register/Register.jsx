import React, { useContext } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import bgImg from "../../assets/Sign.png";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const img_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
  const { createUserEmailAndPass, userUpdateProfile,googleLogin } = useContext(AuthContext);
  const publicAxios = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  //using a react-hook-form---Npm--1
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //using a react-hook-form---Npm--2
  const onSubmit = async (data) => {
    console.log(data.role);

    //create user email and pass
    createUserEmailAndPass(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state ? location.state : "/");
        //profile updated
        userUpdateProfile(data.name, data.photo)
          .then((res) => {
            const userInfo = {
              name: data.name,
              email: data.email,
              role: data.role,
              image:data.photo
            };
            //save user info in database
            publicAxios.post("/users", userInfo).then((res) => {
              toast.success("Successfully created!");
              navigate(from, { replace: true });
            });
          })
          .catch((err) => console.log("err.message", err));
      })
      .catch((err) => console.log(err.message));

    reset();
  };

  const handelGoogle = () => {
    googleLogin().then((res) => {
      const userInfo = {
        name: res.user?.displayName,
        email: res.user?.email,
        role: 'student'
      };
      publicAxios.post("/users", userInfo)
      .then((result) => {
        console.log(result.data);
      });
      navigate("/");
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      //   style={{
      //     backgroundImage: `url(${bgImg})`,
      //   }}
    >
      {/* Card */}
      <div
        className="bg-white shadow-lg rounded-lg p-8 md:flex md:items-center md:space-x-10 w-full max-w-4xl"
      >
        {/* Form Section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                //using a react-hook-form---Npm---3
                {...register("name", { required: true })}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <input
                type="text"
                //using a react-hook-form---Npm---3
                {...register("photo", { required: true })}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                //using a react-hook-form---Npm
                {...register("email", { required: true })}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                //using a react-hook-form---Npm
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                })}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
              {errors.password?.type === "pattern" && (
                <p className="text-red-400">
                  Password must contain at least 1 A-Z, 1 a-z, 1 number, and be
                  at least 6 characters long.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue="default"
                {...register("role", { required: "Category is required" })}
                className={`select select-bordered w-full ${
                  errors.role ? "select-error" : ""
                }`}
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm">
                  {errors.role.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 border-none text-white"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already registered?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Go to log in
            </a>
          </p>
          <div className="text-center mt-4">
            <p>Or sign up with</p>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="btn btn-circle btn-outline">
              <FaFacebook className="text-2xl text-blue-600 cursor-pointer" />
              </div>
              <button
                onClick={handelGoogle}
                className="btn btn-circle btn-outline"
              >
                <FaGoogle className="text-xl" />
              </button>
              <div className="btn btn-circle btn-outline">
              <FaApple className="text-2xl text-gray-800 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 ">
          <img
            src={bgImg} // Replace with your illustration image URL
            alt="Sign up illustration"
            className="rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
