// routes/ticketRoutes.js
const express = require('express');
const { bookTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, bookTicket);

module.exports = router;
