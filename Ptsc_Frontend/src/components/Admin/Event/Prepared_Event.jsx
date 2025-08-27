import React from "react";
import { useDispatch } from "react-redux";
import { setEditingEventId } from "../../Redux/EventSlice";
import { toast } from "react-toastify";

const BASE = "https://programming-club-backend.onrender.com";

function Prepared_Event({ event }) {
  const dispatch = useDispatch();

  const onDelete = async (id) => {
    try {
      const res = await fetch(`${BASE}/deleteEvent/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Event successfully deleted.");
      } else {
        toast.warning("Failed to delete event.");
      }
    } catch (error) {
      console.log("Server Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 shadow-lg rounded-xl p-4 bg-white dark:bg-gray-900 transition">
      {/* Event Details */}
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          {event.title}
        </h1>
        <h2 className="text-gray-600 dark:text-gray-300">{event.description}</h2>
        <h3 className="text-gray-600 dark:text-gray-400">
          {event.date && event.date.substring(0, 10)}
        </h3>
        <h4 className="text-gray-600 dark:text-gray-400">{event.time}</h4>
        <h4 className="text-gray-600 dark:text-gray-400">{event.status}</h4>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-start items-center gap-3 mt-3">
        <button
          onClick={() => dispatch(setEditingEventId(event._id))}
          className="w-full sm:w-auto px-4 py-2 bg-cyan-500 hover:bg-cyan-600 
                     text-white font-semibold rounded-lg shadow-md transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event._id)}
          className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 
                     text-white font-semibold rounded-lg shadow-md transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Prepared_Event;
