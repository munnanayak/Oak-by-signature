const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Route to create a booking
router.post('/api/v1/bookings', bookingController.createBooking);

module.exports = router;
