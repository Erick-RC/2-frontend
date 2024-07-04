import React from 'react';

const StudentRow = ({ student }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition duration-150 ease-in-out">
      <th scope="row" className="py-4 px-4 sm:px-6 font-medium text-gray-900">
        <div className="flex flex-col">
          <span className="whitespace-nowrap">{student.name}</span>
          <span className="text-sm text-gray-500">{student.email}</span>
        </div>
      </th>
      <td className="py-4 px-4 sm:px-6">{student.course}</td>
      <td className="py-4 px-4 sm:px-6">
        <span className={`font-medium ${student.grade >= 8.5 ? 'text-green-600' : 'text-red-600'}`}>
          {student.grade.toFixed(1)}
        </span>
      </td>
      <td className="py-4 px-4 sm:px-6">{student.studentId}</td>
    </tr>
  );
};

export default StudentRow;