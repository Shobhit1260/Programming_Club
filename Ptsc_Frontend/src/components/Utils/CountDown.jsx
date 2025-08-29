import React, { useState, useEffect } from 'react';

function CountDown({ years = "2025", month = "09", date = "29" }) {
  const [TimeLeft, SetTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const nextEventDate = new Date(`${years}-${month}-${date}T00:00:00`);
    const CalculateTimeLeft = () => {
      const diff = +nextEventDate - +new Date();
      if (diff > 0) {
        SetTimeLeft({
          days: Math.floor(diff / (1000 * 24 * 60 * 60)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        SetTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };
    const timer = setInterval(CalculateTimeLeft, 1000);
    CalculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center p-4">
      <div className="flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <div className="text-2xl sm:text-4xl font-bold">{TimeLeft.days}</div>
        <span className="text-sm sm:text-base">Days</span>
      </div>
      <div className="flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <div className="text-2xl sm:text-4xl font-bold">{TimeLeft.hours}</div>
        <span className="text-sm sm:text-base">Hours</span>
      </div>
      <div className="flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <div className="text-2xl sm:text-4xl font-bold">{TimeLeft.minutes}</div>
        <span className="text-sm sm:text-base">Minutes</span>
      </div>
      <div className="flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <div className="text-2xl sm:text-4xl font-bold">{TimeLeft.seconds}</div>
        <span className="text-sm sm:text-base">Seconds</span>
      </div>
    </div>
  );
}

export default CountDown;
