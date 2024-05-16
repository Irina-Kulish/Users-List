import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VantaBackground } from '../VantaBackground/VantaBackground';

export const Login = () => {
  const navigate = useNavigate();
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/users');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <VantaBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className=" bg-white bg-opacity-50 p-10 rounded-xl shadow-xl z-10 relative max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center">
            Sign in
          </h2>
          <form 
            action="#" 
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-m font-medium text-gray-900"
              >
                Email
              </label>
              <div className="rounded-md shadow-sm mt-1">
                <input
                  type="email"
                  id="email"
                  required
                  className="border-gray-600 rounded-md p-3 w-full"
                  placeholder="Your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-m font-medium text-gray-900"
              >
                Password
              </label>
              <div className="rounded-md shadow-sm mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength={8}
                  className="border-gray-600 rounded-md p-3 w-full"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                className="mt-5 bg-gray-600 text-white py-3 px-4 rounded-md w-full font-semibold shadow-md hover:bg-gray-700 disabled:bg-gray-400"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-6">
            <button 
              onClick={handleClick} 
              className="font-medium text-sm"
            >
              Need an account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
