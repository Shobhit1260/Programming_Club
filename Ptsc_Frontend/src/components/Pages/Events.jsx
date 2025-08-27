import React, { useEffect, useState } from 'react';
import EventCard from '../Utils/EventCard';

const BASE = "https://programming-club-zq7t.onrender.com";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE}/fetchEvents`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-white 
      dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 px-4 sm:px-8 md:px-16 lg:px-24 lg:py-24">
      
      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-serif dark:text-white">
          Events
        </h1>
        <h2 className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-serif">
          Join our upcoming events and workshops
        </h2>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
        </div>
      )}

      {/* Events Grid */}
      <div className="flex flex-col gap-8">
        {events.length > 0 ? (
          events.map((event) => {
            if (!event) return null;
            const eventDate = new Date(event.date);
            return (
              <EventCard
                key={event._id}
                Title={event.title}
                Description={event.description}
                date={eventDate.getDate()}
                Year={eventDate.getFullYear()}
                Month={eventDate.toLocaleString("default", { month: "long" })}
                Time={`Time: ${event.time}`}
                time={event.date}
              />
            );
          })
        ) : (
          !loading && (
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
              No events available at the moment. Stay tuned!
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Events;
