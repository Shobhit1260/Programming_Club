import React from 'react'

function Leaderboard() {
     const users = [
    { id: 1, name: 'Shobhit', age: 20 },
    { id: 2, name: 'Amit', age: 22 },
    { id: 3, name: 'Priya', age: 19 },
    { id: 4, name: 'Priya', age: 19 },
    { id: 5, name: 'Priya', age: 19 },
    { id: 6, name: 'Priya', age: 19 },
    { id: 7, name: 'Priya', age: 19 },
    { id: 8, name: 'Priya', age: 19 },
    { id: 9, name: 'Priya', age: 19 },
  ];
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-blue-200 to-white  dark:from-gray-800 dark:to-gray-800 dark:text-white flex flex-col gap-8 p-24 justify-center items-center'>
      <h1 className='text-center text-4xl font-bold font-serif'>LeaderBoard</h1>
      <h2 className='text-center text-xl text-gray-500 font-serif'>Top Performers in Competetive Programming</h2>
      <button className='text-white bg-blue-300 rounded-lg p-4 font-sm font-serif '>Add yourSelf to LeaderBoard</button>
  <div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg dark:shadow-none">
    <table className="w-full bg-white dark:bg-gray-900 dark:text-white">
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr className="border-b border-gray-300 dark:border-gray-600">
        <th className="px-4 py-2">Rank</th>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Leetcode</th>
        <th className="px-4 py-2">Gfg</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr
          key={user.id}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          <td className="text-center px-4 py-2">{user.id}</td>
          <td className="text-center px-4 py-2">{user.name}</td>
          <td className="text-center px-4 py-2">{user.age}</td>
          <td className="text-center px-4 py-2">N/A</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default Leaderboard
