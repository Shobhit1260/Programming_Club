import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearEditingEventId } from "../../Redux/EventSlice";
import { toast } from "react-toastify";

const BASE=`https://programming-club-46ae.onrender.com`;
function EditTeamMember({ member }) {
  const [formData, setFormData] = useState(member || {});
  const memberId = member._id;
  const dispatch = useDispatch();

  const handleForm = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE}/v1/editMember/${memberId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Member details saved successfully!");
        setFormData(data.member);
        dispatch(clearEditingEventId());
      } else {
        toast.error("Please fill all fields");
      }
    } catch (error) {
      console.error("Error saving member:", error.message);
      toast.error("Failed to save member. Please try again.");
    }
  };

  const handleCancel = () => {
    dispatch(clearEditingEventId());
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={onSave}
        className="flex flex-col gap-4 w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-300"
      >
        <input
          type="text"
          placeholder="Profile URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleForm}
          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleForm}
          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Position"
          name="role"
          value={formData.role}
          onChange={handleForm}
          className="p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTeamMember;
