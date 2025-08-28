// @ts-nocheck
import React, { useState } from "react";
import { toast } from "react-toastify";
const BASE = "https://programming-club-46ae.onrender.com";
function NewEvent() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    status: "Upcoming",
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const AddEvent = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE}/createEvent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Event added successfully!");
    }

    const newEvent = await res.json();
    setEvents([newEvent.event, ...events]);

    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      status: "Upcoming",
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Manage Events
      </h1>

      <form
        onSubmit={AddEvent}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormData}
          placeholder="Title"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-800 
                     text-gray-900 dark:text-gray-200 
                     placeholder-gray-400 dark:placeholder-gray-500 
                     focus:ring-2 focus:ring-cyan-400 outline-none transition"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleFormData}
          placeholder="Description"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-800 
                     text-gray-900 dark:text-gray-200 
                     placeholder-gray-400 dark:placeholder-gray-500 
                     focus:ring-2 focus:ring-cyan-400 outline-none transition"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleFormData}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-800 
                     text-gray-900 dark:text-gray-200 
                     focus:ring-2 focus:ring-cyan-400 outline-none transition"
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleFormData}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-800 
                     text-gray-900 dark:text-gray-200 
                     focus:ring-2 focus:ring-cyan-400 outline-none transition"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleFormData}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-800 
                     text-gray-900 dark:text-gray-200 
                     focus:ring-2 focus:ring-cyan-400 outline-none transition"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
          <option value="Live">Live</option>
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-600 
                     text-white font-semibold rounded-lg shadow-md 
                     transition duration-200 text-center"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default NewEvent;
