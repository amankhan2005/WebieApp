// server/models/ChatLead.js

const mongoose = require('mongoose');

const chatLeadSchema = new mongoose.Schema(
  {
    // Captured contact fields (filled progressively during chat)
    name:              { type: String, trim: true,    default: '' },
    email:             { type: String, trim: true,    lowercase: true, default: '' },
    phone:             { type: String, trim: true,    default: '' },
    companyName:       { type: String, trim: true,    default: '' },
    serviceInterested: { type: String, trim: true,    default: '' },
    country:           { type: String, trim: true,    default: '' },
    state:             { type: String, trim: true,    default: '' },
    timeline:          { type: String, trim: true,    default: '' },
    budget:            { type: String, trim: true,    default: '' },

    // Session meta
    sessionId:  { type: String, required: true, index: true },
    sourcePage: { type: String, default: '/' },
    userAgent:  { type: String, default: '' },

    // AI analysis
    chatSummary: { type: String, default: '' },   // last 6 messages summarised
    leadScore:   { type: Number, min: 0, max: 100, default: 0 },
    priority:    { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'LOW' },
    isAutism:    { type: Boolean, default: false },

    // Workflow
    status: {
      type:    String,
      enum:    ['new', 'contacted', 'qualified', 'converted', 'closed'],
      default: 'new',
    },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

chatLeadSchema.index({ email: 1 });
chatLeadSchema.index({ priority: 1, createdAt: -1 });
chatLeadSchema.index({ isAutism: 1, status: 1 });

// ── ChatHistory ────────────────────────────────────────────────────
const messageSchema = new mongoose.Schema(
  {
    role:      { type: String, enum: ['user', 'assistant'], required: true },
    content:   { type: String, required: true, maxlength: 8000 },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatHistorySchema = new mongoose.Schema(
  {
    sessionId:    { type: String, required: true, unique: true },
    sourcePage:   { type: String, default: '/' },
    messages:     { type: [messageSchema], default: [] },
    leadCaptured: { type: Boolean, default: false },
    leadId:       { type: mongoose.Schema.Types.ObjectId, ref: 'ChatLead', default: null },
    totalTokens:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

chatHistorySchema.index({ sessionId: 1 });
chatHistorySchema.index({ leadId: 1 });
chatHistorySchema.index({ createdAt: -1 });

module.exports = {
  ChatLead:    mongoose.model('ChatLead',    chatLeadSchema),
  ChatHistory: mongoose.model('ChatHistory', chatHistorySchema),
};
