// server/models/Newsletter.js
const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
  {
    email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
    active:      { type: Boolean, default: true },
    source:      { type: String, default: 'footer' },
    confirmedAt: { type: Date },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
);

newsletterSchema.index({ email: 1 }, { unique: true });
newsletterSchema.index({ active: 1 });

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// ── Project ───────────────────────────────────────────────────────
const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    categories:  { type: [String], required: true },
    description: { type: String, required: true },
    longDesc:    { type: String, default: '' },
    tech:        { type: [String], default: [] },
    results:     { type: String, default: '' },
    imageUrl:    { type: String, default: '' },
    liveUrl:     { type: String, default: '' },
    featured:    { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
    year:        { type: String, default: '' },
    published:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ categories: 1, featured: -1, order: 1 });
projectSchema.index({ slug: 1 }, { unique: true });

const Project = mongoose.model('Project', projectSchema);

// ── Testimonial ───────────────────────────────────────────────────
const testimonialSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    role:     { type: String, required: true, trim: true },
    company:  { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    avatar:   { type: String, default: '' },
    rating:   { type: Number, min: 1, max: 5, default: 5 },
    text:     { type: String, required: true, maxlength: 1000 },
    service:  { type: String, default: '' },
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// ── Admin User ────────────────────────────────────────────────────
const adminSchema = new mongoose.Schema(
  {
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name:         { type: String, required: true, trim: true },
    role:         { type: String, enum: ['super_admin', 'admin', 'viewer'], default: 'admin' },
    lastLoginAt:  { type: Date },
    active:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Newsletter, Project, Testimonial, Admin };
