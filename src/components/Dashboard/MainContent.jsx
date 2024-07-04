import React, { useContext } from 'react';
import { UserContext } from '../../services/UserContext';

const MainContent = () => {
  const { user } = useContext(UserContext);

  // Verificar si user es null o undefined
  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading user data...</p>
      </div>
    );
  }

  // Si user está definido, mostrar los detalles
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h2>
      <p className="text-lg">Here are your details:</p>
      <ul className="mt-4">
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Nivel:</strong> {user.nivel}</li>
        <li><strong>Matrícula:</strong> {user.matricula}</li>
        {/* Puedes agregar más detalles según sea necesario */}
      </ul>
    </div>
  );
};

export default MainContent;