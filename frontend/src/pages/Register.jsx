// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import RegistrationForm from "../components/RegistrationForm";

const Register = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        formData
      );
      setSuccess("User registered successfully!");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md my-4">
      <h1 className="text-2xl font-semibold mb-6">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <RegistrationForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
