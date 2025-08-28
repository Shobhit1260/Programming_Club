import React, { useEffect, useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import EditTeamMember from "./EditTeamMember";
import { useSelector } from "react-redux";
import NewMember from "./NewMember";
import { toast } from "react-toastify";

const BASE = "https://programming-club-46ae.onrender.com";

function Team() {
  const [members, setMembers] = useState([]);
  const editingEventId = useSelector((state) => state.event.editingEventId);

  const onDelete = async (id) => {
    try {
      const res = await fetch(`${BASE}/v1/deleteMember/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m._id !== id));
        toast.success("Member successfully deleted.");
      } else {
        toast.warning("Failed to delete.");
      }
    } catch (error) {
      console.log("Server Error:", error.message);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${BASE}/fetchMembers`, {
        credentials: "include",
      });
      const data = await res.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error("Failed to fetch members:", error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="w-full p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-300">
      {/* Header Section */}
      <div className="text-center sm:text-left mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
          Our Team
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Meet the talented individuals who make our team exceptional.
        </p>
      </div>

      {/* Members Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => {
          if (!member) return null;
          const isEdit = member._id === editingEventId;
          return isEdit ? (
            <EditTeamMember key={member._id} member={member} />
          ) : (
            <TeamMemberCard
              key={member._id}
              member={member}
              onDelete={onDelete}
            />
          );
        })}
      </div>

      {/* No Members */}
      {members.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-6">
          No team members available.
        </p>
      )}

      {/* New Member Form */}
      <div className="mt-10">
        <NewMember />
      </div>
    </div>
  );
}

export default Team;
