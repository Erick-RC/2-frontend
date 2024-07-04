import React from 'react';

const LoginInputs = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      <div className="relative">
        <input
          autoComplete="off"
          id="email"
          name="email"
          type="text"
          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
          placeholder="Email address"
        />
        <label
          htmlFor="email"
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
  );
};

export default LoginInputs;