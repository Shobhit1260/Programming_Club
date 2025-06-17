import React from 'react'
import TeamCard from '../Utils/TeamCard'

function Team() {
  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-blue-200 to-white'>
      <div className='dark:bg-gray-800 dark:text-white w-full flex flex-col justify-center items-center gap-4 pt-24 px-4 text-center'>
        <h1 className='text-4xl font-serif font-bold text-black dark:text-white'>Our Team</h1>
        <h2 className='text-xl text-gray-700 dark:text-gray-300 font-serif'>Meet the people behind the PTSC</h2>
      </div>

      <div className='dark:bg-gray-800 dark:text-white w-full flex justify-center items-center flex-wrap gap-6 pt-16 pb-16 px-4'>
        <TeamCard
          Name="Gaurpad Shukla"
          Position="Secretary"
          Image="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
        />
        <TeamCard
          Name="Abcdbf"
          Position="Secretary"
          Image="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
        />
        <TeamCard
          Name="Abcdbf"
          Position="Secretary"
          Image="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
        />
        <TeamCard
          Name="Abcdbf"
          Position="Secretary"
          Image="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
        />
      </div>
    </div>
  )
}

export default Team
