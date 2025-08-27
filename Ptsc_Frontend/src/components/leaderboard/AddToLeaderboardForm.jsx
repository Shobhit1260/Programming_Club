// src/components/leaderboard/AddToLeaderboardForm.jsx
import React, { useState } from "react";
import { addToLeaderboard } from "../../api/leaderboardApi";

export default function AddToLeaderboardForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
      const res = await addToLeaderboard(form);
      setMsg({ type: "success", text: res?.message || "Submitted!" });
      setForm({
        firstName: "",
        lastName: "",
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
    <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Add Yourself to Leaderboard
      </h3>

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

        <div className="sm:col-span-2 flex justify-end mt-2">
          <button
            type="submit"
            disabled={busy}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-60"
          >
            {busy ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
