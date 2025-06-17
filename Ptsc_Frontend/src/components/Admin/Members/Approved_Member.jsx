import React from 'react'
import MemberCard from './MemberCard'

function Approved_Member() {
  return (
    <div className='w-full rounded-lg shadow-lg min-h-screen bg-white p-8'>
      <h1 className='font-bold text-2xl'>Requests</h1>
      <MemberCard/> 
    </div>
  )
}

export default Approved_Member
