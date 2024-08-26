const { Customer, Payment } = require('../models');
const paymentService = require('../services/paymentService');
const logger = require('../utils/logger');

const createOrder = async (req, res) => {
  try {
    const { customerDetails, amount, currency } = req.body;

    // Save customer details
    const customer = await Customer.create(customerDetails);

    // Create Razorpay order
    const order = await paymentService.createOrder(amount, currency);

    // Save order details
    await Payment.create({
      customerId: customer.id,
      orderId: order.id,
      amount: amount / 100,
      currency,
      status: 'pending',
    });

    logger.info(`Order created: ${order.id}`);
    res.status(200).json({ order, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const isValid = paymentService.verifyOrder(order_id, payment_id, signature);

    if (isValid) {
      const payment = await Payment.findOne({ where: { orderId: order_id } });
      payment.paymentId = payment_id;
      payment.status = 'completed';
      await payment.save();

      logger.info(`Order verified: ${order_id}`);
      res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      logger.warn(`Order verification failed: ${order_id}`);
      res.status(400).json({ error: 'Invalid payment signature' });
    }
  } catch (error) {
    logger.error(`Error verifying order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  verifyOrder,
};
