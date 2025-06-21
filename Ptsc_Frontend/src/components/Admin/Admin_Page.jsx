import React from 'react'
import {Link, Outlet} from 'react-router-dom'
function admin() {
  return (
    <div className='pt-24 px-8 flex flex-col gap-8 justify-center items-center'>
        <div className='text-black font-bold text-4xl '>Admin DashBoard</div>
        <div className='flex gap-4 '>
            <Link to="admin_event" className='p-4 bg-cyan-400 text-white rounded-lg'>Manage Events</Link>
            <Link to="admin_team" className='p-4 bg-cyan-400 text-white rounded-lg'>Manage Team</Link>
            <Link to="admin_pendingmembers" className='p-4 bg-cyan-400 text-white rounded-lg'>Manage Members</Link>
            <Link to="admin_resources" className='p-4 bg-cyan-400 text-white rounded-lg'>Manage Resources</Link>
            <Link to="admin_leaderBoard" className='p-4 bg-cyan-400 text-white rounded-lg'>Manage LeaderBoard</Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default admin
