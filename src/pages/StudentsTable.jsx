import React, { useState } from 'react';
import { students } from '../hooks/fakeHook';
import SearchBar from '../components/StudentsTable/SearchBar.jsx';
import TableHeader from '../components/StudentsTable/TableHeader.jsx';
import StudentRow from '../components/StudentsTable/StudentRow.jsx';

const StudentsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm md:text-base text-left text-gray-500">
          <TableHeader />
          <tbody>
            {filteredStudents.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;