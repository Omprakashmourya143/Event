import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="border p-4 min-h-52 rounded shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="truncate text-gray-700 mb-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {event.description}
        </p>
        <p><strong>Date :</strong> {new Date(event.date).toDateString()}</p>
        <p><strong>Price :</strong> ${event.price}</p>
      </div>
      <div className="flex justify-center mt-4">
        <Link
          to={`/events/${event._id}`}
          className="bg-gray-800 text-white py-2 px-4 hover:bg-gray-200 hover:text-gray-900 rounded-md hover:border-2 hover:border-gray-800"
        >
          View & Book
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
