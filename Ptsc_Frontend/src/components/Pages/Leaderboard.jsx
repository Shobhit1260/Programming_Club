import React from 'react'

function Leaderboard() {
  const users = [
    { id: 1, name: 'Shobhit', leetcode: 1200, gfg: 300 },
    { id: 2, name: 'Amit', leetcode: 1100, gfg: 250 },
    { id: 3, name: 'Priya', leetcode: 950, gfg: 200 },
    { id: 4, name: 'Raj', leetcode: 900, gfg: 180 },
    { id: 5, name: 'Neha', leetcode: 850, gfg: 150 },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 to-white 
      dark:from-gray-800 dark:to-gray-800 dark:text-white 
      flex flex-col gap-6 sm:gap-8 px-4 sm:px-8 md:px-16 lg:px-24 lg:py-24 sm:py-16 justify-center items-center">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-center">
        LeaderBoard
      </h1>
      <h2 className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-serif text-center">
        Top Performers in Competitive Programming
      </h2>

      {/* CTA Button */}
      <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-serif transition-all">
        Add Yourself to LeaderBoard
      </button>

      {/* Responsive Table Wrapper */}
      <div className="w-full max-w-5xl overflow-x-auto rounded-2xl shadow-lg dark:shadow-none mt-6">
        <table className="w-full min-w-[500px] bg-white dark:bg-gray-900 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="border-b border-gray-300 dark:border-gray-600 mx-auto pl-4">
              <th className="px-4 py-2 mx-auto">Rank</th>
              <th className="px-4 py-2 mx-auto">Name</th>
              <th className="px-4 py-2 mx-auto">LeetCode</th>
              <th className="px-4 py-2 mx-auto">GFG</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{user.name}</td>
                <td className="px-4 py-2 text-center">{user.leetcode}</td>
                <td className="px-4 py-2 text-center">{user.gfg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
