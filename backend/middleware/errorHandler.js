// middleware/errorHandler.js
// Centralised error handling — consistent JSON error shapes, no stack traces in production.

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

function notFound(req, res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND'));
}

function errorHandler(err, req, res, next) {
  const isDev = ENV.IS_DEV;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      code:    'VALIDATION_ERROR',
      message: 'Validation failed',
      errors:  messages,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      code:    'DUPLICATE_ERROR',
      message: `This ${field} is already registered.`,
    });
  }

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
