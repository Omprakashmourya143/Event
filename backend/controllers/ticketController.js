// controllers/ticketController.js
const Ticket = require('../models/Ticket');

const bookTicket = async (req, res) => {
  const { eventId, name, email, tickets } = req.body;

  try {
    const ticket = await Ticket.create({
      event: eventId,
      user: req.user._id,
      name,
      email,
      tickets,
      isPaid: false,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Ticket booking failed', error: error.message });
  }
};

module.exports = { bookTicket };
