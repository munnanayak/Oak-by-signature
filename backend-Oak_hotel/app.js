const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes'); // Import contact routes
const sequelize = require('./config/sequelize');

const app = express();

// Configure CORS to allow requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Parse JSON request body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`Server running successfully at port ${process.env.APP_PORT} on ${process.env.NODE_ENV}`);
});

app.use(paymentRoutes);
app.use(bookingRoutes);
app.use(contactRoutes); // Add contact routes

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.APP_PORT, () => {
    logger.info(`App running on port ${process.env.APP_PORT}...`);
  });
}).catch((error) => {
  logger.error(`Error syncing database: ${error.message}`);
  logger.error(error.stack); // Log stack trace
  process.exit(1); // Exit the process with an error code
});

module.exports = app;
