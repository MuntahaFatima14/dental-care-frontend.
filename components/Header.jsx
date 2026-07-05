import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Contactform from "./Contactform";
import AIImpactSection from "./Ai_impactsection";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToId) {
      const id = location.state.scrollToId;
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        // Clear state after scrolling
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

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
    setIsOpen(false);
  };

  return (
    
    <header className="bg-whitish shadow-md p-1">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/img/s.png" alt="logo" className="w-25 h-20 object-contain" />
        </div>

        {/* Toggle button for mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // Close (X) icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger (☰) icon
            <svg xmlns="http://www.w3.org/2000/svg"className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-black-700 from-neutral-600">
          <Link to = "/homepage" className="hover:text-blue-600">Home</Link>
          <a href = "#about" onClick={(e) => handleScrollTo(e, "about")} className="hover:text-blue-600">About</a>
          <Link to = "/servicepage" className="hover:text-blue-600">Services</Link>
          <a href = "#contact" onClick={(e) => handleScrollTo(e, "contact")} className="hover:text-blue-600">Contact</a>
         

          <Link to = "/" className="hover:text-blue-600">Doctors</Link>
        </nav>
      </div>

      {/* Mobile Nav (dropdown) */}
      {isOpen && (
        <nav className="md:hidden flex flex-col items-center space-y-3 py-3 bg-[#d9e3e5] text-gray-700 font-medium border-t">
          <Link to = "/homepage" className="hover:text-blue-600">Home</Link>
          <a href = "#about" onClick={(e) => handleScrollTo(e, "about")} className="hover:text-blue-600">About</a>
          <Link to = "/servicepage" className="hover:text-blue-600">Services</Link>
          <a href = "#contact" onClick={(e) => handleScrollTo(e, "contact")} className="hover:text-blue-600">Contact</a>
          <Link to = "/" className="hover:text-blue-600">Doctors</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
