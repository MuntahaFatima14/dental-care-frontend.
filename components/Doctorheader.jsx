import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function DoctorHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("doctorProfileImage") || "/img/doctor.png"
  );

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // CLOSE DROPDOWN WHEN CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsEditOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // HANDLE IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setProfileImage(reader.result);

        // Save image in session
        localStorage.setItem("doctorProfileImage", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // HANDLE LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("doctorProfileImage"); // clear session image
    navigate("/");
  };

  return (
    <header className="bg-whitish shadow-md p-2">
      <div className="flex justify-between  px-6 py-2">
        {/* LOGO */}
        <div className="flex items-center">
          <img
            src="./img/s.png"
            alt="logo"
            className="w-25 h-20 object-contain"
          />
        </div>

        {/* PROFILE SECTION */}
        <div
          ref={dropdownRef}
          className="relative flex justify-end space-x-3 cursor-pointer"
        >
          {/* PROFILE IMAGE (SMALL, ROUND, NO STRETCH) */}
          <img
            src={profileImage}
            alt="Doctor"
            className="!w-16 !h-16 !max-w-none rounded-full border shadow-sm object-cover cursor-pointer pimg"
            onClick={() => {
              setIsEditOpen((prev) => !prev);
              setIsDropdownOpen(false);
            }}
          />

          <span className="text-lg font-semibold text-gray-700">
            Dr. Jennie
          </span>

          {/* EDIT IMAGE MODAL */}
          {isEditOpen && (
            <div className="absolute right-0 mt-20 bg-white shadow-lg rounded-md p-3 text-sm w-40 z-50">
              <label
                htmlFor="uploadImage"
                className="cursor-pointer text-blue-600 hover:underline"
              >
                Change Profile Image
              </label>

              <input
                type="file"
                id="uploadImage"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          )}

          {/* CLICK ANYWHERE TO OPEN LOGOUT */}
          <div
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="absolute inset-0"
          ></div>

          {/* LOGOUT MENU */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-20 bg-white shadow-lg rounded-md p-3 text-sm w-32 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DoctorHeader;
