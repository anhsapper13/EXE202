import Link from 'next/link';
import React from 'react';
import './register.css';

const Register: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: `url('https://wallpaperfx.com/view_image/beautiful-australian-shepherd-1920x1080-wallpaper-14732.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form
        className="login-page flex flex-col space-y-4 border p-15 rounded shadow-md"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-white">Register Form</h1>
        
        <div className="flex space-x-3 ">
          <input
            type="text"
            placeholder="First Name"
            className="input-username border p-2 w-49   h-12 border-gray-300 rounded text-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input-username border p-2 w-49   h-12 border-gray-300 rounded text-white"
          />
        </div>
         <div className="flex space-x-3 ">
          <input
            type="number"
            placeholder="Age"
            className="input-username border p-2 w-49 h-12 border-gray-300 rounded text-white"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="input-username border p-2 w-49 h-12 border-gray-300 rounded text-white"
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          className="input-username border p-2 w-100 h-12 border-gray-300 rounded text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="input-username p-2 border border-gray-300  w-100 h-12 rounded text-white"
        />
        <button type="submit" className="bg-white p-2 rounded button-login">
          Register
        </button>
        <div className="text-center">
          <p className="text-white">
            Already have an account?{' '}
            <span>
              <Link className="text-white" href="/login ">
                Login
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;