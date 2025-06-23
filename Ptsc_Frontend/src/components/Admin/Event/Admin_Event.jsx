// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {setEditingEventId,clearEditingEventId} from '../../Redux/EventSlice';
import EditEvent from './EditEvent';
import Prepared_Event from './Prepared_Event';
import NewEvent from './newEvent';

function Admin_Event() {
  const [events,setEvents]=useState([]);
  const [eventsCount,setEventsCount]=useState(0);
  const editingEventId=useSelector((state)=>state.event.editingEventId);
  const dispatch= useDispatch();
   const fetchData=async()=>{
    const res=await fetch("http://localhost:4000/v1/fetchEvents",{
      method:"GET",
    });
    const data= await res.json();
    setEvents(data.events||[]);
    setEventsCount(data.count||0)
  }
  useEffect(()=>{
    fetchData();
  }
  ,[])
  return (
    <div className='rounded-lg bg-white shadow-lg p-4 m-4 w-full min-h-screen'>
       <h1 className='text-2xl text-black font-bold'>Manage Event</h1>
       <div className='flex flex-col gap-8 '>
        <div className='w-full px-4 py-8 rounded-lg flex flex-col gap-8 shadow-lg h-min border-1 border-gray-500'>
        {
          events.map((event) => {
            if (!event) return null;
            const isEdit=(editingEventId===event._id);
            return isEdit ? <EditEvent key={event._id} event={event}/> : <Prepared_Event key={event._id} event={event}/>;
          })
        }
        {events.length === 0 && <span className='text-gray-500'>No events available.</span>}
        </div>
        <NewEvent/>
       </div>
    </div>
  )
}

export default Admin_Event
