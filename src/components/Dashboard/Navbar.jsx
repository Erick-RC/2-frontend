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

  const avatarSrc = `https://ui-avatars.com/api/?name=${user.name}+${user.lastname}`;

  return (
    <nav className="bg-gray-100 border-b border-gray-200 px-2 py-2 sm:px-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Hamburger menu (visible en todas las vistas) */}
        <button
          className="text-gray-600 hover:text-gray-800 lg:hidden"
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

        {/* Slogan */}
        <div className="hidden lg:flex items-center space-x-2">
          <svg className="w-8 lg:w-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <span className="text-lg lg:text-xl font-bold text-grey-400 italic">
            "Expandiendo mentes,
            <span className="text-grey-400"> un idioma a la vez"</span>
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center ml-auto">
          <div className="flex items-center">
            <span className="hidden sm:inline-block text-sm lg:text-xl mr-2 lg:mr-4">{user.name} {user.lastname}</span>
            {/* User photo and dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button type="button" className="flex text-sm bg-transparent rounded-full ring-2 lg:ring-4 ring-custom-MainSky"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-cover rounded-full"
                  src={avatarSrc}
                  alt="user photo"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                    </svg>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};