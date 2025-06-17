import React from 'react'

function NewEvent() {
  return (
    <div >
        <h1 className='text-black font-bold px-4 text-2xl'>Manage Events</h1>
        <form action="" className='flex flex-col w-full p-4 gap-2'>
            <input type="text" placeholder="Title" className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none' />
            <input type="text" placeholder="Description" className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'/>
            <input type="text" placeholder="Date" className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'/>
            <select name="" id="" className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'>
                <option value="Past">Past</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Live">Live</option>
            </select>
            <input type="submit" value="Add Event"  className='bg-cyan-300 text-white p-2 w-min rounded-lg'/>
        </form>
    </div>
  )
}

export default NewEvent
