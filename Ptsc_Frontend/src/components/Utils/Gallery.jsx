import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeftLong } from "react-icons/fa6";

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: "https://img.freepik.com/free-photo/colleagues-working-project-discussing-details_114579-2817.jpg",
      alt: "Image 1",
    },
    {
      url: "https://img.freepik.com/free-vector/hackathon-technology-infographic-with-flat-icons_88138-961.jpg",
      alt: "Image 2",
    },
    {
      url: "https://img.freepik.com/free-photo/diverse-multiethnic-businesspeople-discussing-management-strategy-online-videocall_482257-7235.jpg",
      alt: "Image 3",
    },
    {
      url: "https://img.freepik.com/free-photo/meeting-developers_1098-19850.jpg",
      alt: "Image 4",
    }
  ];

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full z-0 dark:bg-gray-800 mx-auto pt-32 pb-32 p-4 flex flex-col justify-center items-center gap-4">
      
      <div className="font-bold text-center font-serif text-3xl sm:text-4xl py-8 dark:text-white">
        Event Gallery
      </div>

      
      <div className="relative w-full max-w-4xl aspect-[5/6] sm:aspect-video rounded-lg shadow-lg overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover rounded-lg"
        />

        
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-700 text-white p-3 sm:p-4 rounded-full text-xl sm:text-3xl shadow-md hover:bg-gray-600 transition"
        >
          <FaArrowLeftLong />
        </button>

        
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-700 text-white p-3 sm:p-4 rounded-full text-xl sm:text-3xl shadow-md hover:bg-gray-600 transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Gallery;
