// src/pages/Leaderboard.jsx
import React, { useEffect, useMemo, useState } from "react";

import { fetchLeaderboard } from "../../api/leaderboardApi.js"; 
import AddToLeaderboardForm from "../../components/leaderboard/AddToLeaderboardForm.jsx";
import AdminControls from "../../components/leaderboard/AdminControls.jsx";

export default function Leaderboard() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState(null);

  // Read role from localStorage (as per your Navbar pattern)
  const role = useMemo(() => localStorage.getItem("role") || "normal", []);
  const isPrivileged = role === "admin" || role === "member";

  const load = async () => {
    setBusy(true);
    setErr(null);
    try {
      const data = await fetchLeaderboard(page, limit);
      // Your controller returns array of { name, rank, score }
      setRows(Array.isArray(data) ? data : data?.students || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 md:px-12 lg:px-24 py-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 dark:text-gray-100">
          Leaderboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Track top performers across LeetCode, Codeforces, CodeChef, and GFG.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Admin / Member Controls */}
        {isPrivileged && <AdminControls onAfterAction={load} />}

        {/* Add form (available to all) */}
        <AddToLeaderboardForm />

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="px-5 py-4 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Current Standings
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Page {page}
            </div>
          </div>

          {busy ? (
            <div className="px-5 pb-6 text-gray-800 dark:text-gray-200">Loading...</div>
          ) : err ? (
            <div className="px-5 pb-6 text-red-600 dark:text-red-400">Error: {err}</div>
          ) : rows.length === 0 ? (
            <div className="px-5 pb-6 text-gray-700 dark:text-gray-300">No data yet.</div>
          ) : (
            <table className="w-full min-w-[520px]">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="text-left px-5 py-3">Rank</th>
                  <th className="text-left px-5 py-3">Name</th>
                  <th className="text-left px-5 py-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr
                    key={`${r.name}-${idx}`}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-5 py-3 text-gray-800 dark:text-gray-200">{r.rank}</td>
                    <td className="px-5 py-3 text-gray-900 dark:text-gray-100">{r.name}</td>
                    <td className="px-5 py-3 text-gray-800 dark:text-gray-200">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </button>
          </div>
        </div>

        {/* Tip */}
        {!isPrivileged && (
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Tip: Login as <span className="font-semibold">member</span> or <span className="font-semibold">admin</span> to see Update/Refresh controls.
          </p>
        )}
      </div>
    </div>
  );
}
