// server/middleware/auth.js
// Two auth strategies:
// 1. JWT Bearer token (for admin dashboard SPA)
// 2. Static admin secret key (for simple API access / testing)

const jwt  = require('jsonwebtoken');
const ENV  = require('../config/env');
const { AppError } = require('./errorHandler');

// ── JWT auth ──────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Strategy 1: Bearer JWT
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      req.admin = decoded;
      return next();
    } catch (err) {
      return next(new AppError('Invalid or expired token.', 401, 'AUTH_FAILED'));
    }
  }

  // Strategy 2: Static admin key header (for internal/testing use)
  const adminKey = req.headers['x-admin-key'];
  if (adminKey && adminKey === ENV.ADMIN_SECRET_KEY) {
    req.admin = { role: 'admin', method: 'static-key' };
    return next();
  }

  return next(new AppError('Authentication required.', 401, 'AUTH_REQUIRED'));
}

// ── Token generation ──────────────────────────────────────────────
function generateToken(payload) {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });
}

// ── Role guard ────────────────────────────────────────────────────
function requireRole(role) {
  return (req, res, next) => {
    if (!req.admin) return next(new AppError('Not authenticated.', 401, 'AUTH_REQUIRED'));
    const roleHierarchy = { super_admin: 3, admin: 2, viewer: 1 };
    if ((roleHierarchy[req.admin.role] || 0) < (roleHierarchy[role] || 0)) {
      return next(new AppError('Insufficient permissions.', 403, 'FORBIDDEN'));
    }
    next();
  };
}

module.exports = { requireAuth, generateToken, requireRole };
