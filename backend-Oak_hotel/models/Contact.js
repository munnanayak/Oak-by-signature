const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Contact model
const Contact = sequelize.define('Contact', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
}, {
  timestamps: true,
  createdAt: 'createdAt', // Rename createdAt
  updatedAt: false, // Disable updatedAt
});

module.exports = Contact;
