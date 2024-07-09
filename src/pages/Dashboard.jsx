import React, { useState, useContext } from 'react';
import { Navbar } from '../components/Dashboard/Navbar.jsx';
import NewTestBtn from '../components/AsideButtons/NewTestBtn.jsx';
import MainContent from '../components/Dashboard/MainContent.jsx';
import StudentsTable from './StudentsTable';
import ExamsBtn from '../components/AsideButtons/ExamsBtn.jsx';
import StudentsBtn from '../components/AsideButtons/StudentsBtn.jsx';
import MyVideosBtn from '../components/AsideButtons/MyVideosBtn.jsx';
import MyExamsBtn from '../components/AsideButtons/MyExamsBtn.jsx';
import { UserContext } from '../services/UserContext';
import { MyInfoBtn } from '../components/AsideButtons/MyInfoBtn.jsx';
import { MyInfo } from '../components/Dashboard/MyInfo.jsx';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('welcome');
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not logged in.</div>;
  }

  const renderView = () => {
    switch (view) {
      case 'students':
        return <StudentTable />;
      case 'myInfo':
        return <MyInfo />;
      case 'welcome':
      default:
        return <MainContent />;
    }
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gradient-to-b from-custom-MainSky to-emerald-100 flex flex-col">
          {user.role === 'teacher' ? (
            <>
              <ExamsBtn setView={setView} />
              <StudentsBtn setView={setView} />
              <NewTestBtn setView={setView} />
            </>
          ) : user.role === 'student' ? (
            <>
              <MyVideosBtn setView={setView} />
              <MyInfoBtn setView={setView} />
              <MyExamsBtn setView={setView} />
            </>
          ) : null}
          <img className="h-auto mt-4 rounded-lg shadow-xl border-4 border-teal-800" src="./asideImage.PNG" alt="Test image" />
        </div>
      </aside>

      <main className="sm:ml-64 mt-20 p-4">
        {renderView()}
      </main>
    </>
  );
};

export default Dashboard;