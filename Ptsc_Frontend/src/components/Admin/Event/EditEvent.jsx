import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearEditingEventId } from '../../Redux/EventSlice';
import { toast } from 'react-toastify';
import  BASE  from '../../../api/config';

function EditEvent({ event,fetchData }) {

  const [formData, setFormData] = useState(event || {});
  const eventId = event._id;
  const dispatch = useDispatch();

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e, eventId) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE}/v1/editEvent/${eventId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        toast.error('Failed to update event');
      } else {
        toast.success('Event updated successfully');
        const updatedEvent = await res.json();
        setFormData(updatedEvent.event);
        fetchData();
        dispatch(clearEditingEventId());
      }
    } catch (error) {
      console.log('Error while updating event:', error.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(clearEditingEventId());
  };

  return (
   <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mx-auto">
  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
    Edit Event
  </h2>
  <form
    onSubmit={(e) => handleSave(e, eventId)}
    className="flex flex-col gap-5"
  >
    <input
      type="text"
      className="w-full border border-gray-300 dark:border-gray-500 
                 bg-gray-50 dark:bg-gray-700 
                 text-gray-900 dark:text-gray-200 
                 placeholder-gray-400 dark:placeholder-gray-400 
                 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
      name="title"
      value={formData.title || ''}
      onChange={handleFormData}
      placeholder="Title"
    />

    <textarea
      className="w-full border border-gray-300 dark:border-gray-500 
                 bg-gray-50 dark:bg-gray-700 
                 text-gray-900 dark:text-gray-200 
                 placeholder-gray-400 dark:placeholder-gray-400 
                 rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
      name="description"
      value={formData.description || ''}
      onChange={handleFormData}
      placeholder="Description"
    />

    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="date"
        className="flex-1 border border-gray-300 dark:border-gray-500 
                   bg-gray-50 dark:bg-gray-700 
                   text-gray-900 dark:text-gray-200 
                   rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
        name="date"
        value={formData.date ? formData.date.substring(0, 10) : ''}
        onChange={handleFormData}
      />
      <input
        type="time"
        className="flex-1 border border-gray-300 dark:border-gray-500 
                   bg-gray-50 dark:bg-gray-700 
                   text-gray-900 dark:text-gray-200 
                   rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
        name="time"
        value={formData.time || ''}
        onChange={handleFormData}
      />
    </div>

    <input
      type="text"
      className="w-full border border-gray-300 dark:border-gray-500 
                 bg-gray-50 dark:bg-gray-700 
                 text-gray-900 dark:text-gray-200 
                 placeholder-gray-400 dark:placeholder-gray-400 
                 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
      name="status"
      value={formData.status || ''}
      onChange={handleFormData}
      placeholder="Status (e.g., Upcoming, Completed)"
    />

    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6">
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        Save
      </button>
      <button
        onClick={handleCancel}
        className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  );
}

export default EditEvent;
