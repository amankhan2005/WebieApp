// routes/lead.js
// Quick-capture lead endpoint for landing pages.

const express  = require('express');
const router   = express.Router();
const { submitLead }     = require('../controllers/leadController');
const { contactLimiter } = require('../middleware/rateLimiter');

// POST /api/lead — reuse the strict per-IP limiter (5/hour) used for contact.
router.post('/', contactLimiter, submitLead);

module.exports = router;
