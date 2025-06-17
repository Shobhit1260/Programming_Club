import React from 'react'

function MemberCard() {
  return (
    <div className='flex justify-between items-center gap-2 p-4 rounded-lg shadow-lg'>
        <div className='flex flex-col gap-2 font-semibold text-xl text-gray-500 w-1/2 '>
            <h1>First Name: Shobhit</h1>
            <h1>Last Name: Srivastava</h1>
            <h1>UserName: Shobhit_14</h1>
            <h2>Email: Shobhit.23262@knit.ac.in</h2>
            <h2>Mobile No.:9305912360</h2>
        </div>
        <div className='flex justify-end items-end gap-4 w-1/2 min-h-min '>
            <button className="bg-green-500 rounded-lg p-2">Approve</button>
            <button className="bg-red-500 rounded-lg p-2">Deny</button>
        </div>
      
    </div>
  )
}

export default MemberCard
