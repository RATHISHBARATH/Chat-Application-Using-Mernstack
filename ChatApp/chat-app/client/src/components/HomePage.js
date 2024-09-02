import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartMessaging = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4 animate-fadeIn">Welcome to ChatApp</h1>
      <p className="text-lg mb-8 animate-slideUp">Start messaging with your friends in real-time.</p>
      <button 
        onClick={handleStartMessaging} 
        className="bg-white text-blue-600 py-2 px-4 rounded shadow-md hover:bg-gray-200 transform transition-transform hover:scale-105"
      >
        Start Messaging
      </button>
      <p className="mt-4">
        If you’re not a user, <a href="/register" className="text-blue-300 hover:underline">sign up</a>.
      </p>
    </div>
  );
};

export default HomePage;
