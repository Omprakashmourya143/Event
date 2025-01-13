import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [loading, setLoading] = useState(true); // State to handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token or user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');

    // Show the logout message for a short period before redirecting
    setTimeout(() => {
      setLoading(false); // Stop the loading state
      navigate('/login'); // Redirect to the login page
    }, 2000); // Show the message for 2 seconds
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {loading ? (
        <h1 className="text-xl font-semibold">Logging you out...</h1> // Show this message during logout
      ) : (
        <h1 className="text-xl font-semibold text-green-500">You have been logged out!</h1> // Message after logout
      )}
    </div>
  );
};

export default Logout;
