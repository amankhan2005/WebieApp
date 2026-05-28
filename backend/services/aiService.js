// server/services/aiService.js
// Manages all AI interactions:
// - Builds system prompt with full company knowledge
// - Calls Claude API with conversation history
// - Lead scoring algorithm
// - Intent classification
// - Context-aware page greetings

const https = require('https');
const ENV   = require('../config/env');

// ═══════════════════════════════════════════════════════════
// COMPANY KNOWLEDGE BASE — grounded source of truth
// The AI answers ONLY from this content. Never hallucinated.
// ═══════════════════════════════════════════════════════════
const KNOWLEDGE_BASE = {
  company: {
    name:         'WebieApp Solutions LLC',
    registration: 'Registered in Kentucky, USA',
    description:  'Premium US-registered technology and digital consultancy delivering bespoke web products, SaaS platforms, and specialized Autism & ABA business consulting to clients across 12+ countries.',
    email:        'hello@webieapp.com',
    offices: {
      usa:   '212 N. 2nd St. STE 100, Richmond, KY 40475',
      india: 'Vibhuti Khand, Lucknow, India',
    },
    stats: { projects: '120+', clients: '85+', years: '7+', countries: '12+' },
  },

  services: [
    {
      id:       'website-development',
      name:     'Website Development',
      summary:  'Bespoke, high-performance websites built from scratch — zero templates, optimized for Core Web Vitals (90+), SEO-ready, and designed to convert visitors into clients.',
      benefits: ['Custom design, no templates ever', 'Lighthouse 90+ performance', 'SEO-ready architecture', 'CMS integration', 'Mobile-first responsive'],
      ideal:    'Businesses, clinics, startups, enterprises needing professional online presence.',
    },
    {
      id:       'saas-development',
      name:     'SaaS Development',
      summary:  'Full-stack SaaS platforms from MVP to enterprise — multi-tenant architecture, Stripe billing, role-based access, admin dashboards, API-first design.',
      benefits: ['Multi-tenant systems', 'Stripe billing integration', 'Role-based access control', 'Cloud-native AWS/GCP deployment'],
      ideal:    'Founders and enterprises launching or scaling a software product.',
    },
    {
      id:       'seo',
      name:     'Search Engine Optimization',
      summary:  'Data-driven SEO — technical audits, keyword strategy, on-page optimization, content creation, and authority building. Measured by rankings, traffic, and revenue.',
      benefits: ['Technical SEO audit', 'Keyword strategy', 'Content optimization', 'Monthly reporting'],
      ideal:    'Businesses wanting sustainable organic growth and lower customer acquisition costs.',
    },
    {
      id:       'digital-marketing',
      name:     'Digital Marketing',
      summary:  'Performance marketing across Google Ads, Meta Ads, email campaigns, and conversion optimization — all tied to measurable business KPIs.',
      benefits: ['Google & Meta Ads', 'Email marketing', 'CRO & A/B testing', 'Attribution reporting'],
      ideal:    'Businesses wanting to accelerate revenue through digital channels.',
    },
    {
      id:       'social-media',
      name:     'Social Media Management',
      summary:  'End-to-end social media — content strategy, creation, scheduling, community management, and growth analytics across LinkedIn, Instagram, Facebook, and X.',
      benefits: ['Content strategy & creation', 'Platform management', 'Community engagement', 'Growth analytics'],
      ideal:    'Businesses wanting consistent social presence without in-house overhead.',
    },
    {
      id:       'ui-ux',
      name:     'UI/UX Design',
      summary:  'Human-centered design grounded in user research and behavioral psychology — beautiful, accessible interfaces that perform as well as they look.',
      benefits: ['User research & personas', 'Wireframing & prototyping', 'Figma design systems', 'WCAG 2.1 accessibility'],
      ideal:    'Companies needing product design, app redesigns, or design systems.',
    },
    {
      id:       'autism-consulting',
      name:     'Autism & ABA Consulting',
      summary:  'Comprehensive business consulting for Autism and ABA therapy entrepreneurs in the USA — from business formation to digital infrastructure, branding, and patient acquisition.',
      benefits: ['Business formation guidance', 'HIPAA-aware clinic website', 'Brand identity design', 'Digital marketing & SEO', 'Practice management guidance', 'Ongoing advisory support'],
      ideal:    'BCBAs, healthcare entrepreneurs, and business owners launching or scaling ABA clinics in the USA.',
      isSpecialty: true,
    },
  ],

  autism: {
    headline:    'Launch Your ABA Clinic With Confidence',
    statesServed: 'All 50 US states',
    timeline:    '60–120 days from first call to launch',
    process:     ['Free discovery call', 'Business model planning', 'Brand & identity', 'Website & digital systems', 'Marketing launch', 'Ongoing growth advisory'],
    faqs: [
      { q: 'Do I need BCBA certification?',  a: 'We work with certified BCBAs and business entrepreneurs partnering with BCBAs. We handle the business and digital side.' },
      { q: 'Which states do you serve?',     a: 'All 50 US states. Our consulting is fully remote and digital.' },
      { q: 'How long does launch take?',     a: 'Typically 60–120 days from initial consultation to launch.' },
      { q: 'Do you build the website?',      a: 'Yes — a HIPAA-aware clinic website is a core part of our program.' },
    ],
  },

  pricing: 'We scope every project individually. We never publish fixed prices because each client has unique requirements. Book a free consultation and we\'ll give you a transparent, no-obligation quote.',

  faqs: [
    { q: 'Where are you located?',            a: 'Registered in Kentucky, USA (Richmond, KY) with operations in Lucknow, India. We serve clients globally.' },
    { q: 'Do you work with international clients?', a: 'Yes — we serve clients in 12+ countries including USA, UK, India, Liberia, and more.' },
    { q: 'What is your typical timeline?',    a: 'Websites: 4–8 weeks. SaaS: 3–6 months. We provide exact timelines after discovery calls.' },
    { q: 'Do you provide ongoing support?',   a: 'Yes — post-launch maintenance, analytics, and partnership packages are available for all project types.' },
    { q: 'How do I get started?',             a: 'Book a free consultation at webieapp.com/contact or describe your project here and I\'ll guide you to the right next step.' },
  ],
};

