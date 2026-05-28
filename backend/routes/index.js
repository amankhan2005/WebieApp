// server/routes/index.js
// Central route registry — imports all sub-routers

const express = require('express');
const router  = express.Router();

router.use('/contact',    require('./contact'));
router.use('/chat',       require('./chat'));
router.use('/newsletter', require('./newsletter'));
router.use('/admin',      require('./admin'));
router.use('/health',     require('./health'));

module.exports = router;
