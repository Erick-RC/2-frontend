import React, { useState } from 'react';
import { Navbar } from '../components/Dashboard/Navbar';
import { AsideOptions } from '../components/Dashboard/AsideOptions';
import { NewTestBtn } from '../components/Dashboard/NewTestBtn';
import { MainContent } from '../components/Dashboard/MainContent';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Aside */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gradient-to-b from-custom-MainSky to-emerald-100 flex flex-col">
          <AsideOptions />
          <NewTestBtn />
          <img className="h-auto mt-4 rounded-lg shadow-xl border-4 border-teal-800" src="./asideImage.PNG" alt="Test image" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="sm:ml-64 mt-20 p-4">
        <MainContent/>
      </main>
    </>
  );
};

export default Dashboard;

