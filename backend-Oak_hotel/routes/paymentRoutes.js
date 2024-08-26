const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Route to create an order and save customer details
router.post('/api/v1/checkout', paymentController.createOrder);

// Route to verify an order
router.post('/api/v1/paymentverification', paymentController.verifyOrder);

// Route to get Razorpay key
router.get('/api/getkey', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;
