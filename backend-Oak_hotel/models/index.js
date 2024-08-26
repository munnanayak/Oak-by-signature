const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Customer model
const Customer = sequelize.define('Customer', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  zipCode: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false // Disable automatic timestamp fields (createdAt, updatedAt)
});

// Payment model
const Payment = sequelize.define('Payment', {
  customerId: { type: DataTypes.INTEGER, allowNull: false },
  orderId: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false },
  paymentId: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false // Disable automatic timestamp fields (createdAt, updatedAt)
});

// Booking model
const Booking = sequelize.define('Booking', {
  customerId: { type: DataTypes.INTEGER, allowNull: false },
  checkInDate: { type: DataTypes.DATE, allowNull: false },
  checkOutDate: { type: DataTypes.DATE, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  breakfast: { type: DataTypes.STRING, allowNull: false, defaultValue: "N/A" },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false // Disable automatic timestamp fields (createdAt, updatedAt)
});

// Associations
Customer.hasMany(Payment, { foreignKey: 'customerId' });
Payment.belongsTo(Customer, { foreignKey: 'customerId' });

Customer.hasMany(Booking, { foreignKey: 'customerId' });
Booking.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = { Customer, Payment, Booking, sequelize };
