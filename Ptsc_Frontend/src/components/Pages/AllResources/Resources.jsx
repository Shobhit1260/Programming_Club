import React from 'react'
import { Outlet } from 'react-router-dom';

function Resources() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-blue-200 to-white 
      dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 px-4 sm:px-8 py-24'>
       
       
       <div className='w-full flex flex-col justify-center items-center gap-3 sm:gap-4 mb-10 sm:mb-16 text-center'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white font-serif font-bold'>
              Resources
            </h1>
            <h2 className='text-sm sm:text-lg text-gray-600 dark:text-gray-300 font-serif max-w-2xl'>
              Explore Our Resources and Workshops
            </h2>
       </div>  
    
      <Outlet />
    </div>
  )
}  

export default Resources
