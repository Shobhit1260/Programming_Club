// @ts-nocheck
import React, { useState } from "react";
import { toast } from "react-toastify";

<<<<<<< HEAD
import  BASE  from '../../../api/config'
=======
const BASE = "https://programming-club-46ae.onrender.com";
>>>>>>> 7a15d5036515a617cc23c460850248068f3ecf2c

function NewMember({fetchMembers}) {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    role: "",
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const AddMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE}/v1/createMember`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const newMember = await res.json();

      if (res.ok) {
        toast.success("Member added successfully!");
        fetchMembers();
        setFormData({
          imageUrl: "",
          name: "",
          role: "",
        });
        setMembers([newMember.member, ...members]);
      } else {
        toast.error("Failed to add member. Please try again.");
      }
    } catch (error) {
      console.error("Error adding member:", error.message);
      toast.error("Failed to add member. Please try again.");
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 mt-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-300">
      <h1 className="text-black dark:text-white font-bold text-2xl mb-4">
        Manage Team
      </h1>

      <form
        onSubmit={AddMember}
        className="flex flex-col gap-4 w-full max-w-lg"
      >
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleFormData}
          placeholder="Image URL"
          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          placeholder="Name"
          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleFormData}
          placeholder="Role"
          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 rounded-lg w-fit transition-colors duration-200"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}

export default NewMember;
