import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto text-center p-8">
      <div className="bg-white shadow-md rounded-md p-6 w-auto flex flex-col align-middle">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="mb-4">{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <button
          onClick={() => navigate(`/book/${eventId}`)}
          className="bg-gray-800 text-white py-2 px-4 w-36 mx-auto mt-2 rounded-md"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
