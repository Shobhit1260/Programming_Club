import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {toggleEdit,setEditTrue,setEditFalse} from '../../Redux/EventSlice';
import EditTeamMember from './EditTeamMember';
import TeamMemberCard from './TeamMemberCard';


function Admin_TeamMember() {
     // @ts-ignore
     const isEdit=useSelector((state)=>state.event.isEdit);
      
  return (
   <div className='rounded-lg bg-white shadow-lg p-4 m-4 w-full min-h-screen'>
       <h1 className='text-2xl text-black font-bold'>Manage Members</h1>
       <div className='flex flex-col gap-8 '>
        <div className='w-full px-4 py-8 rounded-lg flex flex-col gap-3 shadow-lg h-min border-1 border-gray-500'>
        {isEdit ? <EditTeamMember /> : <TeamMemberCard />}
        </div>
       </div>
    </div>
  )
}

export default Admin_TeamMember
