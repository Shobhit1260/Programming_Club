import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role"); 
    navigate("/login"); 
  };

  const isMemberOrAdmin = role === "admin" || role === "member";
  
  return (
    <div className="fixed z-40 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-200/20 dark:shadow-gray-900/40 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="h-[80px] flex justify-between items-center px-6 py-4">
          {/* Logo Section */}
          <div className="flex gap-3 items-center group">
            <div className="relative">
              <img
                src="https://raw.githubusercontent.com/coder-writes/knit-code-connect-hub/refs/heads/main/public/favicon.ico"
                className="h-10 w-10 rounded-xl shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300 group-hover:scale-110"
                alt="ptsc"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 font-bold text-xl tracking-tight">
              PTSC
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-700 dark:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="text-2xl transition-transform duration-300">
              {isOpen ? <FiX className="rotate-90" /> : <FiMenu />}
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Navigation Links */}
            <div className="flex gap-1 text-gray-700 dark:text-gray-200 text-sm font-medium">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/team", label: "Teams" },
                { to: "/event", label: "Events" },
                { to: "/resource", label: "Resources" },
                { to: "/leaderboard", label: "Leaderboard" },
                { to: "/contactUs", label: "Contact" }
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 rounded-xl transition-all duration-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 group"
                >
                  {link.label}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 ml-4">
              {isMemberOrAdmin ? (
                <>
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/30"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30"
                >
                  Be Member
                </Link>
              )}

              {/* Theme Toggle */}
              <button 
                className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-110 hover:text-yellow-500 dark:hover:text-yellow-400" 
                onClick={toggleTheme}
              >
                <div className="text-xl transition-transform duration-300 hover:rotate-180">
                  {isDark ? <MdDarkMode /> : <MdOutlineLightMode />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="absolute top-full left-0 right-0 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <div className="flex flex-col gap-2 px-6 py-6">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/team", label: "Teams" },
                { to: "/event", label: "Events" },
                { to: "/resource", label: "Resources" },
                { to: "/leaderboard", label: "Leaderboard" },
                { to: "/contactUs", label: "Contact" }
              ].map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                {isMemberOrAdmin ? (
                  <>
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium text-center hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
                    >
                      Admin
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-red-500/30"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-center hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/30"
                  >
                    Be Member
                  </Link>
                )}

                {/* Mobile Theme Toggle */}
                <button 
                  className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all duration-300 flex items-center justify-center gap-2" 
                  onClick={toggleTheme}
                >
                  <div className="text-xl">
                    {isDark ? <MdDarkMode /> : <MdOutlineLightMode />}
                  </div>
                  <span className="font-medium">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
