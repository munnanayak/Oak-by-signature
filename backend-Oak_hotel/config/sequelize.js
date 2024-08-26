const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: '+00:00',
  }
);

sequelize.authenticate().then(() => {
  console.log('Connected to DB.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
