// services/emailService.js
// Email sending via Resend.
// Provides two functions: admin notification + user confirmation for the contact form.

const { Resend } = require('resend');
const ENV        = require('../config/env');

// Lazy instantiation — avoids crash when RESEND_API_KEY is not set
let _resend = null;
function getResend() {
  if (!_resend) {
    if (!ENV.RESEND_API_KEY) {
      console.warn('[EMAIL] RESEND_API_KEY not set — emails will be logged only (dev mode)');
      return null;
    }
    _resend = new Resend(ENV.RESEND_API_KEY);
  }
  return _resend;
}

async function sendEmail(params) {
  const client = getResend();
  if (!client) {
    console.log('[EMAIL DEV] Would send:', JSON.stringify({ to: params.to, subject: params.subject }, null, 2));
    return { id: 'dev-mode-no-send' };
  }
  return client.emails.send(params);
}

// ── Brand tokens ──────────────────────────────────────────────────
const B = {
  primary:     '#00C8A8',
  primaryDim:  'rgba(0,200,168,0.12)',
  primaryBdr:  'rgba(0,200,168,0.25)',
  dark:        '#080B0F',
  card:        '#0F1419',
  border:      '#1E2835',
  text:        '#F8FAFC',
  muted:       '#94A3B8',
  errorBg:     'rgba(248,113,113,0.15)',
  errorText:   '#FCA5A5',
  errorBdr:    'rgba(248,113,113,0.3)',
  warnBg:      'rgba(251,191,36,0.12)',
  warnText:    '#FCD34D',
  warnBdr:     'rgba(251,191,36,0.3)',
};

