// src/components/leaderboard/AddToLeaderboardForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AddToLeaderboardForm({ onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    branch: "",
    phoneNo: "",
    email: "",
    rollNo: "",
    gfgId: "",
    leetcodeId: "",
    codechefId: "",
    codeforcesId: "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      const res = await axios.post('http://localhost:4000/leaderboard/add', form, {
        withCredentials: true
      });
      setMsg({ type: "success", text: res?.message || "Submitted!" });
      setForm({
        firstName: "",
        lastName: "",
        branch: "",
        phoneNo: "",
        email: "",
        rollNo: "",
        gfgId: "",
        leetcodeId: "",
        codechefId: "",
        codeforcesId: "",
      });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl shadow-blue-200/40 dark:shadow-none">
      {/* KNIT Students Banner */}
      <div className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Exclusive for KNIT Students
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                Join the leaderboard with your institutional credentials
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">Join the Leaderboard</span>
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {msg && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm ${
            msg.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">Branch</label>
          <input
            name="branch"
            value={form.branch}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            name="phoneNo"
            value={form.phoneNo}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">Roll No</label>
          <input
            name="rollNo"
            value={form.rollNo}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">GFG ID</label>
          <input
            name="gfgId"
            value={form.gfgId}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., john_doe"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">LeetCode ID</label>
          <input
            name="leetcodeId"
            value={form.leetcodeId}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., john_doe"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">CodeChef ID</label>
          <input
            name="codechefId"
            value={form.codechefId}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., johndoe"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-300">CodeForces ID</label>
          <input
            name="codeforcesId"
            value={form.codeforcesId}
            onChange={onChange}
            required
            className="mt-1 p-3 rounded-lg border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., johndoe"
          />
        </div>

        <div className="sm:col-span-2 flex justify-between mt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-medium"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={busy}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium disabled:opacity-60 shadow-md shadow-blue-600/30 dark:shadow-none focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-sm"
          >
            {busy ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
