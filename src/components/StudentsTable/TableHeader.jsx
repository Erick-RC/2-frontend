import React from 'react';

const TableHeader = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="py-3 px-4 sm:px-6">Name</th>
        <th scope="col" className="py-3 px-4 sm:px-6">Course</th>
        <th scope="col" className="py-3 px-4 sm:px-6">Grade</th>
        <th scope="col" className="py-3 px-4 sm:px-6">Student ID</th>
      </tr>
    </thead>
  );
};

export default TableHeader;