// ── Email shell ───────────────────────────────────────────────────
function shell(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>WebieApp Solutions</title>
</head>
<body style="margin:0;padding:0;background:${B.dark};font-family:-apple-system,'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${B.dark};padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Logo -->
        <tr><td style="padding-bottom:28px;text-align:center;">
          <table cellpadding="0" cellspacing="0" style="display:inline-table;">
            <tr>
              <td style="background:${B.primary};width:38px;height:38px;border-radius:10px;text-align:center;vertical-align:middle;">
                <span style="font-size:20px;font-weight:900;color:${B.dark};font-family:Arial,sans-serif;line-height:38px;">W</span>
              </td>
              <td style="padding-left:10px;vertical-align:middle;">
                <div style="font-size:17px;font-weight:700;color:${B.text};line-height:1.2;">Webie<span style="color:${B.primary};">App</span></div>
                <div style="font-size:9px;color:${B.muted};letter-spacing:2.5px;text-transform:uppercase;margin-top:1px;">SOLUTIONS LLC</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:${B.card};border:1px solid ${B.border};border-radius:18px;padding:40px 36px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0;text-align:center;font-size:11px;color:${B.muted};line-height:1.8;">
          <p style="margin:0;">WebieApp Solutions LLC &middot; 212 N. 2nd St. STE 100, Richmond, KY 40475</p>
          <p style="margin:0;">Registered in Kentucky, USA &middot; <a href="mailto:hello@webieapp.com" style="color:${B.primary};text-decoration:none;">hello@webieapp.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Field row ─────────────────────────────────────────────────────
function row(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${B.border};">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:${B.muted};margin-bottom:4px;">${label}</div>
        <div style="font-size:14px;color:${B.text};font-weight:500;">${value}</div>
      </td>
    </tr>`;
}

// ── Priority badge ────────────────────────────────────────────────
function badge(priority) {
  const map = {
    HIGH:   { bg: B.errorBg,  color: B.errorText, border: B.errorBdr,  emoji: '🔴' },
    MEDIUM: { bg: B.warnBg,   color: B.warnText,  border: B.warnBdr,   emoji: '🟡' },
    LOW:    { bg: 'rgba(148,163,184,0.12)', color: B.muted, border: 'rgba(148,163,184,0.3)', emoji: '🟢' },
  };
  const s = map[priority] || map.MEDIUM;
  return `<span style="background:${s.bg};color:${s.color};border:1px solid ${s.border};padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;font-family:monospace;">${s.emoji} ${priority} PRIORITY</span>`;
}

// ── Divider ───────────────────────────────────────────────────────
const divider = `<div style="height:1px;background:${B.border};margin:24px 0;"></div>`;

// ── ADMIN NOTIFICATION ────────────────────────────────────────────
async function sendContactAdminEmail({ name, email, phone, company, service, message, sourcePage, priority = 'MEDIUM', isAutism = false }) {
  const priorityEmoji = { HIGH: '🔴', MEDIUM: '🟡', LOW: '🟢' }[priority] || '🟡';
  const subject = `${priorityEmoji} New Lead: ${service} — ${name}`;
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone:    'America/New_York',
    weekday:     'short',
    year:        'numeric',
    month:       'long',
    day:         'numeric',
    hour:        '2-digit',
    minute:      '2-digit',
    timeZoneName: 'short',
  });

  const html = shell(`
    <!-- Heading -->
    <h1 style="font-size:22px;font-weight:800;color:${B.text};margin:0 0 4px;">New Contact Submission</h1>
    <p style="font-size:13px;color:${B.muted};margin:0 0 24px;">${submittedAt}</p>

    <!-- Badges -->
    <div style="margin-bottom:24px;display:flex;gap:8px;flex-wrap:wrap;">
      ${badge(priority)}
      ${isAutism ? `<span style="background:${B.primaryDim};color:${B.primary};border:1px solid ${B.primaryBdr};padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;">🤝 AUTISM INQUIRY</span>` : ''}
    </div>

    <!-- Contact details table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row('Full Name',          name)}
      ${row('Email Address',      email)}
      ${row('Phone Number',       phone || '—')}
      ${row('Company / Clinic',   company || '—')}
      ${row('Service Interested', service)}
      ${row('Source Page',        sourcePage || '/contact')}
      ${row('Submitted At',       submittedAt)}
    </table>

    <!-- Message box -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid ${B.border};border-radius:14px;padding:20px;margin-bottom:28px;">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:${B.muted};margin-bottom:10px;">Message</div>
      <p style="font-size:14px;color:${B.text};line-height:1.75;margin:0;">${message.replace(/\n/g, '<br/>')}</p>
    </div>

    <!-- CTA -->
    <a href="mailto:${email}?subject=Re: Your WebieApp Inquiry"
       style="display:inline-block;background:${B.primary};color:${B.dark};font-weight:700;font-size:14px;padding:13px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.2px;">
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

// ── USER CONFIRMATION ─────────────────────────────────────────────
async function sendContactConfirmationEmail({ name, email, service }) {
  const html = shell(`
    <!-- Icon + heading -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:68px;height:68px;background:${B.primaryDim};border:2px solid ${B.primaryBdr};border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:30px;line-height:68px;display:block;">✓</span>
      </div>
      <h1 style="font-size:24px;font-weight:800;color:${B.text};margin:0 0 10px;">We've Got Your Message, ${name}!</h1>
      <p style="font-size:15px;color:${B.muted};line-height:1.65;margin:0;">
        Thank you for reaching out about <strong style="color:${B.primary};">${service}</strong>.
        Our team will review your inquiry and respond within 24 business hours.
      </p>
    </div>

    <!-- Response time card -->
    <div style="background:${B.primaryDim};border:1px solid ${B.primaryBdr};border-radius:14px;padding:22px;margin-bottom:28px;text-align:center;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1.2px;color:${B.muted};margin-bottom:6px;">Typical Response Time</div>
      <div style="font-size:26px;font-weight:800;color:${B.primary};">Under 24 Hours</div>
    </div>

    <!-- What to expect -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:700;color:${B.text};margin-bottom:14px;text-transform:uppercase;letter-spacing:0.5px;">What Happens Next</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ['📋', 'Review', 'Our team reviews your request and matches you with the right specialist.'],
          ['📞', 'Reach Out', 'We contact you via email (or phone if you prefer) to discuss your project.'],
          ['🚀', 'Proposal', 'You receive a tailored proposal with scope, timeline, and transparent pricing.'],
        ].map(([icon, title, text]) => `
        <tr>
          <td style="vertical-align:top;padding:0 12px 16px 0;width:36px;">
            <div style="font-size:20px;">${icon}</div>
          </td>
          <td style="vertical-align:top;padding-bottom:16px;">
            <div style="font-size:13px;font-weight:700;color:${B.text};margin-bottom:2px;">${title}</div>
            <div style="font-size:13px;color:${B.muted};line-height:1.6;">${text}</div>
          </td>
        </tr>`).join('')}
      </table>
    </div>

    ${divider}

    <p style="font-size:13px;color:${B.muted};line-height:1.7;margin:0 0 24px;">
      While you wait, explore our portfolio of completed projects — or visit our dedicated
      <a href="https://webieapp.com/autism-consulting" style="color:${B.primary};text-decoration:none;">Autism &amp; ABA consulting page</a>
      if that's what brought you here.
    </p>

    <a href="https://webieapp.com/portfolio"
       style="display:inline-block;background:${B.primary};color:${B.dark};font-weight:700;font-size:14px;padding:13px 28px;border-radius:10px;text-decoration:none;">
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

// ── LEAD: ADMIN NOTIFICATION (quick-capture landing form) ─────────
async function sendLeadAdminEmail({ name, email, phone, company, state, sourcePage, utmSource, utmMedium, utmCampaign }) {
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York', weekday: 'short', year: 'numeric',
    month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  const utm = [utmSource, utmMedium, utmCampaign].filter(Boolean).join(' / ');

  const html = shell(`
    <h1 style="font-size:22px;font-weight:800;color:${B.text};margin:0 0 4px;">🔥 New Landing-Page Lead</h1>
    <p style="font-size:13px;color:${B.muted};margin:0 0 24px;">${submittedAt}</p>

    <div style="margin-bottom:24px;">
      ${badge('HIGH')}
      <span style="background:${B.primaryDim};color:${B.primary};border:1px solid ${B.primaryBdr};padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;margin-left:8px;">⚡ CALL WITHIN 24H</span>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row('Full Name',    name)}
      ${row('Phone Number', phone)}
      ${row('Email Address', email)}
      ${row('Company / Clinic', company || '—')}
      ${row('State',        state || '—')}
      ${row('Source Page',  sourcePage || '/autism-consulting')}
      ${row('Campaign',     utm || '—')}
      ${row('Submitted At', submittedAt)}
    </table>

    <a href="tel:${(phone || '').replace(/[^+\d]/g, '')}"
       style="display:inline-block;background:${B.primary};color:${B.dark};font-weight:700;font-size:14px;padding:13px 28px;border-radius:10px;text-decoration:none;margin-right:8px;">
      Call ${name} →
    </a>
    <a href="mailto:${email}?subject=Your ABA Clinic Consultation — WebieApp"
       style="display:inline-block;background:transparent;color:${B.primary};border:1px solid ${B.primaryBdr};font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
      Email ${name}
    </a>
  `);

  return sendEmail({
    from:    `${ENV.FROM_NAME} <${ENV.FROM_EMAIL}>`,
    to:      ENV.ADMIN_EMAIL,
    subject: `🔥 New ABA Lead: ${name}${state ? ` (${state})` : ''}`,
    html,
  });
}

// ── LEAD: USER CONFIRMATION ───────────────────────────────────────
async function sendLeadConfirmationEmail({ name, email }) {
  const html = shell(`
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:68px;height:68px;background:${B.primaryDim};border:2px solid ${B.primaryBdr};border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:30px;line-height:68px;display:block;">✓</span>
      </div>
      <h1 style="font-size:24px;font-weight:800;color:${B.text};margin:0 0 10px;">Thanks, ${name}!</h1>
      <p style="font-size:15px;color:${B.muted};line-height:1.65;margin:0;">
        We've received your details about launching a <strong style="color:${B.primary};">Clinic or Home-Based ABA</strong> practice.
        A member of our team will reach out within one business day to schedule your free discovery call.
      </p>
    </div>

    <div style="background:${B.primaryDim};border:1px solid ${B.primaryBdr};border-radius:14px;padding:22px;margin-bottom:28px;text-align:center;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1.2px;color:${B.muted};margin-bottom:6px;">We'll Contact You In</div>
      <div style="font-size:26px;font-weight:800;color:${B.primary};">Under 24 Hours</div>
    </div>

    <div style="margin-bottom:28px;">
      <div style="font-size:13px;font-weight:700;color:${B.text};margin-bottom:14px;text-transform:uppercase;letter-spacing:0.5px;">What Happens Next</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ['📞', 'Discovery Call', 'A relaxed 45-minute call about your vision, timeline, and goals — no pressure.'],
          ['🗺️', 'Custom Roadmap', 'We map your path from business formation to your first authorized client.'],
          ['🚀', 'Launch Plan', 'You receive a clear, transparent plan with scope, timeline, and pricing.'],
        ].map(([icon, title, text]) => `
        <tr>
          <td style="vertical-align:top;padding:0 12px 16px 0;width:36px;"><div style="font-size:20px;">${icon}</div></td>
          <td style="vertical-align:top;padding-bottom:16px;">
            <div style="font-size:13px;font-weight:700;color:${B.text};margin-bottom:2px;">${title}</div>
            <div style="font-size:13px;color:${B.muted};line-height:1.6;">${text}</div>
          </td>
        </tr>`).join('')}
      </table>
    </div>

    ${divider}

    <p style="font-size:13px;color:${B.muted};line-height:1.7;margin:0;">
      Have a quick question in the meantime? Just reply to this email — we read every message.
    </p>
  `);

  return sendEmail({
    from:    `${ENV.FROM_NAME} <${ENV.FROM_EMAIL}>`,
    to:      email,
    subject: `We've got your details, ${name} — WebieApp ABA Consulting`,
    html,
  });
}

module.exports = {
  sendContactAdminEmail,
  sendContactConfirmationEmail,
  sendLeadAdminEmail,
  sendLeadConfirmationEmail,
};