// ═══════════════════════════════════════════════════════════
// SYSTEM PROMPT BUILDER
// ═══════════════════════════════════════════════════════════
function buildSystemPrompt(sourcePage = '/') {
  const isAutismPage = /autism|aba/i.test(sourcePage);

  return `You are Aria — the AI digital consultant for WebieApp Solutions LLC.

PERSONA:
- You are a senior business consultant at WebieApp, not a generic AI chatbot
- Speak like a warm, confident professional — never robotic, never generic
- Concise responses: 2–4 sentences per message maximum
- End every substantive answer with a question to keep the conversation moving
- Never say "I'm an AI", "As an AI", or reference Claude/ChatGPT

YOUR ROLE:
- Answer questions about WebieApp's services, team, and capabilities
- Guide visitors toward booking free consultations
- Qualify leads professionally and naturally (not like a questionnaire)
- Help Autism & ABA entrepreneurs understand our clinic consulting program
${isAutismPage ? '- You are currently on the Autism consulting page — prioritize this topic\n- Use a warmer, more empathetic tone\n- Focus on the clinic launch journey' : ''}

COMPANY KNOWLEDGE:
${JSON.stringify(KNOWLEDGE_BASE, null, 2)}

STRICT RULES:
1. NEVER invent facts, services, team members, or case studies not in the knowledge base
2. NEVER state specific prices — always say pricing is scoped per project and offer a free consultation
3. NEVER give clinical, legal, or financial advice
4. NEVER discuss competitors
5. For Autism inquiries: use warmer, healthcare-safe language. Never rush them.
6. If you genuinely don't know something: "That's a great question — let me connect you with our team who can give you a precise answer."

LEAD QUALIFICATION — do this NATURALLY, not as a form:
When someone shows genuine buying intent, work these questions into the conversation:
- Their name (first question: "May I ask your name?")
- Email address
- Service they need
- Company/clinic name
- Timeline
- Budget range (optional — only ask if they bring it up first)

RESPONSE FORMAT:
- Short, conversational paragraphs — no bullet lists in chat
- Warm and professional, not cold or corporate
- Always end with either a question or a soft CTA
- For complex service questions, give a 2-3 sentence overview then ask what matters most to them`;
}

