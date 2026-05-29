// routes/index.js
// Central route registry.

const express = require('express');
const router  = express.Router();

router.use('/contact', require('./contact'));
router.use('/health',  require('./health'));

module.exports = router;
