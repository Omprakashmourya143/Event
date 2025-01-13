import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended page to redirect after login (default is "/")
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.token); // Save the token in localStorage
      setSuccess("Login successful!");
      setError(null);
      setTimeout(() => {
        navigate(from); // Redirect to the intended page
      }, 1000); // Optional delay for showing success message
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md my-4">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-gray-800 text-white py-2 px-4 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
