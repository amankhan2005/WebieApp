// controllers/contactController.js

const ContactLead = require('../models/ContactLead');
const { sendContactAdminEmail, sendContactConfirmationEmail } = require('../services/emailService');
const { validate, contactSchema } = require('../validators/schemas');
const { AppError } = require('../middleware/errorHandler');

// ── Lead classification ───────────────────────────────────────────
function classifyLead(service, message) {
  const text     = `${service} ${message}`.toLowerCase();
  const isAutism = /autism|aba|clinic|therapy|bcba/.test(text);
  const isSaaS   = /saas|platform|software\s+product/.test(text);
  const priority = isAutism || isSaaS ? 'HIGH' : 'MEDIUM';

  let leadScore = 20;
  if (isAutism)             leadScore += 30;
  if (isSaaS)               leadScore += 25;
  if (message.length > 100) leadScore += 10;

  return { isAutism, priority, leadScore: Math.min(leadScore, 100) };
}

// POST /api/contact
async function submitContact(req, res, next) {
  try {
    // 1. Validate
    const data = validate(contactSchema, req.body);

    // 2. Classify lead
    const { isAutism, priority, leadScore } = classifyLead(data.service, data.message);

    // 3. Persist to MongoDB
    const lead = await ContactLead.create({
      ...data,
      sourcePage: req.headers.referer || '/contact',
      ipAddress:  req.ip || '',
      userAgent:  req.headers['user-agent'] || '',
      isAutism,
      priority,
      leadScore,
    });

    // 4. Send emails non-blocking — never fail the user response due to email issues
    Promise.allSettled([
      sendContactAdminEmail({
        name:       data.name,
        email:      data.email,
        phone:      data.phone,
        company:    data.company,
        service:    data.service,
        message:    data.message,
        sourcePage: lead.sourcePage,
        priority,
        isAutism,
      }),
      sendContactConfirmationEmail({
        name:    data.name,
        email:   data.email,
        service: data.service,
      }),
    ]).then(results => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`[EMAIL] Send #${i + 1} failed:`, r.reason?.message);
        }
      });
    });

    // 5. Respond
    res.status(201).json({
      success: true,
      message: "Thank you! We've received your message and will respond within 24 hours.",
      id:      lead._id,
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { submitContact };
