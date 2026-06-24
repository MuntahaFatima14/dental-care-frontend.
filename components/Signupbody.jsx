import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Signupbody() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // Track state inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing on form click

    if (formData.password !== formData.confirmPassword) {
      alert("Error: Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please Log In.");
        navigate("/"); // Automatically redirects to Sign In view page
      } else {
        alert(`Signup failed: ${data.error || "Username might be taken."}`);
      }
    } catch (err) {
      console.error("Signup network crash:", err);
      alert("Network connection error reaching backend.");
    }
  };

  return (
    <div className="px-4 md:px-16 pb-10">
      <h1 className="text-3xl font-bold mb-2 mt-10 text-center">For Doctor</h1>

      <div className="flex flex-col md:flex-row justify-center items-center lg:mx-auto lg:w-4/6 md:mx-0">
        {/* Left: Sign-up form */}
        <div className="flex flex-col justify-center items-center md:p-10 sm:p-5 w-full ">
          <form onSubmit={handleFormSubmit} className="bg-gray-50 px-8 py-10 rounded-lg w-full mb-5 max-w-sm mx-auto shadow-md">
            <h3 className="text-2xl font-bold font-Inter">Sign Up</h3>
            <p className="mb-4 text-xs text-gray-400"></p>
            
            {/* Name Input */}
            <div className="relative mb-3">
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="User Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
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

            {/*Confirm Password Input */}
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Sign up button */}
            <button
              type="submit"
              className="w-full bg-[#5B8AA0] text-white py-2 mb-1 rounded-md hover:bg-gray-500 transition font-semibold shadow"
            >
              Sign Up
            </button>

            <div className="flex items-center justify-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <p className="text-sm mt-4 text-gray-500 text-center">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 underline font-bold">
                Log In
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center w-full">
          <img
            src="./img/pic10.jpeg"
            alt="logo"
            className="SignUpImg w-60 h-60 md:w-80 md:h-80 borderrad borderstroke shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Signupbody;