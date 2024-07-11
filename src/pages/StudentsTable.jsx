import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import axios from 'axios';


const StudentsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [videos, setVideos] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.role === 'teacher') {
      fetchStudents();
    } else if (user && user.role === 'student') {
      fetchVideos(user._id); // Para estudiantes, obtener sus propios videos
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
      fetchVideosForStudents(filteredStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchVideosForStudents = async (students) => {
    const token = localStorage.getItem('token');
    const videosData = {};
    for (const student of students) {
      try {
        const response = await axios.get(`http://localhost:3000/videos?userId=${student._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        videosData[student._id] = response.data;
      } catch (error) {
        console.error(`Error fetching videos for student ${student._id}:`, error);
        videosData[student._id] = [];
      }
    }
    setVideos(videosData);
  };

  const fetchVideos = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/videos?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVideos({ [userId]: response.data });
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricula.toString().includes(searchTerm)
  );

  const handleViewVideos = (studentId) => {
    setSelectedStudent(studentId);
  };

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
              <th scope="col" className="py-3 px-4 sm:px-6">Videos</th>
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
                <td className="py-4 px-4 sm:px-6">
                  {videos[student._id] && videos[student._id].length > 0 ? (
                    <button
                      onClick={() => handleViewVideos(student._id)}
                      className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                    >
                      Ver {videos[student._id].length} video(s)
                    </button>
                  ) : (
                    <span className="text-gray-500">No hay videos disponibles</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Videos de Estudiante</h2>
          {videos[selectedStudent] && videos[selectedStudent].length > 0 ? (
            <ul>
              {videos[selectedStudent].map((video) => (
                <li key={video._id} className="mb-4">
                  <h3 className="text-md font-medium">{video.title}</h3>
                  <video width="320" height="240" controls>
                    <source src={`http://localhost:3000/videos/content/${video._id}`} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </li>
              ))}
            </ul>
          ) : (
            <div>No hay videos disponibles</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentsTable;