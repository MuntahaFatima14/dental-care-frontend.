import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronDown, HiLogout, HiCamera } from "react-icons/hi";

export default function DoctorProfileWidget() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Load doctor info from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("doctor_name") || "Dr. Jennie";
    setDoctorName(storedName);

    const storedImage = localStorage.getItem("doctorProfileImage") || "";
    setProfileImage(storedImage);

    // Sync with storage changes in case of multi-window updates
    const syncProfile = () => {
      setDoctorName(localStorage.getItem("doctor_name") || "Dr. Jennie");
      setProfileImage(localStorage.getItem("doctorProfileImage") || "");
    };
    window.addEventListener("storage", syncProfile);
    return () => window.removeEventListener("storage", syncProfile);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Robust initials generator
  const getInitials = (name) => {
    if (!name) return "DR";
    // Replace underscores/hyphens with spaces for splitting usernames
    let cleaned = name.replace(/[_-]/g, " ");
    // Remove prefixes like Dr. or Doctor
    cleaned = cleaned.replace(/^(dr\.?|doctor)\s+/i, "");
    const parts = cleaned.trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return "DR";
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const formattedName = doctorName.toLowerCase().startsWith("dr.") 
    ? doctorName 
    : `Dr. ${doctorName.charAt(0).toUpperCase() + doctorName.slice(1)}`;

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG or WEBP images are allowed!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB!");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        localStorage.setItem("doctorProfileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("doctor_token");
    localStorage.removeItem("doctor_name");
    localStorage.removeItem("doctorProfileImage");
    setDoctorName("");
    setProfileImage("");
    navigate("/");
  };

  return (
    <div className="relative font-Inter select-none mt-4 md:mt-6" ref={dropdownRef}>
      {/* Trigger Area */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200/80 px-4 py-2 rounded-2xl shadow-sm hover:shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]/20"
      >
        {/* Avatar Display */}
        {profileImage ? (
          <img
            src={profileImage}
            alt="Doctor profile"
            className="w-10 h-10 rounded-xl object-cover border border-gray-100"
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B8AA0] to-[#749BB5] text-white font-bold text-sm flex items-center justify-center shadow-inner">
            {getInitials(doctorName)}
          </div>
        )}

        {/* Doctor Name */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800 leading-tight">
            {formattedName}
          </span>
          <span className="text-[10px] font-semibold text-[#5B8AA0] uppercase tracking-wider">
            Attending Dentist
          </span>
        </div>

        <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2.5 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl z-[999] py-2">
          {/* Header section of dropdown */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Doctor profile"
                className="w-12 h-12 rounded-xl object-cover border border-gray-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5B8AA0] to-[#749BB5] text-white font-bold text-base flex items-center justify-center shadow-inner">
                {getInitials(doctorName)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 leading-tight">
                {formattedName}
              </span>
              <span className="text-xs text-gray-400">Attending Clinician</span>
            </div>
          </div>

          <div className="p-1.5 space-y-0.5">
            {/* Change Profile Image Action */}
            <button
              onClick={() => {
                fileInputRef.current?.click();
                setIsDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-[#E9F4F8] hover:text-[#5B8AA0] rounded-xl transition text-left"
            >
              <HiCamera className="w-4 h-4 text-gray-400" />
              Change Photo
            </button>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition text-left"
            >
              <HiLogout className="w-4 h-4 text-red-500" />
              Logout Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
