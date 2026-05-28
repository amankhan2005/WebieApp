// server/controllers/newsletterController.js
const { Newsletter }      = require('../models/OtherModels');
const { validate, newsletterSchema } = require('../validators/schemas');

async function subscribe(req, res, next) {
  try {
    const data = validate(newsletterSchema, req.body);

    await Newsletter.findOneAndUpdate(
      { email: data.email },
      { $set: { email: data.email, source: data.source, active: true, confirmedAt: new Date() } },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "You're subscribed! We'll keep you updated." });
  } catch (err) {
    next(err);
  }
}

module.exports = { subscribe };

// ─────────────────────────────────────────────────────────────────
// server/controllers/adminController.js (appended below for single export)

// All admin controllers are in this file.
// Routes are protected by requireAuth middleware.
const ContactLead = require('../models/ContactLead');
const { ChatLead } = require('../models/ChatModels');
const { Project, Testimonial } = require('../models/OtherModels');

// GET /api/admin/stats
async function getDashboardStats(req, res, next) {
  try {
    const [
      totalContacts,
      newContacts,
      totalChatLeads,
      highPriorityLeads,
      autismLeads,
      recentContacts,
    ] = await Promise.all([
      ContactLead.countDocuments(),
      ContactLead.countDocuments({ status: 'new' }),
      ChatLead.countDocuments(),
      Promise.all([
        ContactLead.countDocuments({ priority: 'HIGH' }),
        ChatLead.countDocuments({ priority: 'HIGH' }),
      ]).then(([a, b]) => a + b),
      Promise.all([
        ContactLead.countDocuments({ isAutism: true }),
        ChatLead.countDocuments({ isAutism: true }),
      ]).then(([a, b]) => a + b),
      ContactLead.find({ status: 'new' })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email service priority createdAt'),
    ]);

    res.json({
      success: true,
      stats: {
        totalContacts,
        newContacts,
        totalChatLeads,
        highPriorityLeads,
        autismLeads,
        recentContacts,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/admin/contacts?page=1&limit=20&status=new&priority=HIGH
async function getContacts(req, res, next) {
  try {
    const page   = Math.max(1, parseInt(req.query.page  || '1',  10));
    const limit  = Math.min(50, parseInt(req.query.limit || '20', 10));
    const filter = {};

    if (req.query.status)   filter.status   = req.query.status;
    if (req.query.priority) filter.priority  = req.query.priority;
    if (req.query.isAutism) filter.isAutism  = req.query.isAutism === 'true';

    const [contacts, total] = await Promise.all([
      ContactLead.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      ContactLead.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data:    contacts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/admin/chat-leads
async function getChatLeads(req, res, next) {
  try {
    const page  = Math.max(1, parseInt(req.query.page  || '1',  10));
    const limit = Math.min(50, parseInt(req.query.limit || '20', 10));
    const filter = {};

    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.isAutism) filter.isAutism  = req.query.isAutism === 'true';

    const [leads, total] = await Promise.all([
      ChatLead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      ChatLead.countDocuments(filter),
    ]);

    res.json({ success: true, data: leads, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/admin/contacts/:id/status
async function updateContactStatus(req, res, next) {
  try {
    const { status, notes } = req.body;
    const update = { status };
    if (notes)            update.notes     = notes;
    if (status === 'replied') update.repliedAt = new Date();

    const lead = await ContactLead.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
}

module.exports.adminController = {
  getDashboardStats,
  getContacts,
  getChatLeads,
  updateContactStatus,
};
