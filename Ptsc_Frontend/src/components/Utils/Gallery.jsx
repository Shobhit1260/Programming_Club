import React, { useState } from "react";
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
    },
  ];

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full z-0 dark:bg-gray-800 mx-auto pt-20 pb-20 px-4 flex flex-col justify-center items-center gap-8">
     
      <div className="font-bold text-center font-serif text-3xl sm:text-4xl py-4 dark:text-white">
        Event Gallery
      </div>

     
      <div className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/9] rounded-2xl shadow-xl overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out scale-105 hover:scale-110"
        />

       
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-900/60 backdrop-blur-sm text-white 
          p-3 sm:p-4 rounded-full text-lg sm:text-2xl shadow-md hover:bg-gray-900/80 transition"
        >
          <FaArrowLeftLong />
        </button>

       
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-900/60 backdrop-blur-sm text-white 
          p-3 sm:p-4 rounded-full text-lg sm:text-2xl shadow-md hover:bg-gray-900/80 transition"
        >
          <FaArrowRight />
        </button>

        
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                currentIndex === index
                  ? "bg-white scale-110 shadow-md"
                  : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
