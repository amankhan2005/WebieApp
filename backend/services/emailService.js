// server/services/emailService.js
// All outbound emails go through here.
// Templates are self-contained HTML — no external CSS framework needed.
// Design matches WebieApp brand: dark bg, #00C8A8 teal, Sora/Inter fonts.

const { Resend } = require('resend');
const ENV        = require('../config/env');

// Lazy instantiation — avoids crash when RESEND_API_KEY is not set (dev mode)
let _resend = null;
function getResend() {
  if (!_resend) {
    if (!ENV.RESEND_API_KEY) {
      console.warn('[EMAIL] RESEND_API_KEY not set — emails will be logged only');
      return null;
    }
    _resend = new Resend(ENV.RESEND_API_KEY);
  }
  return _resend;
}

// Wrapper that gracefully skips sending in dev without API key
async function sendEmail(params) {
  const client = getResend();
  if (!client) {
    console.log('[EMAIL DEV] Would send email:', JSON.stringify(params, null, 2));
    return { id: 'dev-mode-no-send' };
  }
  return client.emails.send(params);
}

// ── Shared brand styles ────────────────────────────────────────────
const BRAND = {
  primary:    '#00C8A8',
  dark:       '#080B0F',
  darkCard:   '#0F1419',
  darkBorder: '#1E2835',
  textPrimary:'#F8FAFC',
  textMuted:  '#94A3B8',
};

