import React, { useContext, useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import bgImg from "../../assets/authenticationLogin.png";
import { AuthContext } from "../../Context/AuthProvider";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [disable, setDisable] = useState(true);

  const handelSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //Login fun
    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Login with Google
  const handelGoogle = () => {
    googleLogin().then((res) => console.log(res.user));
  };

    //capctcha------
    useEffect(() => {
      loadCaptchaEnginge(4);
    }, []);
  //captcha function
  const handelCaptcha = (e) => {
    const value = e.target.value;
    console.log(value);
    if (validateCaptcha(value)) {
      setDisable(false);
    } else {
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      //   style={{
      //     backgroundImage: `url(${bgImg})`,
      //   }}
    >
      <div
        className=" bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2"
        // style={{
        //   backgroundImage: `url(${bgImg})`,
        // }}
      >
        {/* Left Section with Illustration */}
        <div className="hidden md:flex items-center justify-center p-6">
          <img src={bgImg} alt="Illustration" className="object-contain h-80" />
        </div>

        {/* Right Section with Login Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handelSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
            </div>
            {/* Captcha Section */}
            <div>
              <label className="block text-gray-700 mb-2">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handelCaptcha}
                type="text"
                name="captcha"
                placeholder="Type here"
                className="input input-bordered w-full mt-2"
              />
            </div>

            {/* Submit Button */}
            <button disabled={disable} className="btn btn-primary w-full">Log In</button>
          </form>

          {/* Additional Options */}
          <div className="text-center mt-4">
            <p className="text-sm">
              New here?{" "}
              <Link to="/register" className="text-blue-500 underline">
                Create a New Account
              </Link>
            </p>
            <p className="text-sm mt-4">Or sign in with</p>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={handelGoogle}
                className="btn btn-circle btn-outline"
              >
                <FaGoogle className="text-xl" />
              </button>
              <button className="btn btn-circle btn-outline">
                <FaFacebook className="text-xl" />
              </button>
              <button className="btn btn-circle btn-outline">
                <FaGithub className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
