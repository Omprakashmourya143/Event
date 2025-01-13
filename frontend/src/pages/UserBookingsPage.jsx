import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setMessage("Failed to fetch bookings. Please try again.");
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleCancel = async (id) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      setMessage(response.data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setMessage("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      {message && (
        <p className={`mb-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold">{booking.name}</h2>
              <p className="text-gray-700">Tickets: {booking.tickets}</p>
              <p className="text-gray-700">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => handleCancel(booking._id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 mt-2 rounded"
              >
                Cancel Booking
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700">You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserBookingsPage;
