// server/app.js
// Express application setup.
// Middleware order matters — security first, then logging, then routes, then errors.

const express         = require('express');
const cors            = require('cors');
const helmet          = require('helmet');
const morgan          = require('morgan');
const compression     = require('compression');
const mongoSanitize   = require('express-mongo-sanitize');
const ENV             = require('./config/env');
const routes          = require('./routes/index');
const { apiLimiter }  = require('./middleware/rateLimiter');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// ── 1. Security headers ───────────────────────────────────────────
// Helmet sets secure HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false, // disabled — frontend handles its own CSP
}));

// ── 2. CORS ───────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  ENV.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://webieapp.com',
  'https://www.webieapp.com',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  methods:          ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders:   ['Content-Type', 'Authorization', 'x-admin-key'],
  credentials:      true,
  optionsSuccessStatus: 200,
}));

// ── 3. Request parsing ────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ── 4. MongoDB query sanitization ────────────────────────────────
// Strips $ and . from inputs to prevent NoSQL injection
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize:  ({ req, key }) => {
    console.warn(`[SECURITY] Sanitized field '${key}' in request from ${req.ip}`);
  },
}));

// ── 5. Response compression ───────────────────────────────────────
app.use(compression());

// ── 6. Request logging ────────────────────────────────────────────
if (ENV.IS_DEV) {
  app.use(morgan('dev'));
} else {
  // Production: structured log (timestamp, method, url, status, response-time)
  app.use(morgan(':date[iso] :method :url :status :response-time ms'));
}

// ── 7. Trust proxy (for correct IP behind Nginx/load balancer) ───
app.set('trust proxy', 1);

// ── 8. Global rate limiter ────────────────────────────────────────
app.use('/api', apiLimiter);

// ── 9. API routes ─────────────────────────────────────────────────
app.use('/api', routes);

// ── 10. Root route ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name:    'WebieApp Solutions LLC — API',
    version: '1.0.0',
    status:  'running',
    docs:    '/api/health',
  });
});

// ── 11. 404 handler ───────────────────────────────────────────────
app.use(notFound);

// ── 12. Global error handler (MUST be last) ───────────────────────
app.use(errorHandler);

module.exports = app;
