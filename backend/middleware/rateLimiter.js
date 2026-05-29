// middleware/rateLimiter.js
// Rate limiters for contact form (strict) and general API (standard).

const rateLimit = require('express-rate-limit');
const ENV       = require('../config/env');

function makeRateLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders:   false,
    message: {
      success: false,
      code:    'RATE_LIMIT_EXCEEDED',
      message,
    },
    handler: (req, res, next, options) => {
      res.status(429).json(options.message);
    },
  });
}

// Contact form — strict: 5 submissions per hour per IP
const contactLimiter = makeRateLimiter({
  windowMs: 60 * 60 * 1000,
  max:      ENV.CONTACT_RATE_LIMIT_MAX,
  message:  'Too many contact submissions. Please try again in an hour.',
});

// General API — 100 per 15 min
const apiLimiter = makeRateLimiter({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max:      ENV.RATE_LIMIT_MAX,
  message:  'Too many requests. Please slow down.',
});

module.exports = { contactLimiter, apiLimiter };
