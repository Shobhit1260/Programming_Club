// @ts-nocheck
import React from 'react'
import { useEffect } from 'react';
import {useState} from 'react'
import { toast } from 'react-toastify';

function NewEvent() {
  const [events,setEvents]=useState([]);
  const [formData,setFormData]=useState({
    title:"",
    description:"",
    date:"",
    time:"",
    status:"Upcoming"
  })

  const handleFormData=(e)=>{
    setFormData({
      ...formData,
        [e.target.name]:e.target.value,
     })
  }
  const AddEvent=async (e)=>{
      e.preventDefault();
      const res=await fetch("http://localhost:4000/v1/createEvent",{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(formData)
      });
      if(res.ok){
        toast.success("Event added successfully!");
      }
      const newEvent=await res.json();
      setEvents([newEvent.event,...events]);
      setFormData({
        title:"",
        description:"",
        date:"",
        time:"",
        status:"",
      })
  }
 
  return (
    <div >
        <h1 className='text-black font-bold px-4 text-2xl'>Manage Events</h1>
        <form 
        onSubmit={AddEvent}
        action="" 
        className='flex flex-col w-full p-4 gap-2'>
            <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleFormData} 
            placeholder="Title" 
            className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none' />

            <input 
            type="text" 
            name="description"
            value={formData.description}
            onChange={handleFormData}
            placeholder="Description" 
            className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'/>
          
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleFormData}  
            placeholder="Date" 
            className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'/>

           <input 
            type="time" 
            name="time"
            value={formData.time}
            onChange={handleFormData} 
            placeholder="Time" 
            className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none' />  

          <select 
           name="status"
           value={formData.status}
           onChange={handleFormData} 
           className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'>
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past</option>
                <option value="Live">Live</option>
            </select>
            <input 
            type="submit" 
            value="Add Event"  
            className='bg-cyan-300 text-white p-2 w-min rounded-lg'/>
        </form>
    </div>
  )
}
export default NewEvent;




