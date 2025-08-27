// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditingEventId, clearEditingEventId } from '../../Redux/EventSlice'
import EditEvent from './EditEvent'
import Prepared_Event from './Prepared_Event'
import NewEvent from './NewEvent'
const BASE = "https://programming-club-backend.onrender.com";
function Admin_Event() {
  const [events, setEvents] = useState([])
  const [eventsCount, setEventsCount] = useState(0)
  const editingEventId = useSelector((state) => state.event.editingEventId)
  const dispatch = useDispatch()

  const fetchData = async () => {
    const res = await fetch(`${BASE}/fetchEvents`, {
      method: "GET",
    })
    const data = await res.json()
    setEvents(data.events || [])
    setEventsCount(data.count || 0)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 shadow-lg p-6 sm:p-8 m-4 w-full min-h-screen transition-colors duration-300">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Manage Event
      </h1>
      <div className="flex flex-col gap-8">
        <div className="w-full px-4 py-6 rounded-lg flex flex-col gap-8 shadow-md border border-gray-300 dark:border-gray-700 transition">
          {events.map((event) => {
            if (!event) return null
            const isEdit = editingEventId === event._id
            return isEdit ? (
              <EditEvent key={event._id} event={event} />
            ) : (
              <Prepared_Event key={event._id} event={event} />
            )
          })}
          {events.length === 0 && (
            <span className="text-gray-500 dark:text-gray-400 text-center">
              No events available.
            </span>
          )}
        </div>
        <NewEvent />
      </div>
    </div>
  )
}

export default Admin_Event
