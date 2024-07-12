import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../services/UserContext';

const Test = ({ selectedExam }) => {
  console.log(selectedExam)

  const question = "¿Cuál es la capital de Francia?";
  const options = ["París", "Londres", "Berlín"];
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

  console.log(selectedExam.questions)

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-10">
            <h2 className="text-4xl font-extrabold text-white mb-2">{selectedExam.title}</h2>
            <p className="text-xl text-blue-100">Good luck!!</p>
          </div>
          <div className="px-6 py-8 sm:px-10">
            <p className="text-2xl font-semibold text-gray-800 mb-6">Here are your tests:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

              {selectedExam.questions.map((q) => (
                <QuestionCard key={exam._id} question={q.question} options={q.options} />
              ))}

            </div>

          </div>
        </div>
      </div> 
      <Link
        to='/dashboard'
        className=" absolute bg-transparent mt-8 text-[#3a868f] py-2 px-4 rounded-full shadow-lg hover:bg-[#3a868f] hover:text-white transition duration-300"
      >
        ← Volver
      </Link>

    </>
  )
}

const QuestionCard = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className=" mx-auto w-[500px] bg-white mb-6 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{question}</h2>
        <div className="space-y-4">
          {options.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Test