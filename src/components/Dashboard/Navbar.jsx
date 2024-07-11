import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../services/UserContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading user data...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-100">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center justify-start rtl:justify-end">
            <img className="h-14" src="./pin.svg" alt="logo" />
          </div>
          {/* Hamburger menu */}
          <button
            className="sm:hidden text-gray-600 hover:text-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          {/* User Info */}
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <span className="text-xl mr-4"> {user.name} {user.lastname} </span>
              {/* User photo and dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex text-sm bg-transparent rounded-full ring-4 ring-custom-MainSky"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 bg-cover rounded-full"
                    src={user.photo || './examplephoto.jpg'}
                    alt="user photo"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};