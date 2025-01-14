import React, { useContext } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import bgImg from '../../assets/Sign.png'
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
    const {createUserEmailAndPass} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()


  //using a react-hook-form---Npm--1
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //using a react-hook-form---Npm--2
  const onSubmit = (data) => {
    console.log(data);
    createUserEmailAndPass(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state ? location.state : "/");
        //profile updated
        // userUpdateProfile(data.name, data.photo)
        //   .then((res) => {
        //     const userInfo = {
        //       name: data.name,
        //       email: data.email,
        //     };
        //     //save user info in database
        //     publicAxios.post("/users", userInfo).then((res) => {
        //       console.log(res.data);
        //       toast.success("Successfully created!");
        //       navigate("/");
        //     });
        //   })
        //   .then((err) => console.log("err.message"));
      })
      .catch((err) => console.log(err.message));

    reset();
  };

  const handelGoogle = () => {
    googleUser().then((res) => {
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
      };
      publicAxios.post("/users", userInfo).then((result) => {
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
        // style={{
        //   backgroundImage: `url(${bgImg})`,
        // }}
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
            <button
              type="submit"
              className="btn btn-primary w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already registered?{" "}
            <a href="/login" className="text-yellow-500 hover:underline">
              Go to log in
            </a>
          </p>
          <div className="text-center mt-4">
            <p>Or sign up with</p>
            <div className="flex justify-center space-x-4 mt-2">
              <FaFacebook className="text-2xl text-blue-600 cursor-pointer" />
              <span onClick={handelGoogle}>
                {" "}
                <FaGoogle className="text-2xl text-red-600 cursor-pointer" />
              </span>
              <FaApple className="text-2xl text-gray-800 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={bgImg} // Replace with your illustration image URL
            alt="Sign up illustration"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
