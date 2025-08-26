import React from "react";
import { useDispatch } from "react-redux";
import { setEditingEventId } from "../../Redux/EventSlice";

function TeamMemberCard({ member, onDelete }) {
  const dispatch = useDispatch();

  return (
    <div className="w-full max-w-sm shadow-lg rounded-xl p-4 flex flex-col gap-3 justify-center items-center 
                    bg-white dark:bg-gray-800 transition-colors duration-300">
      {/* Image */}
      <img
        src={member.imageUrl}
        alt={member.name}
        className="object-cover overflow-hidden border-2 w-32 h-32 sm:w-40 sm:h-40 border-blue-400 rounded-full"
      />

      {/* Name */}
      <h1 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100">
        {member.name}
      </h1>

      {/* Role */}
      <h2 className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {member.role}
      </h2>

      {/* Actions */}
      <div className="flex justify-center items-center gap-4 mt-3 w-full">
        <button
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg py-2 px-4 text-sm sm:text-base 
                     transition-colors duration-300"
          onClick={() => dispatch(setEditingEventId(member._id))}
        >
          Edit
        </button>
        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 px-4 text-sm sm:text-base 
                     transition-colors duration-300"
          onClick={() => onDelete(member._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeamMemberCard;