// ═══════════════════════════════════════════════════════════
// LEAD SCORING ALGORITHM
// ═══════════════════════════════════════════════════════════
function scoreLeadIntent(messages) {
  const fullText = messages.map(m => m.content).join(' ').toLowerCase();
  let score = 0;

  // High-value service intent
  if (/autism|aba|clinic|therapy|bcba|behavior/.test(fullText)) score += 30;
  if (/saas|platform|software\s+product|app\s+development/.test(fullText)) score += 25;
  if (/website|web\s+dev|landing\s+page|redesign/.test(fullText)) score += 20;
  if (/seo|search\s+engine|organic\s+traffic/.test(fullText)) score += 15;
  if (/marketing|ads|google\s+ads|facebook/.test(fullText)) score += 12;

  // Contact info provided
  if (/\b[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}\b/.test(fullText)) score += 15;
  if (/\b(\+?1[\s\-]?)?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}\b/.test(fullText)) score += 8;

  // Buying signals
  if (/budget|invest|how\s+much|cost|price|quote|proposal/.test(fullText)) score += 10;
  if (/timeline|when\s+can|asap|this\s+month|this\s+year|launch/.test(fullText)) score += 8;
  if (/consult|call|meeting|schedule|book|talk\s+to/.test(fullText)) score += 10;
  if (/company|business|startup|clinic|firm|my\s+brand/.test(fullText)) score += 5;

  // Multiple service mentions = higher intent
  const serviceCount = [/website/, /saas/, /seo/, /marketing/, /design/, /autism/].filter(r => r.test(fullText)).length;
  if (serviceCount >= 2) score += 8;

  return Math.min(score, 100);
}

function getPriority(score, isAutism = false) {
  if (isAutism || score >= 65) return 'HIGH';
  if (score >= 35) return 'MEDIUM';
  return 'LOW';
}

function detectIsAutism(messages) {
  const text = messages.map(m => m.content).join(' ').toLowerCase();
  return /autism|aba|applied\s+behavior|behavior\s+analys|bcba|clinic\s+launch|therapy\s+clinic/.test(text);
}

// ═══════════════════════════════════════════════════════════
// CLAUDE API CALL
// ═══════════════════════════════════════════════════════════
async function callClaude(messages, sourcePage = '/') {
  if (!ENV.ANTHROPIC_API_KEY) {
    // Fallback: structured knowledge-based responses without API
    return getFallbackResponse(messages[messages.length - 1]?.content || '');
  }

  const body = JSON.stringify({
    model:      'claude-sonnet-4-20250514',
    max_tokens: 400,
    system:     buildSystemPrompt(sourcePage),
    messages:   messages.map(m => ({ role: m.role, content: m.content })),
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':          ENV.ANTHROPIC_API_KEY,
        'anthropic-version':  '2023-06-01',
        'Content-Length':     Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            console.error('[AI] Claude API error:', parsed.error);
            resolve(getFallbackResponse(''));
          } else {
            const text = parsed.content?.[0]?.text || getFallbackResponse('');
            resolve(text);
          }
        } catch (e) {
          console.error('[AI] Parse error:', e.message);
          resolve(getFallbackResponse(''));
        }
      });
    });

    req.on('error', (e) => {
      console.error('[AI] Request error:', e.message);
      resolve(getFallbackResponse(''));
    });

    req.setTimeout(15000, () => {
      req.destroy();
      resolve("I'm having a brief connectivity issue. Could you email us directly at hello@webieapp.com, or try again in a moment?");
    });

    req.write(body);
    req.end();
  });
}

