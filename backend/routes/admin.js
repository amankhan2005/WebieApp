// server/routes/admin.js
const express  = require('express');
const router   = express.Router();
const { requireAuth } = require('../middleware/auth');
const { adminLimiter } = require('../middleware/rateLimiter');
const { adminController } = require('../controllers/newsletterController');

// All admin routes require authentication
router.use(adminLimiter);
router.use(requireAuth);

// GET /api/admin/stats
router.get('/stats',         adminController.getDashboardStats);

// GET /api/admin/contacts
router.get('/contacts',      adminController.getContacts);

// PATCH /api/admin/contacts/:id/status
router.patch('/contacts/:id/status', adminController.updateContactStatus);

// GET /api/admin/chat-leads
router.get('/chat-leads',    adminController.getChatLeads);

module.exports = router;
