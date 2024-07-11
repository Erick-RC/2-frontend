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
import { MainBtn } from '../components/AsideButtons/MainBtn.jsx';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('welcome');
  const [editStudentId, setEditStudentId] = useState(null);
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not logged in...</div>;
  }

  const renderView = () => {
    switch (view) {
      case 'students':
        return <StudentsTable setView={setView} setEditStudentId={setEditStudentId} />;
      case 'myInfo':
        return <MyInfo />;
        case 'main':
          return <MainContent />;
      case 'welcome':
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-custom-MainSky to-emerald-100">
          <div className="p-4 flex justify-start items-center">
            <img className="h-32" src="./logo-transparent-png.png" alt="logo" />
          </div>
          <div className="flex-1 px-3 pb-4 overflow-y-auto">
            {user.role === 'teacher' ? (
              <>
                <ExamsBtn setView={setView} />
                <StudentsBtn setView={setView} />
                <MainBtn setView={setView} />
                <NewTestBtn setView={setView} />
              </>
            ) : user.role === 'student' ? (
              <>
                <MyVideosBtn setView={setView} />
                <MainBtn setView={setView} />
                <MyInfoBtn setView={setView} />
              </>
            ) : null}
            <img className="h-auto mt-4 rounded-lg shadow-xl border-4 border-teal-800" src="./asideImage.PNG" alt="Test image" />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden sm:ml-64">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
