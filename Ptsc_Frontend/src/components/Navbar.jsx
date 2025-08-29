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
    <div className="fixed z-40 w-full sm:w-full dark:border-b-2 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg font-sans">
      <div className="h-[80px] flex justify-between items-center px-6 py-4">
       
        <div className="flex gap-2 items-center">
          <img
            src="https://raw.githubusercontent.com/coder-writes/knit-code-connect-hub/refs/heads/main/public/favicon.ico"
            className="h-10 w-10"
            alt="ptsc"
          />
          <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xl">
            PTSC
          </span>
        </div>

       
        <div
          className="md:hidden text-2xl text-gray-700 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 dark:text-white text-sm items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/team">Teams</Link>
          <Link to="/event">Events</Link>
          <Link to="/resource">Resources</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/contactUs">Contact</Link>

          
          {isMemberOrAdmin ? (
            <>
              <Link to="/admin">Admin</Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Be Member
            </Link>
          )}

          {/* Dark mode toggle */}
          <button className="text-xl self-start" onClick={toggleTheme}>
            {isDark ? <MdDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-gray-700 dark:text-white text-sm">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/team" onClick={() => setIsOpen(false)}>Teams</Link>
          <Link to="/event" onClick={() => setIsOpen(false)}>Events</Link>
          <Link to="/resource" onClick={() => setIsOpen(false)}>Resources</Link>
          <Link to="/leaderboard" onClick={() => setIsOpen(false)}>Leaderboard</Link>
          <Link to="/contactUs" onClick={() => setIsOpen(false)}>Contact</Link>

          {isMemberOrAdmin ? (
            <>
              <Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Be Member
            </Link>
          )}

          <button className="text-xl self-start" onClick={toggleTheme}>
            {isDark ? <MdDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
