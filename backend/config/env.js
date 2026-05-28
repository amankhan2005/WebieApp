// server/config/env.js
// Loads and validates all environment variables at startup.
// The app fails immediately with a clear message if required vars are missing —
// better than mysterious failures deep in business logic.

const dotenv = require('dotenv');

dotenv.config();

function required(key) {
  const val = process.env[key];
  if (!val || val.trim() === '') {
    throw new Error(`[ENV] Missing required environment variable: ${key}`);
  }
  return val.trim();
}

function optional(key, defaultValue = '') {
  return (process.env[key] || defaultValue).trim();
}

const ENV = {
  // ── Server ──────────────────────────────────────────────
  NODE_ENV:   optional('NODE_ENV', 'development'),
  PORT:       parseInt(optional('PORT', '5000'), 10),
  IS_PROD:    optional('NODE_ENV', 'development') === 'production',
  IS_DEV:     optional('NODE_ENV', 'development') === 'development',

  // ── Database ─────────────────────────────────────────────
  MONGODB_URI: optional('MONGODB_URI', 'mongodb://localhost:27017/webieapp'),

  // ── Email (Resend) ────────────────────────────────────────
  RESEND_API_KEY:  optional('RESEND_API_KEY', ''),
  ADMIN_EMAIL:     optional('ADMIN_EMAIL', 'hello@webieapp.com'),
  FROM_EMAIL:      optional('FROM_EMAIL', 'noreply@webieapp.com'),
  FROM_NAME:       optional('FROM_NAME', 'WebieApp Solutions'),

  // ── AI ────────────────────────────────────────────────────
  ANTHROPIC_API_KEY: optional('ANTHROPIC_API_KEY', ''),

  // ── Auth ─────────────────────────────────────────────────
  JWT_SECRET:      optional('JWT_SECRET', 'dev-secret-change-in-production'),
  JWT_EXPIRES_IN:  optional('JWT_EXPIRES_IN', '7d'),
  ADMIN_SECRET_KEY: optional('ADMIN_SECRET_KEY', 'dev-admin-key'),

  // ── Frontend ──────────────────────────────────────────────
  FRONTEND_URL:    optional('FRONTEND_URL', 'http://localhost:5173'),

  // ── Rate limiting ─────────────────────────────────────────
  RATE_LIMIT_WINDOW_MS:   parseInt(optional('RATE_LIMIT_WINDOW_MS', '900000'),  10), // 15 min
  RATE_LIMIT_MAX:         parseInt(optional('RATE_LIMIT_MAX', '100'),           10),
  CONTACT_RATE_LIMIT_MAX: parseInt(optional('CONTACT_RATE_LIMIT_MAX', '5'),     10),
  CHAT_RATE_LIMIT_MAX:    parseInt(optional('CHAT_RATE_LIMIT_MAX', '60'),        10),
};

module.exports = ENV;
