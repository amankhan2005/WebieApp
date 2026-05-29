// app.js
// Express application setup.
// Middleware order: security → CORS → parsing → logging → rate limit → routes → errors.

const express        = require('express');
const cors           = require('cors');
const helmet         = require('helmet');
const morgan         = require('morgan');
const ENV            = require('./config/env');
const routes         = require('./routes/index');
const { apiLimiter } = require('./middleware/rateLimiter');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// ── 1. Security headers ───────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
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
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  methods:          ['GET', 'POST', 'OPTIONS'],
  allowedHeaders:   ['Content-Type'],
  credentials:      true,
  optionsSuccessStatus: 200,
}));

// ── 3. Request parsing ────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ── 4. Request logging ────────────────────────────────────────────
if (ENV.IS_DEV) {
  app.use(morgan('dev'));
} else {
  app.use(morgan(':date[iso] :method :url :status :response-time ms'));
}

// ── 5. Trust proxy (correct IP behind Nginx/load balancer) ───────
app.set('trust proxy', 1);

// ── 6. Global rate limiter ────────────────────────────────────────
app.use('/api', apiLimiter);

// ── 7. API routes ─────────────────────────────────────────────────
app.use('/api', routes);

// ── 8. Root ───────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name:    'WebieApp Solutions LLC — API',
    version: '2.0.0',
    status:  'running',
    docs:    '/api/health',
    routes:  ['POST /api/contact', 'GET /api/health'],
  });
});

// ── 9. 404 ────────────────────────────────────────────────────────
app.use(notFound);

// ── 10. Error handler (must be last) ─────────────────────────────
app.use(errorHandler);

module.exports = app;
