const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount, currency) => {
  const options = {
    amount: amount,
    currency: currency,
  };
  const order = await razorpay.orders.create(options);
  return order;
};

const verifyOrder = (order_id, payment_id, signature) => {
  const body = `${order_id}|${payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
};

module.exports = {
  createOrder,
  verifyOrder,
};
