const express = require('express');
const { initiatePayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, initiatePayment);

module.exports = router;
