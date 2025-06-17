import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {toggleEdit,setEditTrue,setEditFalse} from '../../Redux/EventSlice';
import EditEvent from './EditEvent';
import Prepared_Event from './Prepared_Event';
import NewEvent from './newEvent';

function Admin_Event() {
  // @ts-ignore
  const isEdit=useSelector((state)=>state.event.isEdit);
  const dispatch= useDispatch();
  return (
    <div className='rounded-lg bg-white shadow-lg p-4 m-4 w-full min-h-screen'>
       <h1 className='text-2xl text-black font-bold'>Manage Event</h1>
       <div className='flex flex-col gap-8 '>
        <div className='w-full px-4 py-8 rounded-lg flex flex-col gap-3 shadow-lg h-min border-1 border-gray-500'>
        {isEdit ? <EditEvent /> : <Prepared_Event />}
        </div>
        <NewEvent/>
       </div>
    </div>
  )
}

export default Admin_Event
