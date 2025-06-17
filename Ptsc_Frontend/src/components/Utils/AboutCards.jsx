import React from 'react';

function AboutCards({ title, description }) {
  return (
    <div className='w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl px-6 py-8 md:px-10 md:py-10 mt-8 flex flex-col gap-4'>
      <h1 className='font-bold text-black dark:text-white text-xl md:text-2xl'>{title}</h1>
      <p className='text-gray-700 text-sm md:text-base leading-relaxed dark:text-gray-400'>{description}</p>
    </div>
  );
}

export default AboutCards;
