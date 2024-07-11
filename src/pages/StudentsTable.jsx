import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import axios from 'axios';

const StudentsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.role === 'teacher') {
      fetchStudents();
    }
  }, [user]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const filteredStudents = response.data.filter(
        student => student.role === 'student' && student.nivel === user.nivel
      );
      setStudents(filteredStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricula.toString().includes(searchTerm)
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="Search for student's name, email, or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm md:text-base text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-4 sm:px-6">Image</th>
              <th scope="col" className="py-3 px-4 sm:px-6">Name</th>
              <th scope="col" className="py-3 px-4 sm:px-6">Email</th>
              <th scope="col" className="py-3 px-4 sm:px-6">Nivel</th>
              <th scope="col" className="py-3 px-4 sm:px-6">Student ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="py-4 px-4 sm:px-6">
                  <img 
                    src={`http://localhost:3000/${student.profileImage}`} 
                    alt={`${student.name}'s profile`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <th scope="row" className="py-4 px-4 sm:px-6 font-medium text-gray-900">
                  {student.name} {student.lastname}
                </th>
                <td className="py-4 px-4 sm:px-6">{student.email}</td>
                <td className="py-4 px-4 sm:px-6">{student.nivel}</td>
                <td className="py-4 px-4 sm:px-6">{student.matricula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;