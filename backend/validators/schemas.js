// validators/schemas.js
// Contact form validation schema using Zod.

const { z }          = require('zod');
const { AppError }   = require('../middleware/errorHandler');

function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const messages = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
    throw new AppError(messages.join(' | '), 400, 'VALIDATION_ERROR');
  }
  return result.data;
}

const CONTACT_SERVICES = [
  'Website Development',
  'SaaS Development',
  'Search Engine Optimization',
  'Digital Marketing',
  'Social Media Management',
  'UI/UX Design',
  'Autism & ABA Consulting',
  'Multiple Services',
  'Other / Not Sure Yet',
];

const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(120).trim(),
  email:   z.string().email('Invalid email address').max(254).trim().toLowerCase(),
  phone:   z.string().max(30).trim().optional().default(''),
  company: z.string().max(120).trim().optional().default(''),
  service: z.enum(CONTACT_SERVICES, { errorMap: () => ({ message: 'Please select a valid service' }) }),
  message: z.string().min(15, 'Message must be at least 15 characters').max(5000).trim(),
});

// ── Quick-capture lead (landing pages) ─────────────────────────────
// Name + Phone + Email are required; company/state are optional.
// `website` is a honeypot — real users never fill it. If it arrives
// populated, the controller silently drops the submission as spam.
const phoneRegex = /^[+()\-.\s\d]{7,30}$/;

const leadSchema = z.object({
  name:  z.string().min(2, 'Please enter your full name').max(120).trim(),
  email: z.string().email('Please enter a valid email address').max(254).trim().toLowerCase(),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(30)
           .regex(phoneRegex, 'Please enter a valid phone number'),

  company: z.string().max(120).trim().optional().default(''),
  state:   z.string().max(60).trim().optional().default(''),

  // Attribution (optional, sent by the client)
  sourcePage:  z.string().max(200).trim().optional().default('/autism-consulting'),
  utmSource:   z.string().max(120).trim().optional().default(''),
  utmMedium:   z.string().max(120).trim().optional().default(''),
  utmCampaign: z.string().max(120).trim().optional().default(''),

  // Honeypot — must be empty
  website: z.string().max(0, 'Spam detected').optional().default(''),
});

module.exports = { validate, contactSchema, leadSchema, CONTACT_SERVICES };
