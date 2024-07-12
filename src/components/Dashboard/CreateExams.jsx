import React from 'react'
import FormCreate from './FormCreateExam'

const CreateExams = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-10">
          <h2 className="text-4xl font-extrabold text-white mb-2">New Test</h2>
        </div>
        <div className="px-6 py-8 sm:px-10">
          <p className="text-2xl font-semibold text-gray-800 mb-6">Here are your details:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormCreate />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateExams