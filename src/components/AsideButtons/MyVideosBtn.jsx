import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyVideosBtn = ({ setView }) => {
  const navigate = useNavigate();

  const handleVideos = async (e) => {
    e.preventDefault();
    try {
      setView('welcome'); // Cambia la vista antes de navegar
      navigate('/videos');
    } catch (error) {
      console.error('Error de código:', error);
      alert(`Error de código: ${error.message}`);
    }
  };

  return (

      <li>
        <a
          href="#"
          onClick={handleVideos}
          className="focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-600 group"
        >
          <svg
            className="w-8 text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <span className="ml-3 text-lg">My Videos</span>
        </a>
      </li>

  );
};

export default MyVideosBtn;
