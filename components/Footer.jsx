import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    if (location.pathname === "/homepage") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/homepage", { state: { scrollToId: id } });
    }
  };

  const handleHomeClick = (e) => {
    if (location.pathname === "/homepage") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-lightwhite text-gray-800 pt-20 pb-10 px-6 Font_Ins mx-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

        {/* Left section - Logo + Nav */}
        <div className="flex flex-col  md:items-start ">
          <div className="flex items-center gap-3 mb-4">

            <img src="/img/ss.png" alt="DentalCare Logo" className="w-52 h-24" />


          </div>

          <ul className="flex flex-col md:flex-row sm:flex-row  sm:w-full gap-4 md:gap-8 text-gray-700 text-sm font-normal">
            <li><Link to="/homepage" onClick={handleHomeClick} className="hover:text-[#0aa1b8] transition">Home</Link></li>
            <li><a href="#about" onClick={(e) => handleScrollTo(e, "about")} className="hover:text-[#0aa1b8] transition">About</a></li>
            <li><Link to="/servicepage" className="hover:text-[#0aa1b8] transition">Services</Link></li>
            <li><a href="#contact" onClick={(e) => handleScrollTo(e, "contact")} className="hover:text-[#0aa1b8] transition">Contact</a></li>
          </ul>
        </div>

        {/* Right section - Contact Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">

            <img src="/img/home.jpg" alt="Home Icon" className="w-14 h-12  shadow-md  borderrad" />

            <p className="text-sm">123 Smile street, San Francisco, USA</p>
          </div>

          <div className="flex items-center gap-3">

            <img src="/img/email.jpg" alt="Email Icon" className="w-14 h-12  shadow-md  borderrad" />

            <p className="text-sm">info@DentalCare.com</p>
          </div>

          <div className="flex items-center gap-3">

            <img src="/img/phone.jpg" alt="Phone Icon" className="w-14 h-12  shadow-md  borderrad" />

            <p className="text-sm">(021) 456-7890</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-10 text-sm text-gray-700">
        <p>Copyright © 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
