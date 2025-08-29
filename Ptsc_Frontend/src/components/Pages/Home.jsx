import React from 'react'
import Navbar from '../Navbar';
import CountDown from '../Utils/CountDown';
import Gallery from '../Utils/Gallery';
import Cards from '../Utils/HomeCards';


function Home() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800">
      {/* Hero Section */}
      <section>
        <div className="pt-24 px-4 bg-gradient-to-b from-blue-500 to-white dark:from-gray-800 dark:to-gray-800 flex justify-center items-center flex-col gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black dark:text-white leading-snug">
            Programming and Technical Skill Club
          </h1>
          <h2 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-cyan-600">
            KNIT Sultanpur
          </h2>
          <h3 className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Empowering students through codes, innovation and technology.
          </h3>
          <button className="bg-cyan-600 text-white px-5 py-2 text-lg sm:text-xl rounded-lg mt-4 hover:bg-cyan-700 transition">
            Join Us
          </button>
        </div>
      </section>

      {/* Latest Event */}
      <section>
        <div className="bg-gradient-to-b from-cyan-700 to-cyan-100 w-11/12 shadow-lg rounded-lg mx-auto mt-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center md:h-48 py-6 px-6 gap-6">
            {/* Left */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 font-bold text-white text-xl md:text-2xl">
              <div>Next Event : Short_INT AUG 2025</div>
              <div className="w-full md:w-11/12">
                <CountDown />
              </div>
            </div>
            {/* Right */}
            <div className="w-full h-full md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg"
                alt="event"
                className="w-full md:w-3/4 lg:w-2/3 h-[100%] md:h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="mt-12 px-4">
        <Gallery />
      </section>

      {/* Cards Section */}
      <section>
        <div className="w-full dark:bg-gray-800 flex flex-col md:flex-row justify-center items-center gap-6 px-4 pt-24 mb-8">
          <Cards
            title="Events"
            description="Checkout our upcoming events and workshops"
            buttonText="View Events"
            link="event"
          />
          <Cards
            title="Resources"
            description="Access Learning Resources and Tutorials"
            buttonText="Browse Resources"
            link="resource"
          />
          <Cards
            title="LeaderBoard"
            description="See Top performers in LeaderBoard"
            buttonText="View Ranking"
            link="leaderboard"
          />
        </div>
      </section>
    </div>
  );
}

export default Home
