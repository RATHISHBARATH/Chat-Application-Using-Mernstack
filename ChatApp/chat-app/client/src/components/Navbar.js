import React from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Ensure you have react-icons installed
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ChatApp</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="flex items-center space-x-1 hover:bg-blue-700 p-2 rounded">
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link to="/register" className="flex items-center space-x-1 hover:bg-blue-700 p-2 rounded">
              <FaUser />
              <span>Register</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
