import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tickets: 1,
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login", { state: { from: `/book/${eventId}` } }); // Redirect to login page
    }
  }, [navigate, eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to book an event.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bookings`,
        { ...formData, eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Set success message and clear the form data
      setSuccess("Booking successful!");
      setError(null);
      setFormData({ name: "", email: "", tickets: 1 });  // Reset form fields after successful booking

      // Optionally, clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
      // You can also redirect the user to another page (e.g., the user's bookings page)
      // navigate("/user/bookings");

    } catch (err) {
      console.error("Error booking event:", err);
      setError(err.response?.data?.message || "Failed to book the event. Please try again.");
      setSuccess(null);
    }  
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Book Your Event</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Number of Tickets</label>
          <input
            type="number"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            min="1"
            required
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-4 w-full rounded hover:border-2 hover:text-gray-800 hover:bg-white font-semibold"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
