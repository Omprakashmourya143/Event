const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createEvent).get(getAllEvents); // POST and GET for /api/events
router
  .route('/:id')
  .get(getEventById) // GET for /api/events/:id
  .put(protect, admin, updateEvent) // PUT for /api/events/:id
  .delete(protect, admin, deleteEvent); // DELETE for /api/events/:id

module.exports = router;
