import React from 'react'
import Navbar from '../Navbar';
import CountDown from '../Utils/CountDown';
import Gallery from '../Utils/Gallery';
import Cards from '../Utils/HomeCards';


function Home() {
  return (
    <div className='w-full h-screen bg-white dark:bg-gray-800'> 
       {/* hero section */}
       <section>
            <div className='pt-24 bg-gradient-to-b from-blue-500 to-white dark:from-gray-800 dark:to-gray-800  flex justify-center items-center flex-col gap-4'>
                <h1 className='font-bold text-6xl text-black dark:text-white'>Programming and Technical Skill Club</h1>
                <h2 className='font-bold text-6xl text-cyan-600 '>KNIT Sultanpur</h2>
                <h3 className='text-md text-xl text-gray-500 dark:text-gray-50'>Empowering students through codes, innovation and technology.</h3>
                <button className='bg-cyan-600 text-white px-4 py-2 text-2xl rounded-lg mt-4'>join us</button>
            </div>
       </section>

       {/* Latest Event */}
       <section>
            <div className="bg-gradient-to-b from-cyan-700 to-cyan-100 w-11/12 h-min shadow-lg rounded-lg mx-auto mt-16 ">
            <div className='flex justify-between items-center h-48 p-4'>
                <div className='w-1/2 flex flex-col justify-between items-start p-4 gap-8 font-bold text-white text-2xl'>
                    <div className="text-white">Next Event : Short_INT AUG 2025</div>
                    <div className='w-11/12 text-white'><CountDown/> </div>
                </div>
                <div className='w-1/2 h-full'>
                    <img src="" alt="" />
                </div>
             </div>     
            </div>
       </section>

{      /* Event Gallery */}
        <section>
            <Gallery/>
        </section>

        {/* Cards */}
       <section>
          <div className='w-full dark:bg-gray-800 flex justify-center items-center gap-4 pt-24 mb-8'>
            <Cards title="Events" description="Checkout our upcoming events and workshops"  buttonText="View Events" link="event"/>
            <Cards title="Resources" description="Acsess Learning Resources and Tutorials"  buttonText="Browse Resources" link="resource"/>
            <Cards title="LeaderBoard" description="See Top performers in LeaderBoard"  buttonText="View Ranking" link="leaderboard"/>
          </div>
       </section>
    </div>
  )
}

export default Home
