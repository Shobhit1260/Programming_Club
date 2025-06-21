import React from 'react'

function MemberCard({key,id,firstName,lastName,userName,email,mobile,onApprove,onDelete}) {

  return (
    <div className='flex justify-between items-center gap-2 p-4 rounded-lg shadow-lg'>
        <div className='flex flex-col gap-2 font-medium text-xl font-mono text-gray-600 w-1/2 '>
            <h1>{`FirstName:  ${firstName}`}</h1>
            <h1>{`LastName:   ${lastName}`}</h1>
            <h1>{`UserName:   ${userName}`}</h1>
            <h2>{`Email:      ${email}`}</h2>
            <h2>{`Mobile No.: ${mobile}`}</h2>
        </div>
        <div className='flex justify-end items-end gap-4 w-1/2 min-h-min'>
            <button className="bg-green-500 rounded-lg p-2" onClick={()=>onApprove(id)}>Approve</button>
            <button className="bg-red-500 rounded-lg p-2" onClick={()=>{onDelete(id)}}>Deny</button>
        </div>
      
    </div>
  )
}

export default MemberCard
