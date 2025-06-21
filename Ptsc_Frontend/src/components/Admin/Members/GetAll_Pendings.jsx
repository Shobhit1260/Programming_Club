import React, { useEffect, useState } from 'react'
import MemberCard from './MemberCard'
import {toast} from 'react-toastify'

function GetAll_Pendings() {
  const [pendingMembers,setPendingMembers]=useState([]);
  const [pendingMembersCount,setPendingMembersCount]=useState(0);
  const fetchPendingMembers=async()=>{
      const res=await fetch("http://localhost:4000/v1/getallpendings",{
        method:"GET",
        credentials:"include",
      });
      const data=await res.json();
      setPendingMembers(data.pendingUsers);
      setPendingMembersCount(data.count);
  }
  useEffect(()=>{
     fetchPendingMembers();
  },[])

  const handleApprove=async(memberId)=>{
    const res=await fetch(`http://localhost:4000/v1/approveUser/${memberId}`,{
      method:"PATCH",
      credentials:"include"
    })
    setPendingMembers(prev=>prev.filter((member)=>member._id!==(memberId)));
    if(res.ok)
      toast.success("Member aprroved Successfully.")
    else
      toast.warning("Something went wrong.")
  }
  const handleDelete=async(memberId)=>{
    const res=await fetch(`http://localhost:4000/v1/deniedUser/${memberId}`,{
      method:"DELETE",
      credentials:"include"
    })
      setPendingMembers(prev=>prev.filter((member)=>member._id!==memberId));
      if(res.ok)
        toast.success("Request successfully denied.")
      else
        toast.warning("Something went wrong.")
  }
  return (
    <div className='w-full rounded-lg shadow-lg min-h-screen bg-white p-8'>
       {!pendingMembersCount && <span>No Request for approval</span> }
      <h1 className='font-bold text-2xl'>Requests</h1>
      <div className="flex flex-col gap-8">
      {pendingMembers.map((member)=>(
        <MemberCard key={member._id} id={member._id} firstName={member.firstName} lastName={member.lastName} userName={member.username} email={member.email} mobile={member.mobile} onApprove={handleApprove} onDelete={handleDelete}/>
      ))}
     </div>
    </div>
  )
}

export default GetAll_Pendings
