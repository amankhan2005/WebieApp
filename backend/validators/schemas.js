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

module.exports = { validate, contactSchema };
