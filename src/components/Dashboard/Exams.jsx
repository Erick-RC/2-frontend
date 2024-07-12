import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../services/UserContext';
import Test from './Test';

const Exams = () => {
  const [view, setView] = useState('exams');
  const [selectedExam, setSelectedExam] = useState(null);
  const { exams, exam, loading } = useContext(UserContext);

  useEffect(() => {
    exams(); // Call the exams function to fetch data
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">cargando...</div>
      </div>
    );
  }
  
  if (!exam || exam.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div>No exams available</div>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case 'test':
        return <Test selectedExam={selectedExam} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-10">
                <h2 className="text-4xl font-extrabold text-white mb-2">My exams!</h2>
                <p className="text-xl text-blue-100">We're glad to see you back. Good luck!!</p>
              </div>
              <div className="px-6 py-8 sm:px-10">
                <p className="text-2xl font-semibold text-gray-800 mb-6">Here are your tests:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exam.map((exam) => (
                    <ExamCard key={exam._id} setView={setView} setSelectedExam={setSelectedExam} exam={exam} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main>
      {renderView()}
    </main>
  );
};

const ExamCard = ({ exam, setView, setSelectedExam }) => (
  <div onClick={() => { 
    setSelectedExam(exam);
    setView('test');
  }} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
    <div className="flex items-center mb-3">
      <span className="text-3xl mr-3">📝</span>
      <h3 className="text-xl font-semibold text-gray-700">{exam.title}</h3>
    </div>
    <p className="text-md text-gray-600 mb-2">Level: {exam.nivel}</p>
    <p className="text-sm text-gray-500">{exam.description}</p>
  </div>
);

export default Exams;