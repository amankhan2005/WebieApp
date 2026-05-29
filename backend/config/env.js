const dotenv = require('dotenv');
dotenv.config();

function optional(key, defaultValue = '') {
  return (process.env[key] || defaultValue).trim();
}

function required(key) {
  const val = process.env[key]?.trim();
  if (!val) throw new Error(`[ENV] Missing required env var: ${key}`);
  return val;
}

const ENV = {
  // ── Server ─────────────────────────────────────────────────────
  NODE_ENV: optional('NODE_ENV', 'development'),
  PORT:     parseInt(optional('PORT', '5001'), 10),
  IS_PROD:  optional('NODE_ENV', 'development') === 'production',
  IS_DEV:   optional('NODE_ENV', 'development') === 'development',

  // ── Database ───────────────────────────────────────────────────
  MONGODB_URI: required('MONGODB_URI'),

  // ── Email (Resend) ─────────────────────────────────────────────
  RESEND_API_KEY: required('RESEND_API_KEY'),
  ADMIN_EMAIL:    required('ADMIN_EMAIL'),
  FROM_EMAIL:     required('FROM_EMAIL'),
  FROM_NAME:      required('FROM_NAME'),

  // ── Frontend ───────────────────────────────────────────────────
  FRONTEND_URL: required('FRONTEND_URL'),

  // ── Rate limiting ──────────────────────────────────────────────
  RATE_LIMIT_WINDOW_MS:   parseInt(optional('RATE_LIMIT_WINDOW_MS', '900000'), 10),
  RATE_LIMIT_MAX:         parseInt(optional('RATE_LIMIT_MAX', '100'), 10),
  CONTACT_RATE_LIMIT_MAX: parseInt(optional('CONTACT_RATE_LIMIT_MAX', '5'), 10),
};

module.exports = ENV;