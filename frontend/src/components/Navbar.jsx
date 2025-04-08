import React, { useState, useRef, useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, user } = useUserStore();

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAnalyticsClick = () => {
    navigate("/analytics");
  };
  const handleLogout=()=>{
    logout(navigate);
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo or App Name */}
        <Link to={"/"}>
         <div className="text-xl font-bold text-teal-700">MindEase</div>
        </Link>
    

        {/* Optional Nav Links */}
        <div className="hidden md:flex space-x-6 text-gray-600 font-medium">
          {/* Add nav items here if needed */}
        </div>

        {/* Profile Circle */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-10 h-10 rounded-full overflow-hidden bg-teal-400 text-black flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold">
                {user?.displayName?.[0]?.toUpperCase() ||
                 user?.email?.[0]?.toUpperCase() ||
                 "U"}
              </span>
            )}
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 text-black">
              <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                My Profile
              </p>
              <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleAnalyticsClick}
              >
                Analytics
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
