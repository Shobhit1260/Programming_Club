import React from 'react'
import EventCard from '../Utils/EventCard';

function Events() {
  return (
    <div className='w-full h-min bg-gradient-to-b from-blue-200 to-white dark:bg-gray-800 dark:from-gray-800 dark:to-gray-800 p-24'>
        <div className='flex flex-col gap-8 mb-16'>
              <h1 className=' dark:text-white text-center text-4xl font-bold font-serif'>Events</h1>
              <h2 className='text-center text-xl text-gray-500 font-serif'>Join Our Upcoming Events and workshops</h2>
        </div>
        <div>
            <EventCard Title="Short_INT 2025" Description="This is a brief description of the event. It provides an overview of what attendees can expect." date="25" Year="2026" Month="10" Time="Time: 10:00 AM - 2:00 PM" />
            <EventCard Title="Short_INT 2025" Description="This is a brief description of the event. It provides an overview of what attendees can expect." date="25" Year="2026" Month="10" Time="Time: 10:00 AM - 2:00 PM" />
            <EventCard Title="Short_INT 2025" Description="This is a brief description of the event. It provides an overview of what attendees can expect." date="25" Year="2026" Month="10" Time="Time: 10:00 AM - 2:00 PM" />
            <EventCard Title="Short_INT 2025" Description="This is a brief description of the event. It provides an overview of what attendees can expect." date="25" Year="2026" Month="10" Time="Time: 10:00 AM - 2:00 PM" />
        </div>
    </div>
  )
}

export default Events
