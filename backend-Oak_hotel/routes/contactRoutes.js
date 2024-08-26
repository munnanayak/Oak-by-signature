const express = require('express');
const { storeContactInfo } = require('../controllers/contactController');
const router = express.Router();

router.post('/api/v1/contact', storeContactInfo);

module.exports = router;
