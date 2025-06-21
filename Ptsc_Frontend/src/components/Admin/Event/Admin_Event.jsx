import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {toggleEdit,setEditTrue,setEditFalse} from '../../Redux/EventSlice';
import EditEvent from './EditEvent';
import Prepared_Event from './Prepared_Event';
import NewEvent from './newEvent';

function Admin_Event() {
  
  const [events,setEvents]=useState([]);
  const isEdit=useSelector((state)=>state.event.isEdit);
  const dispatch= useDispatch();
   const fetchData=async()=>{
    const res=await fetch("http://localhost:4000/v1/fetchEvents",{
      method:"GET",
    });
    const data= await res.json();
    setEvents(data.events);
  }
  useEffect(()=>{
    fetchData();
  }
  ,[])
  console.log("events:",events);
  return (
    <div className='rounded-lg bg-white shadow-lg p-4 m-4 w-full min-h-screen'>
       <h1 className='text-2xl text-black font-bold'>Manage Event</h1>
       <div className='flex flex-col gap-8 '>
        <div className='w-full px-4 py-8 rounded-lg flex flex-col gap-8 shadow-lg h-min border-1 border-gray-500'>
        {
          events.map((event) => {
            if (!event) return null;
            return isEdit ? <EditEvent key={event._id} /> : <Prepared_Event key={event._id} title={event.title} description={event.description} date={event.date} status={event.status}/>;
          })
        }
        
        </div>
        <NewEvent eventss={events}/>
       </div>
    </div>
  )
}

export default Admin_Event
