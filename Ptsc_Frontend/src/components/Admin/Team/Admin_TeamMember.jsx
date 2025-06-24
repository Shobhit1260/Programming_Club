import React, { useEffect, useState } from 'react';
import TeamMemberCard from './TeamMemberCard';
import EditTeamMember from './EditTeamMember';
import {useSelector,useDispatch} from 'react-redux';
import {setEditingEventId,clearEditingEventId} from '../../Redux/EventSlice';
import NewMember from './NewMember';
import { toast } from 'react-toastify';

function Team() {
  const [members, setMembers] = useState([]);
  const editingEventId=useSelector((state)=>state.event.editingEventId);

   const onDelete=async(id)=>{
      try{
        const res=await fetch(`http://localhost:4000/v1/deleteMember/${id}`,{
          method:"DELETE",
          credentials:"include"
        })
        if(res.ok){
           toast.success("member successfully deleted.")
        }
        else{
          toast.warning("failed to delete.")
        }
      }
      catch(error){
        console.log("server Error:",error.message)
      }
    }

  const fetchMembers = async () => {
    try {
      const res = await fetch("http://localhost:4000/v1/fetchMembers");
      const data = await res.json();
      setMembers(data.members);
    } 
    catch (error) {
      console.error("Failed to fetch members:", error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Team</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Meet the talented individuals who make our team exceptional.
      </p>  
      <div className=" w-full grid grid-cols-1  lg:grid-cols-2 gap-12">
        {members.map((member) => { 
          if (!member) return null;
          const isEdit = member._id===editingEventId;
          return  isEdit?<EditTeamMember key={member._id} member={member}/>: <TeamMemberCard key={member._id} member={member} onDelete={onDelete}/>;
        })}
      </div>
      {members.length === 0 && (
        <p className="text-gray-500">No team members available.</p>
      )}
      <NewMember />
    </div>
  );
}

export default Team;
