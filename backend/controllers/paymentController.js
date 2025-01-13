const Payment = require('../models/Payment');

const initiatePayment = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;

    const payment = new Payment({
      user: req.user._id,
      amount,
      paymentMethod,
      status: 'Pending',
    });

    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { initiatePayment };
