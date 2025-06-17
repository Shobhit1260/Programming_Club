import React, { useEffect } from 'react'
import { useState } from 'react';

function EventCard({Title,Description,Year,Month,date,Time}) {
    const [desc,setDesc]=useState("");
    useEffect(()=>{
        const eventData = new Date(Year, Month - 1, date, 10, 0, 0); // Month is 0-indexed
        const currentDate=new Date();
        const diff= +eventData - +currentDate;
        if(diff>0){
           setDesc("Upcoming")
        }
        else{
            setDesc("Passed");
        }
    },[]);
    const openForm = () => {
    window.open("https://forms.gle/3d1b7c5f8Z2g4j6aA", "_blank");
};


  return (
    <div className='w-11/12 h-min bg-white shadow-lg rounded-lg p-8 mt-8 mx-8 flex justify-between  dark:bg-gray-900 items-start gap-4'>
        <div className='w-1/2 h-min bg-white dark:text-white dark:bg-gray-900 mx-8 flex flex-col justify-center items-start gap-4'>
            <h1 className='font-bold text-black dark:text-white text-2xl'>{Title}</h1>
            <p className='text-gray-500 dark:text-white'>{Description}</p>
            <span className='text-gray-400 dark:text-white'>{`${date}-${Month}-${Year}`}</span>
            <span className='text-gray-400 dark:text-white'>{Time}</span>
            <button onClick={openForm} className='bg-blue-500 text-white p-2 rounded-lg mt-4'>Register Now</button>
        </div>
        
            {desc === "Upcoming" ? 
            <span className='bg-green-500 text-white  rounded-lg p-2'>Upcoming</span>
            :<span className='bg-gray-500  text-white rounded-lg p-2'>Passed</span>}
        
    </div>
  )
}

export default EventCard
