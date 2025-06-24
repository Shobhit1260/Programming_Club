// @ts-nocheck
import React from 'react'
import { useEffect } from 'react';
import {useState} from 'react'
import { toast } from 'react-toastify';

function NewMember() {
  const [members,setMembers]=useState([]);
  const [formData,setFormData]=useState({
    imageUrl:"",
    name:"",
    role:"",
  })

  const handleFormData=(e)=>{
    setFormData({
      ...formData,
        [e.target.name]:e.target.value,
     })
  }
  const AddMember=async (e)=>{
      e.preventDefault();
      try{
      const res=await fetch("http://localhost:4000/v1/createMember",{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(formData)
      });
      const newMember=await res.json();
      if(res.ok){
        toast.success("Member added successfully!");
        setFormData({
        imageUrl:"",
        name:"",
        role:"",
      })
      }
      setMembers([newMember.member,...members]);
    }
    catch(error){
      console.error("Error adding member:", error.message);
      toast.error("Failed to add member. Please try again.");
    } 
  }
 
  return (
    <div >
        <h1 className='text-black font-bold px-4 text-2xl pt-8'>Manage Team</h1>
        <form 
        onSubmit={AddMember}
        className='flex flex-col w-full p-4 gap-2'>
            <input 
            type="text" 
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleFormData} 
            placeholder="ImageUrl" 
            className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none' />

            <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleFormData}
            placeholder="Name" 
            className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'/>
          
          <input 
            type="text" 
            name="role"
            value={formData.role}
            onChange={handleFormData}  
            placeholder="Role" 
            className='text-gray-600 p-2 rounded-lg border-2 border-gray-600 outline-none'/>
         <input 
            type="submit" 
            value="Add Member"  
            className='bg-cyan-300 text-white p-2 w-min rounded-lg'/>
        </form>
    </div>
  )
}
export default NewMember;




