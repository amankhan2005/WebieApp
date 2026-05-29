// models/ContactLead.js

const mongoose = require('mongoose');

const contactLeadSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 120 },
    email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone:   { type: String, trim: true, maxlength: 30,  default: '' },
    company: { type: String, trim: true, maxlength: 120, default: '' },
    service: {
      type: String,
      required: true,
      enum: [
        'Website Development',
        'SaaS Development',
        'Search Engine Optimization',
        'Digital Marketing',
        'Social Media Management',
        'UI/UX Design',
        'Autism & ABA Consulting',
        'Multiple Services',
        'Other / Not Sure Yet',
      ],
    },
    message: { type: String, required: true, trim: true, maxlength: 5000 },

    // Meta
    sourcePage: { type: String, trim: true, default: '/contact' },
    userAgent:  { type: String, default: '' },
    ipAddress:  { type: String, default: '' },

    // Classification
    isAutism:  { type: Boolean, default: false },
    priority:  { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'MEDIUM' },
    leadScore: { type: Number, min: 0, max: 100, default: 0 },

    // Workflow
    status: {
      type:    String,
      enum:    ['new', 'read', 'replied', 'converted', 'closed'],
      default: 'new',
    },
    notes:     { type: String, default: '' },
    repliedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON:     { virtuals: true },
  }
);

contactLeadSchema.index({ email: 1 });
contactLeadSchema.index({ status: 1, createdAt: -1 });
contactLeadSchema.index({ priority: 1, createdAt: -1 });
contactLeadSchema.index({ isAutism: 1 });

module.exports = mongoose.model('ContactLead', contactLeadSchema);
