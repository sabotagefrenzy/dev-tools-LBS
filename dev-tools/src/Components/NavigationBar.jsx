import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/20 backdrop-blur-md shadow-md"
            : "bg-[#10002B]"
        }`}
      >
      <div className=" flex justify-between items-center px-10 py-8 border-b border-transparent relative">
        <h1 className="text-3xl font-bold text-[#C3B1FF]">
          <Link to="/home">Last Bench Tools</Link>
        </h1>
        <nav className="flex items-center space-x-6 text-xl font-medium relative">
          <Link
            to="/home"
            className={`hover:text-[#C3B1FF] transition ${
              location.pathname === "/home" ? "text-[#C3B1FF]" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:text-[#C3B1FF] transition ${
              location.pathname === "/about" ? "text-[#C3B1FF]" : "text-white"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`hover:text-[#C3B1FF] transition ${
              location.pathname === "/contact" ? "text-[#C3B1FF]" : "text-white"
            }`}
          >
            Contact
          </Link>

          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              className="text-white cursor-pointer text-4xl"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 text-black">
                <Link
                  to="/edit-group"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                >
                  Edit Groups
                </Link>
                <button
                  onClick={() => {
                    
                    console.log("Sign out clicked");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
