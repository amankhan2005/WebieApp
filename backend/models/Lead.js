// models/Lead.js
// Lightweight "quick-capture" lead — used by high-intent landing pages
// (e.g. the ABA consulting page) where we only ask for Name, Phone, Email.
// Kept separate from ContactLead so the detailed contact-form flow is
// never affected and the two lead types can be triaged independently.

const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },

    // Optional qualifiers
    company: { type: String, trim: true, maxlength: 120, default: '' },
    state:   { type: String, trim: true, maxlength: 60,  default: '' },

    // Attribution / meta
    sourcePage: { type: String, trim: true, default: '/autism-consulting' },
    utmSource:  { type: String, trim: true, default: '' },
    utmMedium:  { type: String, trim: true, default: '' },
    utmCampaign:{ type: String, trim: true, default: '' },
    userAgent:  { type: String, default: '' },
    ipAddress:  { type: String, default: '' },

    // Workflow
    status: {
      type:    String,
      enum:    ['new', 'contacted', 'qualified', 'converted', 'closed'],
      default: 'new',
    },
    priority:  { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'HIGH' },
    notes:     { type: String, default: '' },
    contactedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON:     { virtuals: true },
  }
);

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
