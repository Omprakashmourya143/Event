const express = require("express");
const { createBooking, getUserBookings, cancelBooking } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all user bookings
router.get("/", protect, getUserBookings);

// Create a new booking
router.post("/", protect, createBooking);

// Cancel a booking by its ID
router.delete("/:id", protect, cancelBooking);

module.exports = router;
