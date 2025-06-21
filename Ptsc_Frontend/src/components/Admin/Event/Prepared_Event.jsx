import React from 'react'
import {useDispatch} from 'react-redux'
import { setEditFalse,setEditTrue} from '../../Redux/EventSlice';

function Prepared_Event({title,description,date,status}) {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col gap-3 shadow-xl rounded-lg p-4'>
      <div className='flex flex-col justify-between gap-1'>
        <h1 className='text-black font-bold'>{title}</h1>
        <h2 className='text-gray-500 font-md'>{description}</h2>
        <h3 className='text-gray-500 font-md'>{date}</h3>
        <h4 className='text-gray-500 font-md'>{status}</h4>
      </div>
       <div className='flex justify-start items-center gap-4 text-white'>
        <button className='bg-cyan-300 rounded-lg p-2' onClick={()=>dispatch(setEditTrue())}>Edit</button>
        <button className='bg-red-700 rounded-lg p-2'>Delete</button>
      </div>
    </div>
  )
}

export default Prepared_Event
