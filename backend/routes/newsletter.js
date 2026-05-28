// server/routes/newsletter.js
const express = require('express');
const router  = express.Router();
const { subscribe } = require('../controllers/newsletterController');
const { newsletterLimiter } = require('../middleware/rateLimiter');

router.post('/', newsletterLimiter, subscribe);
module.exports = router;
