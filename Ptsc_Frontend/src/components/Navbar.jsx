import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineLightMode } from "react-icons/md";

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className='fixed top-0 z-50 w-full dark:border-b-2 dark:border-gray-600 bg-white/80 dark:bg-gray-800 shadow-lg font-sans'>
      <div className='h-[80px] flex justify-between items-center px-6 py-4'>
        <div className='flex gap-2 items-center'>
          <img
            src="https://raw.githubusercontent.com/coder-writes/knit-code-connect-hub/refs/heads/main/public/favicon.ico"
            className='h-10 w-10'
            alt="ptsc"
          />
          <span className='text-cyan-600 dark:text-cyan-400 font-bold text-xl'>PTSC</span>
        </div>

        
        <div className='md:hidden text-2xl text-gray-700 dark:text-white' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Desktop Links */}
        <div className='hidden md:flex gap-10 text-gray-700 dark:text-white text-sm items-center'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/team">Teams</Link>
          <Link to="/event">Events</Link>
          <Link to="/resource">Resources</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/contactUs">Contact</Link>
          <Link to="/beMember">Be Member</Link>
          <Link to="/admin">Admin</Link>
          <button className='text-xl self-start' onClick={toggleTheme}>{
            (isDark ?<MdDarkMode />:<MdOutlineLightMode />)}
          </button>    
          </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className='md:hidden flex flex-col gap-4 px-6 pb-4 text-gray-700 dark:text-white text-sm'>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/team" onClick={() => setIsOpen(false)}>Teams</Link>
          <Link to="/event" onClick={() => setIsOpen(false)}>Events</Link>
          <Link to="/resource" onClick={() => setIsOpen(false)}>Resources</Link>
          <Link to="/leaderboard" onClick={() => setIsOpen(false)}>Leaderboard</Link>
          <Link to="/contactUs" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/beMember" onClick={() => setIsOpen(false)}>Be Member</Link>
          <Link to="/admin">Admin</Link>
          <button className='text-xl self-start' onClick={toggleTheme}>{
            (isDark ?<MdDarkMode />:<MdOutlineLightMode/>)}
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
