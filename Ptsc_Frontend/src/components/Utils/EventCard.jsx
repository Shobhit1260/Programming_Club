import React, { useEffect, useState } from "react";

function EventCard({ Title, Description, Year, Month, date, Time, time, googleFormLink }) {
  const [desc, setDesc] = useState("Upcoming");

  useEffect(() => {
    const eventDate = new Date(time);
    const currentDate = new Date();
    const diff = +eventDate - +currentDate;
    setDesc(diff > 0 ? "Upcoming" : "Passed");
  }, [time]);

  const openForm = () => {
    window.open(googleFormLink, "_blank");
  };

  return (
    <div className="w-11/12 max-w-3xl mx-auto mt-8 p-6 sm:p-8 
      bg-white dark:bg-gray-900 rounded-2xl shadow-lg 
      flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 
      transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      
     
      <div className="flex-1 flex flex-col gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {Title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {Description}
        </p>
        <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
          <span>{`${date}-${Month}-${Year}`}</span> • <span>{Time}</span>
        </div>
        <button
          onClick={openForm}
          disabled={desc === "Passed"}
          className={`self-start px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition
            ${
              desc === "Upcoming"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          {desc === "Upcoming" ? "Register Now" : "Registration Closed"}
        </button>
      </div>

      <div className="shrink-0">
        {desc === "Upcoming" ? (
          <span className="bg-green-500/90 text-white px-4 py-2 rounded-full shadow-md text-sm sm:text-base font-medium">
            Upcoming
          </span>
        ) : (
          <span className="bg-red-500/90 text-white px-4 py-2 rounded-full shadow-md text-sm sm:text-base font-medium">
            Passed
          </span>
        )}
      </div>
    </div>
  );
}

export default EventCard;
