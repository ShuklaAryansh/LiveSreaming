import React, { useState } from "react";
import { Menu, X, User, ChevronRight } from "lucide-react";
import logo1 from "../assets/Logo1.webp"; 
import logo from "../assets/wallpaper.jpg";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="bg-linear-to-r from-blue-50 via-white to-purple-50 font-serif shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3 transform transition-transform duration-300">
              <div className="relative">
                {/* Outer animated glow */}

                {/* Logo container */}
                <div className="w-12 h-12  flex items-center justify-center relative overflow-hidden">
                  {/* Your LOGO IMAGE here */}
                  <img
                    src={logo1} // <-- Replace with your actual logo path
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>

              {/* Brand name */}
              <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Live Streaming Services
              </span>
            </div>
          </div>

          {/* Center - Hexagon Digital Services */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-300 via-purple-300 to-pink-300 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-lg">
                {/* Your LOGO IMAGE here */}
                <img
                  src={logo} // <-- Replace with your actual logo path
                  alt="DigitalSphere Logo"
                  className="w-40 h-8  object-contain"
                />
                {/* Floating dots animation */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Button */}
          <div className="flex items-center space-x-4">
            <button
              className="relative group hidden md:block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute  -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500 animate-gradient-x"></div>
              <div className="relative cursor-pointer px-8 py-3 bg-white rounded-full flex items-center space-x-3 group-hover:space-x-4 transition-all duration-300">
                <User className="w-5 h-5 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                <span className="font-semibold text-gray-800  transition-all duration-300">
                  Sign In
                </span>
                <ChevronRight
                  className={`w-5 h-5 text-purple-600 transition-all duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </div>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-linear-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-purple-600" />
              ) : (
                <Menu className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden animate-slideDown">
            <div className="px-2 pt-2 pb-3 space-y-3 bg-white/95 backdrop-blur-sm rounded-2xl mt-4 shadow-xl border border-gray-100">
              <div className="flex flex-col items-center py-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">DS</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    Digital Services
                  </span>
                </div>
                <button className="w-full max-w-xs py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;