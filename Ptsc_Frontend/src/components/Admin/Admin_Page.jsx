import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Admin() {
  return (
    <div className="pt-24 px-4 sm:px-8 flex flex-col gap-8 justify-center items-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-gray-900 dark:text-white font-bold text-2xl sm:text-3xl md:text-4xl text-center">
        Admin Dashboard
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="admin_event"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md transition"
        >
          Manage Events
        </Link>
        <Link
          to="admin_team"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md transition"
        >
          Manage Team
        </Link>
        <Link
          to="admin_pendingmembers"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md transition"
        >
          Manage Members
        </Link>
        <Link
          to="admin_resources"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md transition"
        >
          Manage Resources
        </Link>
        <Link
          to="admin_leaderBoard"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-md transition"
        >
          Manage LeaderBoard
        </Link>
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
