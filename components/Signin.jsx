import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi"; // 👁️ using heroicons

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="px-4 md:px-16">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 mt-10 text-center">For Doctor</h1>

      {/* Sign-in + Image Section */}
      <div className="flex flex-col md:flex-row justify-center items-center lg:mx-auto lg:w-4/6  md:mx-0">
        {/* Left: Sign-in form */}
        <div className="flex flex-col justify-center items-center md:p-10 sm:p-5 w-full ">
          <form className="bg-gray-50 px-8 py-14 rounded-lg w-full mb-5 max-w-sm mx-auto shadow-md">
            <h3 className="text-2xl font-bold font-Inter">Sign In</h3>
            <p className="mb-6 mt-2 text-xs text-gray-400">
              Please login to continue to your account.
            </p>

            {/* Email Input */}
            <div className="relative mb-3">
              {/* <label
                htmlFor="email"
                className="absolute -top-2 left-3 bg-gray-50 text-xs text-blue-600 px-1"
              >
                Email
              </label> */}
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative mb-3">
              <label
                htmlFor="password"
                className="absolute -top-2 left-3 bg-gray-50 text-xs text-blue-600 px-1"
              ></label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            {/* Checkbox */}
            <div className="flex mt-2 items-center mb-4">
              <input className="mr-2" type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-xs">
                Keep me logged in
              </label>
            </div>

            {/* Sign in button */}
            <button
              type="submit" 
              className="w-full bg-[#5B8AA0] text-white py-2 mb-1 rounded-md hover:bg-gray-500 transition"
            >
              <Link to="/doctorpage">Sign in</Link>
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Signup link */}
            <p className="text-sm mt-4 text-gray-500 text-center">
              Need an account?{" "}
              <Link to="/signup"  className="text-blue-600 underline font-bold">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center  w-full ">
          {/* <div className="borderrad bg-white p-3"> */}
          <img
            src="./img/pic9.jpeg"
            alt="logo"
            className="SignUpImg w-4/5 h-4/5 md:w-4/5 md:h-4/5 borderrad borderstroke  shadow-md "
          />
          {/* </div> */}
        </div>
      </div>

      {/* Info Section */}
     
    </div>
  );
}

export default Signin;
