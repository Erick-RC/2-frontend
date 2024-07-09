import React, { useContext } from 'react';
import { UserContext } from '../../services/UserContext';

const BACKEND_URL = 'http://localhost:3000';

export const MyInfo = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">No user data available.</p>
      </div>
    );
  }

  const getProfileImageUrl = (profileImage) => {
    if (!profileImage) return null;
    const normalizedPath = profileImage.replace(/\\/g, '/');
    return `${BACKEND_URL}/${normalizedPath}`;
  };

  const profileImageUrl = getProfileImageUrl(user.profileImage);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-8 sm:px-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold text-white">
                My Personal Information
              </h3>
              <p className="mt-2 text-lg text-blue-100">
                Welcome back, {user.name}!
              </p>
            </div>
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-4xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-8 sm:px-10">
          <dl className="space-y-6">
            {[
              { label: "Full Name", value: `${user.name} ${user.lastname}` },
              { label: "Email Address", value: user.email },
              { label: "Role", value: user.role },
              { label: "Level", value: user.nivel },
              { label: "Registration Number", value: user.matricula },
            ].map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};