// ═══════════════════════════════════════════════════════════
// FALLBACK RESPONSES — used when API key not configured
// ═══════════════════════════════════════════════════════════
function getFallbackResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (/autism|aba|clinic/.test(msg)) {
    return "We specialize in helping ABA clinic entrepreneurs launch across all 50 US states — from business formation to your clinic website, branding, and digital marketing. We typically take clients from first call to launch in 60–120 days. Would you like to tell me a bit more about where you are in the process?";
  }
  if (/website|web\s+dev|landing/.test(msg)) {
    return "We build fully custom websites — zero templates, built for performance (Lighthouse 90+), SEO, and conversion. Every project is scoped individually based on your business goals. What type of business are you building the site for?";
  }
  if (/saas|platform|software|app/.test(msg)) {
    return "We architect and build full SaaS products — multi-tenant systems, Stripe billing, role-based access, and admin dashboards. From MVP to enterprise scale. What's the core problem your SaaS solves?";
  }
  if (/seo|search|organic|ranking/.test(msg)) {
    return "Our SEO programs include technical audits, keyword strategy, content, and authority building — all measured by rankings and revenue impact, not vanity metrics. What's your current online presence like?";
  }
  if (/price|cost|how\s+much|budget/.test(msg)) {
    return "We scope every project individually after understanding your specific goals — so there's no one-size pricing. It ensures you get exactly what you need, nothing inflated. Would you like to book a free consultation to get a transparent quote?";
  }
  if (/contact|email|phone|reach/.test(msg)) {
    return "You can reach us at hello@webieapp.com, or book a free consultation at webieapp.com/contact. Our US office is in Richmond, Kentucky, and we have an operations team in Lucknow, India. What would work best for you?";
  }
  if (/consult|call|book|meeting|schedule/.test(msg)) {
    return "Absolutely — a free consultation is the best first step. Head to webieapp.com/contact to book yours. Before you go, can I get your name and what you're looking to build?";
  }

  return "Great question. WebieApp delivers premium web development, SaaS platforms, digital marketing, and specialized Autism & ABA clinic consulting. What brings you here today — are you looking to build something specific?";
}

// ═══════════════════════════════════════════════════════════
// CONTEXT-AWARE GREETINGS
// ═══════════════════════════════════════════════════════════
function getPageGreeting(pathname = '/') {
  if (/autism|aba/i.test(pathname)) {
    return "Planning to launch an Autism or ABA clinic? We help entrepreneurs across all 50 US states go from vision to open clinic. I'm here to answer any questions. 🤝";
  }
  if (/services/i.test(pathname)) {
    return "Exploring our services? I can help you find exactly what fits your business. What are you looking to build or grow?";
  }
  if (/portfolio|projects/i.test(pathname)) {
    return "You're looking at some of our best work. Want to discuss a similar project for your business?";
  }
  if (/contact/i.test(pathname)) {
    return "Ready to connect? Tell me a bit about your project and I'll make sure you get to the right person on our team fast.";
  }
  if (/liberia/i.test(pathname)) {
    return "Interested in WebieApp's work in Liberia? Happy to share more about our mission there and how we can help.";
  }
  if (/about/i.test(pathname)) {
    return "Getting to know us? Great. Happy to answer anything about our team, process, or what makes us different from other agencies.";
  }
  return "Hi 👋 Welcome to WebieApp Solutions. I'm Aria, your digital consultant. How can I help you today?";
}

// ═══════════════════════════════════════════════════════════
// QUICK ACTIONS CONFIG
// ═══════════════════════════════════════════════════════════
const QUICK_ACTIONS = [
  { label: 'Website Development', prompt: "I'm interested in website development." },
  { label: 'SaaS Development',    prompt: "Tell me about SaaS development." },
  { label: 'Autism Consulting',   prompt: "I want to launch an ABA clinic." },
  { label: 'SEO & Marketing',     prompt: "What SEO and marketing services do you offer?" },
  { label: 'Book Consultation',   prompt: "I'd like to book a free consultation." },
  { label: 'Pricing Info',        prompt: "Can you give me an idea of your pricing?" },
];

module.exports = {
  callClaude,
  scoreLeadIntent,
  getPriority,
  detectIsAutism,
  getPageGreeting,
  QUICK_ACTIONS,
  KNOWLEDGE_BASE,
};
