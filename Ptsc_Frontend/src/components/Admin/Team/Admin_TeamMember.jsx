import React, { useEffect, useState } from 'react';
import TeamMemberCard from './TeamMemberCard';
import EditTeamMember from './EditTeamMember';
import {useSelector,useDispatch} from 'react-redux';
import {setEditingEventId,clearEditingEventId} from '../../Redux/EventSlice';

function Team() {
  const [members, setMembers] = useState([]);
  const editingEventId=useSelector((state)=>state.event.editingEventId);
  const fetchMembers = async () => {
    try {
      const res = await fetch("http://localhost:4000/v1/fetchMembers");
      const data = await res.json();
      console.log("Fetched members:", data.members);
      setMembers(data.members);
    } 
    catch (error) {
      console.error("Failed to fetch members:", error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  console.log("Members fetched successfully:", members);
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Team</h2>
      
      <div className=" w-full grid grid-cols-1  lg:grid-cols-2 gap-12">
        {members.map((member) => { 
          if (!member) return null;
          const isEdit = false;;
          return  isEdit?<EditTeamMember/>: <TeamMemberCard key={member._id} member={member} />;
        })}
      </div>
    </div>
  );
}

export default Team;
