import React from 'react'
import {useDispatch} from 'react-redux'
import { setEditingEventId,clearEditingEventId} from '../../Redux/EventSlice';
import { toast } from 'react-toastify';

function Prepared_Event({event,}) {
  const dispatch = useDispatch();
  const onDelete=async(id)=>{
    try{
      const res=await fetch(`http://localhost:4000/v1/deleteEvent/${id}`,{
        method:"DELETE",
        credentials:"include"
      })
      if(res.ok){
         toast.success("data successfully deleted.")
      }
      else{
        toast.warning("failed to delete.")
      }
    }
    catch(error){
      console.log("server Error:",error.message)
    }
  }
  return (
    <div className='flex flex-col gap-3 shadow-xl rounded-lg p-4'>
      <div className='flex flex-col justify-between gap-1'>
        <h1 className='text-black font-bold'>{event.title}</h1>
        <h2 className='text-gray-500 font-md'>{event.description}</h2>
        <h3 className='text-gray-500 font-md'>{event.date && event.date.substring(0,10)}</h3>
        <h4 className='text-gray-500 font-md'>{event.time}</h4>
        <h4 className='text-gray-500 font-md'>{event.status}</h4>
      </div>
       <div className='flex justify-start items-center gap-4 text-white'>
        <button className='bg-cyan-300 rounded-lg p-2' onClick={()=>dispatch(setEditingEventId(event._id))}>Edit</button>
        <button className='bg-red-700 rounded-lg p-2' onClick={()=>onDelete(event._id)}>Delete</button>
      </div>
    </div>
  )
}

export default Prepared_Event