function emailWrapper(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WebieApp Solutions</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, 'Inter', Arial, sans-serif; background:${BRAND.dark}; color:${BRAND.textPrimary}; -webkit-font-smoothing:antialiased; }
    a { color:${BRAND.primary}; }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${BRAND.dark}; padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;">

        <!-- Header -->
        <tr><td style="padding-bottom:32px; text-align:center;">
          <table cellpadding="0" cellspacing="0" style="display:inline-table;">
            <tr>
              <td style="background:${BRAND.primary}; width:36px; height:36px; border-radius:9px; text-align:center; vertical-align:middle;">
                <span style="font-size:18px; font-weight:800; color:${BRAND.dark}; font-family:Arial,sans-serif;">W</span>
              </td>
              <td style="padding-left:10px; vertical-align:middle;">
                <span style="font-size:18px; font-weight:700; color:${BRAND.textPrimary};">Webie<span style="color:${BRAND.primary};">App</span></span>
                <br/>
                <span style="font-size:9px; color:${BRAND.textMuted}; letter-spacing:2px; text-transform:uppercase;">SOLUTIONS LLC</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Main card -->
        <tr><td style="background:${BRAND.darkCard}; border:1px solid ${BRAND.darkBorder}; border-radius:16px; padding:40px 36px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0; text-align:center; font-size:11px; color:${BRAND.textMuted}; line-height:1.6;">
          <p>WebieApp Solutions LLC · 212 N. 2nd St. STE 100, Richmond, KY 40475</p>
          <p>Registered in Kentucky, USA · <a href="mailto:hello@webieapp.com" style="color:${BRAND.primary};">hello@webieapp.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function field(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 0; border-bottom:1px solid ${BRAND.darkBorder};">
        <span style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:${BRAND.textMuted};">${label}</span>
        <br/>
        <span style="font-size:14px; color:${BRAND.textPrimary}; font-weight:500; margin-top:3px; display:block;">${value}</span>
      </td>
    </tr>`;
}

function priorityBadge(priority) {
  const styles = {
    HIGH:   { bg: 'rgba(248,113,113,0.15)', color: '#FCA5A5', border: 'rgba(248,113,113,0.3)' },
    MEDIUM: { bg: 'rgba(251,191,36,0.12)',  color: '#FCD34D', border: 'rgba(251,191,36,0.3)'  },
    LOW:    { bg: 'rgba(148,163,184,0.12)', color: '#94A3B8', border: 'rgba(148,163,184,0.3)' },
  };
  const s = styles[priority] || styles.MEDIUM;
  const emoji = { HIGH: '🔴', MEDIUM: '🟡', LOW: '🟢' }[priority] || '🟡';
  return `<span style="background:${s.bg}; color:${s.color}; border:1px solid ${s.border}; padding:3px 12px; border-radius:20px; font-size:11px; font-weight:600; font-family:monospace;">${emoji} ${priority} PRIORITY</span>`;
}

// ── ADMIN NOTIFICATION — Contact Form ─────────────────────────────
async function sendContactAdminEmail({ name, email, phone, company, service, message, sourcePage, priority = 'MEDIUM', isAutism = false }) {
  const subject = `${priority === 'HIGH' ? '🔴' : priority === 'MEDIUM' ? '🟡' : '🟢'} New Lead: ${service} — ${name}`;

  const html = emailWrapper(`
    <h1 style="font-size:22px; font-weight:700; color:${BRAND.textPrimary}; margin-bottom:8px;">New Contact Submission</h1>
    <p style="font-size:14px; color:${BRAND.textMuted}; margin-bottom:24px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>

    <div style="margin-bottom:20px;">${priorityBadge(priority)}${isAutism ? '&nbsp;&nbsp;<span style="background:rgba(0,200,168,0.12);color:#00C8A8;border:1px solid rgba(0,200,168,0.25);padding:3px 12px;border-radius:20px;font-size:11px;font-weight:600;">🤝 AUTISM INQUIRY</span>' : ''}</div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${field('Full Name', name)}
      ${field('Email Address', email)}
      ${field('Phone Number', phone)}
      ${field('Company / Clinic', company)}
      ${field('Service Interested', service)}
      ${field('Source Page', sourcePage)}
    </table>

    <div style="background:rgba(255,255,255,0.03); border:1px solid ${BRAND.darkBorder}; border-radius:12px; padding:20px; margin-bottom:28px;">
      <p style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:${BRAND.textMuted}; margin-bottom:10px;">Message</p>
      <p style="font-size:14px; color:${BRAND.textPrimary}; line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
    </div>

    <a href="mailto:${email}?subject=Re: Your WebieApp inquiry"
       style="display:inline-block; background:${BRAND.primary}; color:${BRAND.dark}; font-weight:700; font-size:14px; padding:13px 28px; border-radius:10px; text-decoration:none;">
      Reply to ${name} →
    </a>
  `);

  return sendEmail({
    from:    `${ENV.FROM_NAME} <${ENV.FROM_EMAIL}>`,
    to:      ENV.ADMIN_EMAIL,
    subject,
    html,
  });
}

// ── USER CONFIRMATION — Contact Form ──────────────────────────────
async function sendContactConfirmationEmail({ name, email, service }) {
  const html = emailWrapper(`
    <div style="text-align:center; margin-bottom:32px;">
      <div style="width:64px; height:64px; background:rgba(0,200,168,0.12); border:2px solid rgba(0,200,168,0.35); border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:28px; line-height:64px; text-align:center;">✓</div>
      <h1 style="font-size:24px; font-weight:700; color:${BRAND.textPrimary}; margin-bottom:8px;">We've Got Your Message, ${name}!</h1>
      <p style="font-size:15px; color:${BRAND.textMuted}; line-height:1.6;">Thank you for reaching out about <strong style="color:${BRAND.primary};">${service}</strong>. Our team will review your inquiry and respond within 24 business hours.</p>
    </div>

    <div style="background:rgba(0,200,168,0.06); border:1px solid rgba(0,200,168,0.15); border-radius:12px; padding:20px; margin-bottom:28px; text-align:center;">
      <p style="font-size:13px; color:${BRAND.textMuted}; margin-bottom:4px;">Typical Response Time</p>
      <p style="font-size:20px; font-weight:700; color:${BRAND.primary};">Under 24 Hours</p>
    </div>

    <p style="font-size:14px; color:${BRAND.textMuted}; line-height:1.7; margin-bottom:28px;">While you wait, explore our portfolio of completed projects — or visit our dedicated <a href="https://webieapp.com/autism-consulting" style="color:${BRAND.primary};">Autism & ABA consulting page</a> if that's what brought you here.</p>

    <a href="https://webieapp.com/portfolio"
       style="display:inline-block; background:${BRAND.primary}; color:${BRAND.dark}; font-weight:700; font-size:14px; padding:13px 28px; border-radius:10px; text-decoration:none;">
      View Our Work →
    </a>
  `);

  return sendEmail({
    from:    `${ENV.FROM_NAME} <${ENV.FROM_EMAIL}>`,
    to:      email,
    subject: `We received your inquiry, ${name} — WebieApp Solutions`,
    html,
  });
}

// ── ADMIN NOTIFICATION — Chat Lead ────────────────────────────────
async function sendChatLeadAdminEmail({ name, email, phone, companyName, serviceInterested, timeline, budget, chatSummary, sourcePage, priority, isAutism, leadScore }) {
  const subject = `${priority === 'HIGH' ? '🔴' : '🟡'} Chat Lead: ${serviceInterested || 'General Inquiry'} — Score ${leadScore}/100`;

  const html = emailWrapper(`
    <h1 style="font-size:22px; font-weight:700; color:${BRAND.textPrimary}; margin-bottom:8px;">New Chat Lead Captured</h1>
    <p style="font-size:14px; color:${BRAND.textMuted}; margin-bottom:24px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET · Lead Score: <strong style="color:${BRAND.primary};">${leadScore}/100</strong></p>

    <div style="margin-bottom:20px;">${priorityBadge(priority)}${isAutism ? '&nbsp;&nbsp;<span style="background:rgba(0,200,168,0.12);color:#00C8A8;border:1px solid rgba(0,200,168,0.25);padding:3px 12px;border-radius:20px;font-size:11px;font-weight:600;">🤝 AUTISM INQUIRY</span>' : ''}</div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${field('Name',    name    || 'Not provided')}
      ${field('Email',   email   || 'Not provided')}
      ${field('Phone',   phone)}
      ${field('Company / Clinic', companyName)}
      ${field('Service Interested', serviceInterested)}
      ${field('Timeline', timeline)}
      ${field('Budget',  budget)}
      ${field('Source Page', sourcePage)}
    </table>

    ${chatSummary ? `
    <div style="background:rgba(255,255,255,0.03); border:1px solid ${BRAND.darkBorder}; border-radius:12px; padding:20px; margin-bottom:28px;">
      <p style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:${BRAND.textMuted}; margin-bottom:10px;">Chat Summary</p>
      <p style="font-size:13px; color:${BRAND.textPrimary}; line-height:1.7; white-space:pre-line;">${chatSummary}</p>
    </div>` : ''}

    ${email ? `<a href="mailto:${email}?subject=Following up on your WebieApp chat"
       style="display:inline-block; background:${BRAND.primary}; color:${BRAND.dark}; font-weight:700; font-size:14px; padding:13px 28px; border-radius:10px; text-decoration:none;">
      Follow Up with ${name || 'Lead'} →
    </a>` : ''}
  `);

  return sendEmail({
    from:    `${ENV.FROM_NAME} <${ENV.FROM_EMAIL}>`,
    to:      ENV.ADMIN_EMAIL,
    subject,
    html,
  });
}

// ── USER CONFIRMATION — Chat Lead ─────────────────────────────────
async function sendChatLeadConfirmationEmail({ name, email, serviceInterested }) {
  if (!email) return; // no email captured — skip

  const html = emailWrapper(`
    <div style="text-align:center; margin-bottom:32px;">
      <div style="font-size:40px; margin-bottom:16px;">👋</div>
      <h1 style="font-size:22px; font-weight:700; color:${BRAND.textPrimary}; margin-bottom:8px;">Great to Meet You, ${name || 'there'}!</h1>
      <p style="font-size:15px; color:${BRAND.textMuted}; line-height:1.6;">We've saved your details and our team will be in touch within 24 hours about <strong style="color:${BRAND.primary};">${serviceInterested || 'your inquiry'}</strong>.</p>
    </div>

    <p style="font-size:14px; color:${BRAND.textMuted}; line-height:1.7; margin-bottom:28px;">If you have anything else to share before our conversation, just reply to this email — it goes straight to our team.</p>

    <a href="https://webieapp.com/contact"
       style="display:inline-block; background:${BRAND.primary}; color:${BRAND.dark}; font-weight:700; font-size:14px; padding:13px 28px; border-radius:10px; text-decoration:none;">
      Visit Our Website →
    </a>
  `);

  return sendEmail({
    from:    `${ENV.FROM_NAME} <${ENV.FROM_EMAIL}>`,
    to:      email,
    subject: `We'll be in touch soon — WebieApp Solutions`,
    html,
  });
}

module.exports = {
  sendContactAdminEmail,
  sendContactConfirmationEmail,
  sendChatLeadAdminEmail,
  sendChatLeadConfirmationEmail,
};
