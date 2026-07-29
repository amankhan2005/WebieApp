// controllers/leadController.js
// Handles quick-capture leads from high-intent landing pages
// (Name / Phone / Email). Independent of the detailed contact flow.

const Lead = require('../models/Lead');
const { sendLeadAdminEmail, sendLeadConfirmationEmail } = require('../services/emailService');
const { validate, leadSchema } = require('../validators/schemas');

// POST /api/lead
async function submitLead(req, res, next) {
  try {
    // 1. Validate + sanitize (Zod trims/normalizes)
    const data = validate(leadSchema, req.body);

    // 2. Honeypot — pretend success so bots don't retry, but store nothing.
    if (data.website && data.website.length > 0) {
      return res.status(201).json({
        success: true,
        message: 'Thank you! We will be in touch shortly.',
      });
    }
    delete data.website;

    // 3. Persist
    const lead = await Lead.create({
      ...data,
      sourcePage: data.sourcePage || req.headers.referer || '/autism-consulting',
      ipAddress:  req.ip || '',
      userAgent:  req.headers['user-agent'] || '',
      priority:   'HIGH', // landing-page leads are high-intent by default
    });

    // 4. Fire emails without blocking the response.
    Promise.allSettled([
      sendLeadAdminEmail({
        name:       data.name,
        email:      data.email,
        phone:      data.phone,
        company:    data.company,
        state:      data.state,
        sourcePage: lead.sourcePage,
        utmSource:  data.utmSource,
        utmMedium:  data.utmMedium,
        utmCampaign:data.utmCampaign,
      }),
      sendLeadConfirmationEmail({
        name:  data.name,
        email: data.email,
      }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`[EMAIL] Lead send #${i + 1} failed:`, r.reason?.message);
        }
      });
    });

    // 5. Respond
    res.status(201).json({
      success: true,
      message: "Thank you! We've received your details and will call you within one business day.",
      id:      lead._id,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitLead };
