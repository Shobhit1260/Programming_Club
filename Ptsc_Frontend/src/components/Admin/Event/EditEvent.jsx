import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearEditingEventId } from '../../Redux/EventSlice';
import { toast } from 'react-toastify';

function EditEvent({ event }) {
  const [formData, setFormData] = useState(event || {});
  const eventId= event._id ;
  const dispatch = useDispatch();
  
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async (e,eventId) => {
       e.preventDefault();
       if (!formData.title || !formData.date) {
        toast.warning('Please fill all required fields');
         return;
       }

    try {
      const res = await fetch(`http://localhost:4000/v1/editEvent/${eventId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!res.ok)
        toast.error('Failed to update event');
      else
        toast.success('Event updated successfully');
      const updatedEvent = await res.json();
      setFormData(updatedEvent.event);
      dispatch(clearEditingEventId());
    } 
    catch (error) {
      console.log('Error while updating event:', error.message);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(clearEditingEventId());
  };
 
  return (
    <div>
      <form onSubmit={(e)=>handleSave(e,eventId)} className="flex flex-col gap-2">
        <input
          type="text"
          className="outline-none border-2 border-gray-500 rounded-lg p-2"
          name="title"
          value={formData.title || ''}
          onChange={handleFormData}
          placeholder="Title"
        />
        <input
          type="text"
          className="outline-none border-2 border-gray-500 rounded-lg p-2"
          name="description"
          value={formData.description || ''}
          onChange={handleFormData}
          placeholder="Description"
        />
        <input
          type="date"
          className="outline-none border-2 border-gray-500 rounded-lg p-2"
          name="date"
          value={formData.date ? formData.date.substring(0, 10) : ''}
          onChange={handleFormData}
        />
        <input
          type="text"
          className="outline-none border-2 border-gray-500 rounded-lg p-2"
          name="status"
          value={formData.status || ''}
          onChange={handleFormData}
          placeholder="Status"
        />

        <div className="flex justify-start items-center gap-4">
          <button type="submit" className="bg-blue-400 p-2 rounded-lg text-white" >
            Save
          </button>
          <button onClick={handleCancel} className="bg-red-600 p-2 rounded-lg text-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
