import React, { useContext } from 'react';
import { UserContext } from '../../services/UserContext';

const MainContent = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-10">
          <h2 className="text-4xl font-extrabold text-white mb-2">Welcome, {user.name}!</h2>
          <p className="text-xl text-blue-100">We're glad to see you back.</p>
        </div>
        <div className="px-6 py-8 sm:px-10">
          <p className="text-2xl font-semibold text-gray-800 mb-6">Here are your details:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard icon="📧" label="Email" value={user.email} />
            <DetailCard icon="🎓" label="Nivel" value={user.nivel} />
            <DetailCard icon="🆔" label="Matrícula" value={user.matricula} />
            <DetailCard icon="📅" label="Joined" value={new Date(user.date).toLocaleDateString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-3">
      <span className="text-3xl mr-3">{icon}</span>
      <h3 className="text-xl font-semibold text-gray-700">{label}</h3>
    </div>
    <p className="text-lg text-gray-600">{value}</p>
  </div>
);

export default MainContent;