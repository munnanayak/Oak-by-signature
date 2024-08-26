const Contact = require('../models/Contact');

exports.storeContactInfo = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, message } = req.body;

    if (!fullName || !email || !phoneNumber || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = await Contact.create({
      fullName,
      email,
      phoneNumber,
      message,
    });

    return res.status(201).json({ message: 'Contact information stored successfully', contact: newContact });
  } catch (error) {
    console.error('Error storing contact information:', error);
    return res.status(500).json({ message: 'Failed to store contact information' });
  }
};
