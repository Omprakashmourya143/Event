const Booking = require("../models/Booking");
const Event = require("../models/Event");

const createBooking = async (req, res) => {
  const { eventId, name, email, tickets } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const booking = await Booking.create({
      event: eventId,
      user: req.user._id,
      name,
      email,
      tickets,
    });

    res.status(201).json({
      message: "Booking successful!",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// Get all bookings for the logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("event");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

// Cancel a booking by its ID
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find and delete the booking
    const booking = await Booking.findOneAndDelete({
      _id: bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or unauthorized" });
    }

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking", error: err.message });
  }   
};

module.exports = { createBooking, getUserBookings, cancelBooking };
