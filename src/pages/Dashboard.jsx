import React, { useState, useContext, useEffect } from 'react';
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
import Exams from '../components/Dashboard/Exams.jsx';
import CreateExams from '../components/Dashboard/CreateExams.jsx';
import { MainBtn } from '../components/AsideButtons/MainBtn.jsx';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('welcome');
  const [editStudentId, setEditStudentId] = useState(null);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    // Función para cerrar el sidebar cuando se haga clic fuera de él
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('aside');
      if (sidebar && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    // Añadir event listener para clicks fuera del aside
    document.addEventListener('mousedown', handleClickOutside);

    // Limpiar event listener al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not logged in...</div>; 
  }

  const renderView = () => {
    switch (view) {
      case 'students':
        return <StudentsTable />;
      case 'myInfo':
        return <MyInfo />;
        case 'exams':
          return <Exams />
        case 'createExam': 
        return <CreateExams /> 
      case 'welcome':
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen  transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-custom-MainSky to-emerald-100">
          <div className="p-4 flex justify-start items-center">
            <img className="h-32" src="./logo-transparent-png.png" alt="logo" />
          </div>
          <div className="flex-1 px-3 pb-4 overflow-y-auto">
            <ul className="space-y-14 font-medium mt-10">
              {user.role === 'teacher' ? (
                <>
                  <ExamsBtn setView={setView} />
                  <StudentsBtn setView={setView} />
                  <MainBtn setView={setView} />
                  <NewTestBtn setView={setView} />
                </>
              ) : user.role === 'student' ? (
                <>
                  <MainBtn setView={setView} />
                  <MyVideosBtn setView={setView} />
                  <MyInfoBtn setView={setView} />
                  <MyExamsBtn setView={setView} />
                </>
              ) : null}
            </ul>
            <img className="h-auto mt-[50%] rounded-lg shadow-xl border-4 border-teal-800" src="./asideImage.PNG" alt="Test image" />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden sm:ml-64">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 custom-scrollbar"> {/* Aquí también agregamos la clase custom-scrollbar */}
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;