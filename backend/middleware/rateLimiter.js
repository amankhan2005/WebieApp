// server/middleware/rateLimiter.js
// Different limits for different endpoint sensitivity:
// - contact form: very tight (5/hour) — prevent spam
// - chat: moderate (60/15min) — allow natural conversation
// - general API: standard (100/15min)
// - admin: tighter (30/15min) — prevent brute force

const rateLimit = require('express-rate-limit');
const ENV       = require('../config/env');

function makeRateLimiter({ windowMs, max, message, skipSuccessfulRequests = false }) {
  return rateLimit({
    windowMs,
    max,
    skipSuccessfulRequests,
    standardHeaders: true,  // Return RateLimit headers
    legacyHeaders:   false, // Disable X-RateLimit-* headers
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

// Contact form — very strict: 5 submissions per hour per IP
const contactLimiter = makeRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max:      ENV.CONTACT_RATE_LIMIT_MAX,
  message:  'Too many contact submissions. Please try again in an hour.',
});

// Chat messages — 60 per 15 minutes per IP
const chatLimiter = makeRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max:      ENV.CHAT_RATE_LIMIT_MAX,
  message:  'Too many chat requests. Please wait a moment.',
});

// Newsletter — 3 per hour per IP
const newsletterLimiter = makeRateLimiter({
  windowMs: 60 * 60 * 1000,
  max:      3,
  message:  'Too many newsletter signup attempts.',
});

// General API — 100 per 15 min
const apiLimiter = makeRateLimiter({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max:      ENV.RATE_LIMIT_MAX,
  message:  'Too many requests. Please slow down.',
});

// Admin routes — 30 per 15 min
const adminLimiter = makeRateLimiter({
  windowMs: 15 * 60 * 1000,
  max:      30,
  message:  'Too many admin requests.',
});

module.exports = { contactLimiter, chatLimiter, newsletterLimiter, apiLimiter, adminLimiter };
