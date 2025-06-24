import React, { useEffect, useState } from 'react'
import EventCard from '../Utils/EventCard';

function Events() {
    const [events,setEvents]=useState([]);
   const fetchData=async()=>{
      const res=await fetch("http://localhost:4000/v1/fetchEvents",{
        method:"GET",
      });
      const data= await res.json();
      setEvents(data.events||[]);
    }
    useEffect(()=>{
      fetchData();
    }
    ,[])
  return (
    <div className='w-full h-min bg-gradient-to-b from-blue-200 to-white dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 p-24'>
        <div className='flex flex-col gap-8 mb-16'>
              <h1 className=' dark:text-white text-center text-4xl font-bold font-serif'>Events</h1>
              <h2 className='text-center text-xl text-gray-500 font-serif'>Join Our Upcoming Events and workshops</h2>
        </div>
        <div>
          {
          events.map(event=>{
            if (!event) return null;
            return (
              <EventCard 
                key={event._id} 
                Title={event.title} 
                Description={event.description} 
                date={new Date(event.date).getDate()} 
                Year={new Date(event.date).getFullYear()} 
                Month={new Date(event.date).toLocaleString('default', { month: 'long' })} 
                Time={`Time: ${event.time}`}
                time={event.date}
               
              />
            );
          })
        }
            
        </div>
    </div>
  )
}

export default Events
