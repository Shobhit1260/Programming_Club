import React from "react";

const Pagination = ({ current, total, onChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 text-sm sm:text-base rounded-lg transition-colors duration-200
            ${current === p 
              ? "bg-blue-600 text-white dark:bg-blue-500" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
