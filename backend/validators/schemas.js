// server/validators/schemas.js
// All Zod schemas in one place.
// Controllers call validate(schema, req.body) to get clean, typed data.

const { z } = require('zod');
const { AppError } = require('../middleware/errorHandler');

// ── Helper: run a schema and throw AppError on failure ────────────
function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const messages = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
    throw new AppError(messages.join(' | '), 400, 'VALIDATION_ERROR');
  }
  return result.data;
}

// ── Contact form ──────────────────────────────────────────────────
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
  name:    z.string().min(2,  'Name must be at least 2 characters').max(120).trim(),
  email:   z.string().email('Invalid email address').max(254).trim().toLowerCase(),
  phone:   z.string().max(30).trim().optional().default(''),
  company: z.string().max(120).trim().optional().default(''),
  service: z.enum(CONTACT_SERVICES, { errorMap: () => ({ message: 'Please select a valid service' }) }),
  message: z.string().min(15, 'Message must be at least 15 characters').max(5000).trim(),
});

// ── Newsletter ─────────────────────────────────────────────────────
const newsletterSchema = z.object({
  email:  z.string().email('Invalid email address').max(254).trim().toLowerCase(),
  source: z.string().max(50).optional().default('footer'),
});

// ── Chat message ──────────────────────────────────────────────────
const chatMessageSchema = z.object({
  sessionId:  z.string().min(1).max(100),
  content:    z.string().min(1, 'Message cannot be empty').max(2000).trim(),
  sourcePage: z.string().max(200).optional().default('/'),
});

// ── Chat lead capture ─────────────────────────────────────────────
const chatLeadSchema = z.object({
  sessionId:         z.string().min(1).max(100),
  name:              z.string().max(120).trim().optional().default(''),
  email:             z.string().email().max(254).trim().toLowerCase().optional().or(z.literal('')).default(''),
  phone:             z.string().max(30).trim().optional().default(''),
  companyName:       z.string().max(120).trim().optional().default(''),
  serviceInterested: z.string().max(100).trim().optional().default(''),
  country:           z.string().max(80).trim().optional().default(''),
  state:             z.string().max(80).trim().optional().default(''),
  timeline:          z.string().max(200).trim().optional().default(''),
  budget:            z.string().max(200).trim().optional().default(''),
  sourcePage:        z.string().max(200).optional().default('/'),
  chatSummary:       z.string().max(4000).optional().default(''),
  leadScore:         z.number().min(0).max(100).optional().default(0),
  priority:          z.enum(['HIGH', 'MEDIUM', 'LOW']).optional().default('LOW'),
  isAutism:          z.boolean().optional().default(false),
});

// ── Admin login ───────────────────────────────────────────────────
const adminLoginSchema = z.object({
  email:    z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
});

module.exports = {
  validate,
  contactSchema,
  newsletterSchema,
  chatMessageSchema,
  chatLeadSchema,
  adminLoginSchema,
};
