import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../services/UserContext';
import axios from 'axios';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-grey-300 rounded-lg w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col">
        <div className="sticky top-0 bg-gradient-to-r from-custom-MainSky to-sky-400 p-4 rounded-t-lg">
          <button onClick={onClose} className="float-right text-white text-2xl hover:text-gray-200 transition-colors">&times;</button>
          <h2 className="text-2xl text-center font-bold text-white">Videos del Estudiante</h2>
        </div>
        <div className="p-6 text-center overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewVideos = (studentId) => {
    setSelectedStudent(studentId);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="Buscar por nombre, email o ID del estudiante"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm md:text-base text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-emerald-600 to-sky-600">
            <tr>
              <th scope="col" className="py-3 px-4 sm:px-6 text-white">Imagen</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-white">Nombre</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-white">Email</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-white">Nivel</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-white">ID Estudiante</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-white">Videos</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="py-4 px-4 sm:px-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${student.name}+${student.lastname}`}
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
                      className="bg-sky-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedStudent && videos[selectedStudent] && videos[selectedStudent].length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos[selectedStudent].map((video) => (
              <div key={video._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
                <video className="w-full h-48 object-cover" controls>
                  <source src={`http://localhost:3000/videos/content/${video._id}`} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">No hay videos disponibles para este estudiante.</div>
        )}
      </Modal>
    </div>
  );
};

export default StudentsTable;
