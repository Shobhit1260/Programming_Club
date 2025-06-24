import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { clearEditingEventId } from '../../Redux/EventSlice';
import { toast } from 'react-toastify';


function EditTeamMember({member}) {
    const [formData,setFormData]=useState(member || {})
    const memberId= member._id ;
    const dispatch=useDispatch();

    const handleform=(e)=>{
       setFormData((formData) => ({
        ...formData,
        [e.target.name]: e.target.value
      }));
    }
    
    const onSave=async(e)=>{
        e.preventDefault();
      try{
        const res= await fetch(`http://localhost:4000/v1/editMember/${memberId}`,{
          method:"PATCH",
          headers:{
            "content-type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify(formData)
        });
        const data=await res.json();
        if(res.ok){
          toast.success("Member details saved successfully!");
          setFormData(data.member);
          dispatch(clearEditingEventId());
        }
        else{
          toast.error("Please fill all fields");
        }
      }
      catch(error){
        console.error("Error saving member:", error.message);
        toast.error("Failed to save member. Please try again.");
      } 
    }
    const handleCancel=(e)=>{
        dispatch(clearEditingEventId());
    }
  return (
    <div className='flex justify-center items-center' >
        <form onSubmit={(e)=>{onSave(e)}} className='flex flex-col justify-center items-center gap-2'>
        <input type="text" placeholder='profile Url' name="imageUrl" value={formData.imageUrl} onChange={(e)=>handleform(e)} className='outline-none border-2 border-gray-500 rounded-lg p-2'/>
        <input type="text" placeholder='Name' name="name" value={formData.name} onChange={(e)=>handleform(e)} className='outline-none border-2 border-gray-500 rounded-lg p-2'/>
        <input type="text" placeholder='Position' name="role"  value={formData.role} onChange={(e)=>handleform(e)} className='outline-none border-2 border-gray-500 rounded-lg p-2'/>
        <div className='flex justify-start items-center gap-4'>
                <button type='submit' className='bg-blue-400 p-2 rounded-lg'>Save</button>
                <button className='bg-red-600 p-2 rounded-lg' onClick={handleCancel}>Cancel</button>
        </div>
        </form>
    </div>
  )
}

export default EditTeamMember
