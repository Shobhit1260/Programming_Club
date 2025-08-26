import React from "react";

function MemberCard({
  id,
  firstName,
  lastName,
  userName,
  email,
  mobile,
  onApprove,
  onDelete,
}) {
  return (
    <div className="w-full  mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all">
      
      {/* Member Info */}
      <div className="flex flex-col gap-2 font-medium text-base sm:text-lg font-mono text-gray-700 dark:text-gray-300 flex-1">
        <p><span className="font-semibold">First Name:</span> {firstName}</p>
        <p><span className="font-semibold">Last Name:</span> {lastName}</p>
        <p><span className="font-semibold">Username:</span> {userName}</p>
        <p><span className="font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">Mobile:</span> {mobile}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row sm:flex-col md:flex-row justify-center sm:justify-end items-end gap-3">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          onClick={() => onApprove(id)}
        >
          Approve
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          onClick={() => onDelete(id)}
        >
          Deny
        </button>
      </div>
    </div>
  );
}

export default MemberCard;
