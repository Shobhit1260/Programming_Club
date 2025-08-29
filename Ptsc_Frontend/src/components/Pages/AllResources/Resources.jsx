import React from 'react'
import { Link,Outlet } from 'react-router-dom';


function Resources() {
  return (
    <div className='w-full h-min bg-gradient-to-b from-blue-200 to-white dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 p-24 '>
       <div className='w-full h-min flex flex-col justify-center items-center gap-4 mb-16 '>
            <h1 className='text-4xl text-black dark:text-white font-serif font-bold'>Resources</h1>
            <h2 className='text-xl text-gray-500 font-serif'>Explore Our Resources and Workshops</h2>
       </div>  
       <div className='w-full h-min flex justify-center items-center mt-16 mb-16'>
         {/* <div className='w-1/2 flex items-center justify-center'>
         <Link to="resource" className='text-white font-serif font-bold bg-gray-600 text-xl p-4 rounded-lg'> Resource</Link>
         </div> */}
       </div>
      <Outlet />
    </div>
  )
}

export default Resources
