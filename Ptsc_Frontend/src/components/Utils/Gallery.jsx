import React from 'react'
import { useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

function Gallery() {
    const [currentIndex,setCurrentIndex]=useState(0);
    const images=[
    {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQGTucCRWA0BWg/feedshare-shrink_800/B4DZZH2Ar5H4Ak-/0/1744962065300?e=1752710400&v=beta&t=oND_r10txJM7Pb_UptHHXE83k3-RyDlANagi_B6RJtY",
        alt: "Image 1",
        
    },
    {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQG3bfmoBmmvtg/feedshare-shrink_800/B4DZTU2tmtH0Ak-/0/1738737902272?e=1752710400&v=beta&t=pnMJLrFbZwCN7_GQHE_NGL8CjA-SXYWbq7I-L1fhdkE",
        alt: "Image 2",
        
    },
    {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQE0Y5vNb4kyLw/feedshare-shrink_800/B4DZS2NnaKH0Ag-/0/1738223811505?e=1752710400&v=beta&t=Jut-gLP-QKwQTIEVFaH8qn7we_Y5xqeTgJnAPlliZSY",
        alt: "Image 3",
       
    } 
]

const nextImage=()=>{
    setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
}
const prevImage=()=>{
    setCurrentIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
}
  return (
    <div className=' w-full dark:bg-gray-800 mx-auto pt-32 pb-32 p-4  shadow-lg flex flex-col justify-center items-center gap-4'>
  {/* Title */}
  <div className='font-bold text-center font-serif text-3xl sm:text-4xl py-8 dark:text-white'>
    Event Gallery
  </div>

  {/* Image Display */}
  <div className='w-full aspect-[5/6] sm:aspect-video rounded-lg shadow-lg overflow-hidden '>
    <img
      src={images[currentIndex].url}
      alt={images[currentIndex].alt}
      className="w-full h-full object-fit rounded-lg"
    />
  </div>

  {/* Buttons */}
  <div className='absolute inset-0 w-full flex justify-between items-center gap-4 mt-6 px-4 sm:px-8'>
    <button
      onClick={prevImage}
      className='outline-none text-2xl sm:text-4xl font-bold text-white bg-gray-700 rounded-2xl p-3 sm:p-4'
    >
      <FaArrowLeftLong />
    </button>
    <button
      onClick={nextImage}
      className='outline-none text-2xl sm:text-4xl font-bold text-white bg-gray-700 rounded-2xl p-3 sm:p-4'
    >
      <FaArrowRight />
    </button>
  </div>
</div>

  )
}

 export default Gallery



