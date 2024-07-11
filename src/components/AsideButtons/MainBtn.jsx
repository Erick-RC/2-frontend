import React from 'react';

export const MainBtn = ({ setView }) => {
  const handleClick = (event) => {
    event.preventDefault();
    setView('main');
  };

  return (
 
      <li>
        <a
          href="#"
          onClick={handleClick}
          className="focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-600 group"
        >
          <svg
            className="w-8 text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-3 text-lg">Main</span>
        </a>
      </li>

  );
};
