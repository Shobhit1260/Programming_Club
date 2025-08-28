import React from 'react'
import { Link } from 'react-router-dom';
import {useState} from 'react';

function Cards({title,description,buttonText,link}) {
  const [bool,setBool]=useState(true);
  const desc=`${(!bool)?description:description.slice(0,100)+"...."}`;
  return (
    <div className='dark:bg-gray-900 font-serif flex flex-col items-start justify-center gap-4 w-1/3 h-max bg-white shadow-lg rounded-lg p-4 m-8'>
        <span className=' text-lg font-bold text-black dark:text-white'>{title}</span>
        <p className='text-gray-500 dark:text-white' >{desc}
        {bool?<button onClick={()=>setBool(!bool)} className='text-blue-300'>more</button>:<button onClick={()=>setBool(!bool)} className='text-blue-300'>less</button>}
        </p>
        <Link to={`/${link}`} className='bg-white dark:bg-gray-900 border-2 shadow-lg p-2 text-md rounded-lg mt-4 dark:text-white'>{buttonText}</Link>
    </div>
  )
}

export default Cards
