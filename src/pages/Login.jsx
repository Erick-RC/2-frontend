import React from "react";
import { LoginInputs } from "../components/LoginPage/LoginInputs.jsx";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-[#3a868f] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">
              Log in with your HIBY-College enrollment ID.
            </h1>
            <div className="divide-y divide-gray-200">
              <LoginInputs/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
