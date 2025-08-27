import React, { useEffect, useState } from 'react';
import TeamCard from '../Utils/TeamCard';

const BASE = "http://localhost:4000/v1";

function Team() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${BASE}/fetchMembers`);
      const data = await res.json();
      setMembers(data.members);
    } catch (error) {
      console.error("Failed to fetch members:", error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-200 to-white  flex flex-col
      dark:from-gray-900 dark:to-gray-900 transition-colors duration-300">
      
      {/* Heading Section */}
      <div className="w-full flex flex-col justify-center items-center gap-4 pt-24 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-black dark:text-white">
          Our Team
        </h1>
        <h2 className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 font-serif max-w-2xl">
          Meet the people behind the PTSC
        </h2>
      </div>

      {/* Team Members Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-16 pb-16 px-6 md:px-4 lg:px-24">
        {members.map((member) => {
          if (!member) return null;
          return (
            <TeamCard
              key={member._id}
              Name={member.name}
              Position={member.role}
              Image={
                member.imageUrl ||
                "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Team;
