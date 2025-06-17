import React from 'react'
import {useDispatch} from 'react-redux'
import { setEditFalse,setEditTrue} from '../../Redux/EventSlice';

function TeamMemberCard() {
    const dispatch = useDispatch();
  return (
    <div className='w-1/2 shadow-lg rounded-lg p-4 flex flex-col gap-2 justify-center items-center'>
            <img src="" alt="" className='object-cover overflow-hidden border-2 w-40 h-40 border-blue-300 rounded-full'/>
             <h1 className='text-bold text-xl'>Gaurpad Shukla</h1>
             <h1 className='text-lg text-gray-600'>Secretary</h1>
            <div className='flex justify-start items-center gap-4 text-white'>
                     <button className='bg-cyan-300 rounded-lg p-2' onClick={()=>dispatch(setEditTrue())}>Edit</button>
                     <button className='bg-red-600 rounded-lg p-2'>Delete</button>
           </div>
    </div>
  )
}

export default TeamMemberCard
