import React, { useContext } from 'react';
import { UserContext } from '../services/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(UserContext); // Obtén la función de login del contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const matricula = e.target[0].value;
    const password = e.target[1].value;

    try {
      await login(matricula, password); // Llama a la función de login del contexto
      navigate('/dashboard'); // Redirige a la ruta protegida después del login exitoso
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-[#3a868f] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">
              Log in with your HIBY-College enrollment ID.
            </h1>
            <form onSubmit={handleLogin} className="divide-y divide-gray-200">
              <div className="relative">
                <input
                  autoComplete="off"
                  id="matricula"
                  name="matricula"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Enrollment ID"
                />
                <label
                  htmlFor="matricula"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Enrollment ID
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <button type="submit" className="bg-[#3a868f] text-white rounded-md px-2 py-1 shadow-md shadow-black active:shadow-none active:transform active:translate-y-1 transition-all">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;