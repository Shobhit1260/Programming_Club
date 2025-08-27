// src/components/leaderboard/AdminControls.jsx
import React, { useState } from "react";
import { refreshLeaderboard, updateLeaderboard } from "../../../api/leaderboardApi";

export default function AdminControls({ onAfterAction }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const call = async (fn, label) => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fn();
      setMsg({ type: "success", text: res?.message || `${label} done` });
      onAfterAction?.();
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Admin / Member Controls
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

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => call(updateLeaderboard, "Update Leaderboard")}
          disabled={busy}
          className="flex-1 px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
        >
          {busy ? "Working..." : "Update Leaderboard (fetch latest stats)"}
        </button>
        <button
          onClick={() => call(refreshLeaderboard, "Refresh Ranks")}
          disabled={busy}
          className="flex-1 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
        >
          {busy ? "Working..." : "Refresh Ranks"}
        </button>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
        Update pulls data from platforms and recomputes scores; Refresh sorts and assigns ranks.
      </p>
    </div>
  );
}
