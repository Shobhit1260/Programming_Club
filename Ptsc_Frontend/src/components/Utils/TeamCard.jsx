import React from 'react'

function TeamCard({ Name, Position, Image }) {
  return (
    <div className="dark:bg-gray-900 bg-white shadow-lg rounded-2xl bg-gradient-to-br from-white to-gray-300 dark:from-gray-800 dark:to-gray-900
  p-6 sm:p-8 md:p-10 lg:p-12  
  flex flex-col items-center justify-center gap-4 
   w-[500px] transition-all duration-300">
      
      <div>
        <img
          src={Image}
          alt={Name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full 
          shadow-lg object-cover"
        />
      </div>

      <h1 className="dark:text-white text-black font-bold text-lg sm:text-xl md:text-2xl text-center">
        {Name}
      </h1>

      <h2 className="dark:text-gray-300 text-gray-500 text-sm sm:text-base md:text-lg text-center">
        {Position}
      </h2>
    </div>
  )
}

export default TeamCard
