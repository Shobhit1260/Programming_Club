import React from 'react'
import {useDispatch} from 'react-redux'
import { setEditTrue,setEditFalse } from '../../Redux/EventSlice';


function EditEvent() {
  const dispatch=useDispatch();
  return (
    <div className='flex flex-col  gap-2'>
      <input type="text" className='outline-none border-2 border-gray-500 rounded-lg p-2'/>
      <input type="text" className='outline-none  border-2 border-gray-500 rounded-lg p-2'/>
      <input type="text" className='outline-none  border-2 border-gray-500 rounded-lg p-2'/>
      <input type="text" className='outline-none  border-2 border-gray-500 rounded-lg p-2'/>
      <div className='flex justify-start items-center gap-4'>
        <button onClick={()=>dispatch(setEditFalse())} className='bg-blue-400 p-2 rounded-lg'>Save</button>
        <button className='bg-red-600 p-2 rounded-lg'>Cancel</button>
      </div>
    </div>
  )
}

export default EditEvent
