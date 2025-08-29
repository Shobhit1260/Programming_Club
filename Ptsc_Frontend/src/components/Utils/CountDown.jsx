import React, { useState, useEffect } from 'react';

function CountDown({ years = "2025", month = "09", date = "29" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const nextEventDate = new Date(`${years}-${month}-${date}T00:00:00`);
    
    const calculateTimeLeft = () => {
      const diff = +nextEventDate - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [years, month, date]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
      {timeBlocks.map((block, idx) => (
        <div 
          key={idx}
          className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl px-4 sm:px-6 py-3 sm:py-5 w-24 sm:w-28 md:w-32
                     transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            {block.value}
          </span>
          <span className="text-xs sm:text-sm md:text-base uppercase tracking-wide text-gray-500 dark:text-gray-300 mt-1">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CountDown;
