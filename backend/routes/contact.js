// server/routes/contact.js
const express  = require('express');
const router   = express.Router();
const { submitContact } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

// POST /api/contact
router.post('/', contactLimiter, submitContact);

module.exports = router;
