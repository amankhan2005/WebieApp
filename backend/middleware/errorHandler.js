// server/middleware/errorHandler.js
// Centralised error handling — catches everything thrown in controllers.
// Returns consistent JSON error shapes. Never leaks stack traces in production.

const ENV = require('../config/env');

class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 404 handler — place before errorHandler in app.js
function notFound(req, res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND'));
}

// Global error handler — must be last middleware in app.js
function errorHandler(err, req, res, next) {
  const isDev = ENV.IS_DEV;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      errors: messages,
    });
  }

  // Mongoose duplicate key (e.g., unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      code: 'DUPLICATE_ERROR',
      message: `This ${field} is already registered.`,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, code: 'INVALID_TOKEN', message: 'Invalid token.' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, code: 'TOKEN_EXPIRED', message: 'Token expired.' });
  }

  // Our operational errors
  const statusCode = err.isOperational ? err.statusCode : 500;
  const code       = err.isOperational ? err.code       : 'INTERNAL_ERROR';
  const message    = err.isOperational ? err.message    : 'An unexpected error occurred.';

  if (!err.isOperational) {
    console.error('[ERROR] Unexpected error:', err);
  }

  res.status(statusCode).json({
    success: false,
    code,
    message,
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = { AppError, notFound, errorHandler };
