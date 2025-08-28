// @ts-nocheck
import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { toast } from "react-toastify";

import  BASE  from '../../../api/config'

function GetAll_Pendings() {
  const [pendingMembers, setPendingMembers] = useState([]);
  const [pendingMembersCount, setPendingMembersCount] = useState(0);

  const fetchPendingMembers = async () => {
    try {
      const res = await fetch(`${BASE}/v1/getallpendings`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setPendingMembers(data.pendingUsers);
      setPendingMembersCount(data.count);
    } catch (err) {
      toast.error("Failed to fetch pending members");
    }
  };

  useEffect(() => {
    fetchPendingMembers();
  }, []);

  const handleApprove = async (memberId) => {
    const res = await fetch(
      `${BASE}/v1/approveUser/${memberId}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    setPendingMembers((prev) =>
      prev.filter((member) => member._id !== memberId)
    );
    fetchPendingMembers();     
    if (res.ok) toast.success("Member approved successfully.");
    
    else toast.warning("Something went wrong.");
  };

  const handleDelete = async (memberId) => {
    const res = await fetch(
      `${BASE}/v1/deniedUser/${memberId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    setPendingMembers((prev) =>
      prev.filter((member) => member._id !== memberId)
    );
    fetchPendingMembers();
    if (res.ok) toast.success("Request successfully denied.");
    else toast.warning("Something went wrong.");
  };

  return (
    <div className="w-full min-h-screen p-6 sm:p-10 bg-white dark:bg-gray-900 rounded-xl shadow-md transition">
      <h1 className="font-bold text-2xl mb-6 text-gray-900 dark:text-white">
        Requests
      </h1>

      {/* Empty state */}
      {pendingMembersCount === 0 ? (
        <div className="flex items-center justify-center h-40 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">
          No request for approval
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {pendingMembers.map((member) => (
            <MemberCard
              key={member._id}
              id={member._id}
              firstName={member.firstName}
              lastName={member.lastName}
              userName={member.username}
              email={member.email}
              mobile={member.mobile}
              onApprove={handleApprove}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAll_Pendings;
