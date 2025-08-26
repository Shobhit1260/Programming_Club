import React, { useEffect, useState } from 'react';

function EventCard({ Title, Description, Year, Month, date, Time, time }) {
  const [desc, setDesc] = useState("Upcoming");

  useEffect(() => {
    const eventData = new Date(time);
    const currentDate = new Date();
    const diff = +eventData - +currentDate;
    setDesc(diff > 0 ? "Upcoming" : "Passed");
  }, [time]);

  const openForm = () => {
    window.open("https://forms.gle/3d1b7c5f8Z2g4j6aA", "_blank");
  };

  return (
    <div className="w-11/12 max-w-3xl mx-auto mt-8 p-6 sm:p-8 
      bg-white dark:bg-gray-900 rounded-xl shadow-lg 
      flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 
      transition-all duration-300">
      
      {/* Event Info */}
      <div className="flex-1 flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{Title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{Description}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span>{`${date}-${Month}-${Year}`}</span> • <span>{Time}</span>
        </div>
        <button 
          onClick={openForm} 
          className="self-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition"
        >
          Register Now
        </button>
      </div>

      {/* Status Badge */}
      <div>
        {desc === "Upcoming" ? (
          <span className="bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base">
            Upcoming
          </span>
        ) : (
          <span className="bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base">
            Passed
          </span>
        )}
      </div>
    </div>
  );
}

export default EventCard;
