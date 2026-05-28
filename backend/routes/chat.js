// server/routes/chat.js
const express  = require('express');
const router   = express.Router();
const { initChat, sendMessage, saveChatLead } = require('../controllers/chatController');
const { chatLimiter } = require('../middleware/rateLimiter');

// GET /api/chat/init?page=/
router.get('/init', initChat);

// POST /api/chat/message
router.post('/message', chatLimiter, sendMessage);

// POST /api/chat/lead
router.post('/lead', chatLimiter, saveChatLead);

module.exports = router;
