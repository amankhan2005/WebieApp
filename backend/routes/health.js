// routes/health.js

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const ENV      = require('../config/env');

router.get('/', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status:    'ok',
    service:   'WebieApp Solutions API',
    env:       ENV.NODE_ENV,
    database:  states[mongoose.connection.readyState] || 'unknown',
    timestamp: new Date().toISOString(),
    uptime:    Math.floor(process.uptime()),
  });
});

module.exports = router;
