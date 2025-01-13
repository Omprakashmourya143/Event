// src/pages/EventBooking.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventBooking = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', tickets: 1 });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to load event details.');
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tickets`,
        { ...formData, eventId }
      );
      setSuccess('Booking successful!');
      setError(null);
    } catch (err) {
      setError('Failed to book the event.');
      setSuccess(null);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md">
      {event ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="mb-4">{event.description}</p>
          <p className="mb-4"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
          <p className="mb-4"><strong>Location:</strong> {event.location}</p>
          <p className="mb-4"><strong>Price:</strong> ${event.price}</p>

          <h2 className="text-2xl font-semibold mb-4">Book Your Tickets</h2>
          <form onSubmit={handleBooking} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
            <input
              type="number"
              name="tickets"
              placeholder="Number of Tickets"
              value={formData.tickets}
              onChange={handleChange}
              required
              min={1}
              className="w-full border p-2"
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Book Now
            </button>
          </form>

          {success && <p className="text-green-500 mt-4">{success}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventBooking;
