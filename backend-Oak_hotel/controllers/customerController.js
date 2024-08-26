// controllers/customerController.js
const { Customer } = require('../models');

const submitCustomerDetails = async (req, res) => {
  try {
    const customerDetails = req.body;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'address', 'city', 'zipCode', 'country'];
    for (const field of requiredFields) {
      if (!customerDetails[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    
    // Save customer details
    const customer = await Customer.create(customerDetails);
    
    res.status(201).json({ message: 'Customer details saved successfully.', customerId: customer.id });
  } catch (error) {
    console.error('Error saving customer details:', error);
    res.status(500).json({ error: 'Error saving customer details' });
  }
};

module.exports = {
  submitCustomerDetails,
};
