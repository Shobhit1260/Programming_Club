// src/pages/Leaderboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { fetchLeaderboard } from "../../api/leaderboardApi.js";
import AddToLeaderboardForm from "../../components/leaderboard/AddToLeaderboardForm.jsx";

export default function Leaderboard() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const role = useMemo(() => localStorage.getItem("role") || "normal", []);
  const isPrivileged = role === "admin" || role === "member";

  const load = async () => {
    setBusy(true);
    setErr(null);
    try {
      const data = await fetchLeaderboard(page, limit);
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

  // Split top 3 and remaining students
  const topThree = rows.filter(r => r.rank <= 3).sort((a, b) => a.rank - b.rank);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 md:px-12 lg:px-24 py-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 dark:text-gray-100">
          Leaderboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Track top performers across LeetCode, Codeforces, CodeChef, and GFG.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Admin / Member Controls */}
        {/* {isPrivileged && <AdminControls onAfterAction={load} />} */}

        {/* Floating Action Button with Label */}
        <div className="fixed z-30 bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center gap-3">
          {/* Floating Label */}
          <div className="hidden sm:block group-hover:block animate-fade-in bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
            Add yourself to leaderboard
            <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="group h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-xl shadow-blue-500/40 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-500/40 transition"
            aria-label="Open add to leaderboard form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>

        {/* Slide-over Form Drawer */}
        {showForm && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in"
              onClick={() => setShowForm(false)}
            />
            {/* Panel */}
            <div className="ml-auto relative w-full max-w-lg h-full bg-gradient-to-b from-white/95 to-white/80 dark:from-gray-900/95 dark:to-gray-900/80 border-l border-gray-200 dark:border-gray-700 shadow-2xl animate-slide-in">
              <div className="h-full overflow-y-auto p-6 sm:p-8">
                <AddToLeaderboardForm onClose={() => setShowForm(false)} />
                <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  We fetch your public stats from LeetCode, Codeforces, CodeChef and GFG. It may take up to 12 hours for rankings to refresh.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Podium - Only show if we have data and page 1 */}
        {!busy && !err && topThree.length > 0 && page === 1 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6 flex items-center justify-center gap-2">
              <span className="text-2xl">🏆</span>
              Top Performers
            </h2>
            <div className="flex items-end justify-center gap-3 sm:gap-6 max-w-3xl mx-auto">
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg">
                    2
                  </div>
                  <div className="bg-gradient-to-t from-gray-300 to-gray-400 h-16 sm:h-20 w-12 sm:w-16 rounded-t-lg flex flex-col items-center justify-end pb-2 shadow-lg">
                    <div className="text-center px-1">
                      <div className="font-semibold text-gray-800 text-xs">{topThree[1].name.split(' ')[0]}</div>
                      <div className="text-gray-700 text-xs font-medium">{topThree[1].score}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl mb-2 shadow-xl">
                    👑
                  </div>
                  <div className="bg-gradient-to-t from-yellow-400 to-yellow-500 h-20 sm:h-24 w-14 sm:w-18 rounded-t-lg flex flex-col items-center justify-end pb-2 shadow-xl">
                    <div className="text-center px-1">
                      <div className="font-bold text-yellow-900 text-xs sm:text-sm">{topThree[0].name.split(' ')[0]}</div>
                      <div className="text-yellow-800 text-xs font-semibold">{topThree[0].score}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg">
                    3
                  </div>
                  <div className="bg-gradient-to-t from-amber-600 to-orange-500 h-12 sm:h-16 w-12 sm:w-16 rounded-t-lg flex flex-col items-center justify-end pb-2 shadow-lg">
                    <div className="text-center px-1">
                      <div className="font-semibold text-orange-100 text-xs">{topThree[2].name.split(' ')[0]}</div>
                      <div className="text-orange-200 text-xs font-medium">{topThree[2].score}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Leaderboard Table */}
          <div className="relative w-full overflow-x-auto rounded-3xl shadow-xl shadow-blue-200/40 dark:shadow-none border border-gray-200/80 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
            <div className="px-6 py-5 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/40">📊</span>
                <span>Current Standings</span>
              </h2>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                Page {page}
              </div>
            </div>

            {busy ? (
              <div className="flex flex-col items-center justify-center py-12">
                <DotLottieReact
            src="https://lottie.host/5f1b02c1-d860-4d2a-b060-69e72317dde5/tvvgjOebAB.lottie"
            loop
            autoplay
            className="w-60 h-60 sm:w-60 sm:h-60 md:w-56 md:h-56"
                />
                <div className="mt-6 text-center">
            <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent animate-pulse">
              Loading Leaderboard...
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 animate-fade-in">
              Fetching the latest rankings and scores
            </p>
                </div>
              </div>
            ) : err ? (
              <div className="px-5 pb-6 text-red-600 dark:text-red-400">Error: {err}</div>
            ) : rows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-3">
            That's all for now!
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center max-w-md">
            If you have added yourself recently, please wait up to <span className="font-semibold">12 hours</span> for the leaderboard to update.
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[520px]">
                <thead className="bg-gray-100/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100">
            <tr className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
              <th className="text-left px-6 py-3 font-semibold">Rank</th>
              <th className="text-left px-6 py-3 font-semibold">Name</th>
              <th className="text-left px-6 py-3 font-semibold">Score</th>
            </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 dark:divide-gray-700/70">
            {rows.map((r, idx) => (
              <tr
                key={`${r.name}-${idx}`}
                className="group backdrop-blur-sm transition hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-violet-50/80 dark:hover:from-gray-800/70 dark:hover:to-gray-800/40"
              >
                <td className="px-6 py-3 text-gray-800 dark:text-gray-200 font-semibold">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shadow-sm shadow-blue-500/20 ${r.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : r.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' : r.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-gray-700'}`}>{r.rank}</span>
                </td>
                <td className="px-6 py-3 text-gray-900 dark:text-gray-100 font-medium">
                  <span>{r.name}</span>
                </td>
                <td className="px-6 py-3 text-gray-800 dark:text-gray-200 font-semibold">
                  {r.score}
                </td>
              </tr>
            ))}
                </tbody>
              </table>
            )}

            {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200/70 dark:border-gray-700/70 bg-gray-50/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-b-3xl">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:opacity-50 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm font-semibold shadow shadow-blue-600/30"
            >
              Next
            </button>
          </div>
        </div>

        {/* Tip */}
        {!isPrivileged && (
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Tip: Login as <span className="font-semibold">member</span> or <span className="font-semibold">admin</span> to see update & refresh controls.
          </p>
        )}
      </div>

      {/* Simple keyframe utilities (only once) */}
      <style>{`
        @keyframes slide-in {from {transform: translateX(100%); opacity:0;} to {transform: translateX(0); opacity:1;}}
        @keyframes fade-in {from {opacity:0;} to {opacity:1;}}
        .animate-slide-in {animation: slide-in .4s cubic-bezier(.4,0,.2,1);}
        .animate-fade-in {animation: fade-in .3s ease-out;}
      `}</style>
    </div>
  );
}
