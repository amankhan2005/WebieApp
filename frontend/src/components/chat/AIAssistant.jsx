// src/components/chat/AIAssistant.jsx
import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';

// ── SVG Icons ─────────────────────────────────────────────────────
const Icon = {
  Globe: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Zap: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Target: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Layers: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Heart: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Briefcase: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Mail: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Info: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Send: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Chat: () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Close: () => (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Map: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  ),
};

// ── Fuzzy match helper ────────────────────────────────────────────
function fuzzyMatch(text, keyword) {
  if (text.includes(keyword)) return true;
  // Allow 1 character typo for keywords longer than 4 chars
  if (keyword.length <= 4) return false;
  let mismatches = 0;
  if (Math.abs(text.length - keyword.length) > 2) {
    // Check if keyword is a substring with 1 char off
    for (let i = 0; i <= text.length - keyword.length + 1; i++) {
      const slice = text.substring(i, i + keyword.length);
      let diff = 0;
      for (let j = 0; j < keyword.length; j++) {
        if (slice[j] !== keyword[j]) diff++;
      }
      if (diff <= 1) return true;
    }
    return false;
  }
  for (let i = 0; i < Math.min(text.length, keyword.length); i++) {
    if (text[i] !== keyword[i]) mismatches++;
    if (mismatches > 1) return false;
  }
  return mismatches <= 1;
}

function scoreKeywords(text, keywords) {
  return keywords.reduce((acc, kw) => {
    if (fuzzyMatch(text, kw)) return acc + kw.length * (text.includes(kw) ? 1 : 0.7);
    return acc;
  }, 0);
}

// ── Comprehensive Knowledge Base ──────────────────────────────────
const KB = {

  greeting: {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'howdy', 'sup', "what's up", 'greetings', 'good day', 'hiya', 'yo'],
    response: "Hi, welcome to WebieApp. I can help you explore our services, review past projects, or answer questions about your specific requirements. What are you working on?",
  },

  thanks: {
    keywords: ['thanks', 'thank you', 'thank', 'appreciate', 'helpful', 'got it', 'understood', 'makes sense', 'perfect', 'great', 'awesome', 'nice', 'cool'],
    response: "Of course — happy to help. Is there anything else you'd like to know or explore?",
  },

  services: {
    web: {
      keywords: ['website', 'web development', 'web dev', 'site', 'webpage', 'landing page', 'html', 'react', 'frontend', 'build a website', 'need a website', 'web page', 'web presence', 'business website', 'company website', 'make a website', 'create a website', 'develop a website', 'web design', 'custom website', 'responsive'],
      response: "We build fully custom websites — no templates, no page builders. Every project is engineered from scratch for performance, accessibility, and growth.\n\nOur typical stack: React or Next.js on the frontend, Node.js or Python on the backend, with scalable cloud hosting. Most sites launch in 3–6 weeks depending on complexity.\n\nWe work with businesses of all sizes — from solo practitioners to enterprise healthcare systems.\n\nIs this for a new project or a redesign of something existing?",
    },
    saas: {
      keywords: ['saas', 'software', 'platform', 'app', 'application', 'startup', 'product', 'mvp', 'dashboard', 'stripe', 'billing', 'subscription', 'web app', 'software product', 'build an app', 'build a platform', 'build software', 'user portal', 'admin panel', 'multi tenant', 'role based'],
      response: "We design and engineer full-stack SaaS products — from early MVPs to production-grade platforms with thousands of users.\n\nWhat that typically includes: multi-tenant architecture, authentication and role-based access, Stripe billing and subscription management, admin dashboards, analytics, and API infrastructure.\n\nTimeline: 8–16 weeks for a solid MVP, longer for complex platforms.\n\nAre you starting fresh, or do you have something partially built that needs to scale?",
    },
    seo: {
      keywords: ['seo', 'search engine', 'google ranking', 'organic', 'traffic', 'keywords', 'rank', 'optimize', 'search visibility', 'google', 'search optimization', 'serp', 'backlinks', 'on page', 'off page', 'technical seo', 'local seo', 'search rankings', 'appear on google'],
      response: "We run comprehensive SEO programs — not just surface-level fixes. That covers technical audits, site architecture, keyword strategy, on-page optimization, content development, and authority building.\n\nFor healthcare clients, we also handle local SEO, Google Business Profile optimization, and HIPAA-safe content strategies.\n\nResults typically start appearing in 60–90 days, with meaningful traffic growth at 3–6 months.\n\nAre you starting from scratch, or trying to recover or improve an existing site's visibility?",
    },
    marketing: {
      keywords: ['marketing', 'ads', 'google ads', 'meta ads', 'facebook ads', 'campaign', 'digital marketing', 'paid ads', 'ppc', 'email marketing', 'paid search', 'advertise', 'advertising', 'lead generation', 'leads', 'conversion', 'roas', 'return on ad spend', 'performance marketing'],
      response: "We manage performance marketing across Google Ads, Meta, LinkedIn, and email — always tied to measurable outcomes, not vanity metrics.\n\nFor healthcare and ABA clients specifically, we run compliant patient acquisition campaigns that drive qualified inquiries while respecting HIPAA advertising guidelines.\n\nWhat's the primary goal — lead generation, patient acquisition, brand awareness, or something else?",
    },
    social: {
      keywords: ['social media', 'instagram', 'facebook', 'linkedin', 'twitter', 'content', 'posting', 'social presence', 'social management', 'social media management', 'content creation', 'content strategy', 'reels', 'tiktok', 'social strategy', 'community management'],
      response: "We handle social media end-to-end — strategy, content creation, scheduling, and community engagement across LinkedIn, Instagram, Facebook, and X.\n\nFor professional services and healthcare brands, we focus on building credibility and thought leadership, not just follower counts.\n\nAre you building a presence from scratch, or looking to improve consistency and quality on existing accounts?",
    },
    design: {
      keywords: ['design', 'ui', 'ux', 'figma', 'branding', 'logo', 'brand identity', 'visual design', 'interface', 'prototype', 'wireframe', 'ui ux', 'user experience', 'user interface', 'design system', 'mockup', 'product design', 'brand design', 'rebrand'],
      response: "We do UI/UX design rooted in research, usability, and brand strategy — not just aesthetics.\n\nDeliverables typically include: discovery and user research, wireframes, high-fidelity Figma designs, interactive prototypes, design systems, and full developer handoff documentation.\n\nAccessibility (WCAG compliance) is part of every engagement.\n\nIs this for a new product, an existing interface that needs improvement, or a full brand identity project?",
    },
    autism: {
      keywords: ['autism', 'aba', 'therapy', 'clinic', 'bcba', 'behavior', 'behavioral', 'special needs', 'applied behavior', 'aba clinic', 'healthcare', 'hipaa', 'patient', 'behavioral health', 'speech', 'occupational', 'aba business', 'start aba', 'open aba', 'aba practice', 'autism clinic', 'autism consulting', 'autism business', 'autism website', 'behavior analysis', 'rbt', 'behavior technician'],
      response: "This is one of our deepest areas of expertise. We've helped BCBAs and healthcare entrepreneurs plan, launch, and scale ABA therapy businesses across the US.\n\nWhat we cover: business formation and legal structure, HIPAA-aware website development, branding and positioning, digital marketing and patient acquisition, insurance and billing guidance, and ongoing growth strategy.\n\nClients include Bloomvera Autism, Dove Autism, Autism Violet, BrightPath Autism, Alliance Behavioral Therapy, and several others.\n\nAre you in the planning stage, or already operating and looking to grow?",
    },
  },

  about: {
    keywords: ['about', 'who are you', 'company', 'team', 'webieapp', 'registered', 'founded', 'background', 'experience', 'history', 'where are you', 'location', 'office', 'who is', 'tell me about', 'what is webieapp', 'what do you do', 'how long', 'years in business', 'about you', 'about the company', 'your company', 'your team'],
    response: "WebieApp Solutions LLC is a US-registered technology and digital consultancy, legally incorporated in Kentucky with operations in Lucknow, India.\n\nWe've been in business for over 7 years — 120+ projects delivered across healthcare, SaaS, government, logistics, and non-profit sectors, with clients in 12+ countries.\n\nOur core specialties are healthcare technology (particularly ABA/autism services), custom SaaS products, and digital transformation for businesses in emerging markets including West Africa.\n\nAll contracts are governed under US law. Most of our work is fully remote.\n\nAnything specific you'd like to know?",
  },

  registration: {
    keywords: ['registered', 'llc', 'legal', 'us company', 'american company', 'usa registered', 'kentucky', 'us registered', 'incorporated', 'registration', 'us law', 'american', 'united states', 'legitimate', 'verified'],
    response: "Yes — WebieApp Solutions LLC is legally registered in the United States, incorporated in Richmond, Kentucky.\n\nAll client contracts are governed under US law. We carry proper business documentation and can provide proof of registration upon request.\n\nEngineering and operations are managed globally, which allows us to deliver enterprise-grade quality at competitive timelines and cost.",
  },

  trust: {
    keywords: ['trust', 'reliable', 'credible', 'legit', 'legitimate', 'safe', 'scam', 'real company', 'verified', 'guarantee', 'why choose', 'why webieapp', 'testimonial', 'reviews', 'reputation', 'track record', 'proven', 'experience', 'guarantee'],
    response: "We understand that trust is earned, not stated. Here's what we can point to:\n\n120+ completed projects across 12+ countries. US-registered LLC with contracts under US law. Deep specialization in HIPAA-aware healthcare development. Long-term client relationships — many clients have worked with us across multiple projects. Verifiable portfolio at webieapp.com/portfolio.\n\nWe're happy to provide references, share case studies, or hop on a discovery call before any commitment. What would be most helpful?",
  },

  contact: {
    keywords: ['contact', 'email', 'reach', 'talk', 'speak', 'call', 'schedule', 'book', 'consultation', 'get in touch', 'phone', 'message', 'connect', 'meeting', 'discuss', 'start a project', 'work with you', 'hire', 'quote', 'proposal', 'free consultation', 'discovery call'],
    response: "The best ways to reach us:\n\nEmail: info@webieapp.com\nContact form: webieapp.com/contact\nABA consulting calls: webieapp.com/autism-consulting\n\nWe typically respond within one business day. For discovery calls, we'll ask about your project goals, timeline, and budget before making any recommendations — no pressure, no pitch.",
  },

  pricing: {
    keywords: ['price', 'pricing', 'cost', 'how much', 'rates', 'fee', 'budget', 'quote', 'estimate', 'cheap', 'expensive', 'affordable', 'charge', 'invoice', 'payment', 'hourly', 'monthly', 'retainer', 'fixed price', 'project cost', 'what does it cost'],
    response: "We don't publish a fixed price list — every project is scoped based on actual requirements, not templates.\n\nWhat affects cost: complexity, features, integrations, design scope, and timeline. A simple business website is very different from a full SaaS platform with billing and multi-tenancy.\n\nThe most useful thing I can do is help you define scope before you talk to the team. What are you building?",
  },

  process: {
    keywords: ['process', 'how do you work', 'workflow', 'how does it work', 'steps', 'methodology', 'approach', 'development process', 'timeline', 'how long', 'project timeline', 'phases', 'agile', 'sprints', 'kickoff'],
    response: "Our typical engagement runs in clear phases:\n\n1. Discovery — we learn your goals, users, and constraints. Usually 1–2 calls.\n2. Proposal — scope, timeline, and investment estimate delivered within 48 hours.\n3. Design — wireframes and UI/UX before any code is written.\n4. Development — iterative builds with regular demos and feedback loops.\n5. QA & Launch — testing, performance optimization, and deployment.\n6. Post-launch support — we don't disappear after go-live.\n\nTimelines vary: 3–6 weeks for websites, 8–16 weeks for SaaS products.\n\nWhat kind of project are you planning?",
  },

  portfolio: {
    keywords: ['portfolio', 'work', 'projects', 'clients', 'examples', 'case study', 'past work', 'show me', 'samples', 'what have you built', 'previous work', 'clients you worked with', 'your projects', 'case studies', 'what projects'],
    response: "We've worked across a wide range of industries — ABA and autism clinics, healthcare platforms, SaaS products, logistics, government services, and NGOs.\n\nKey clients include: Bloomvera Autism, Dove Autism, Dove Health Services, Autism Violet, BrightPath Autism, Alliance Behavioral Therapy, Safe Home of Maryland, Decoder Health, Gentle Hearts Home Health, Vital Trust Health LLC, Safe Ride Delivery, and Know Liberia.\n\nFull portfolio at webieapp.com/portfolio.\n\nIs there a specific industry or project type you'd like to know more about?",
  },

  // ── Individual portfolio projects ────────────────────────────────
  projects: {
    safeRide: {
      keywords: ['safe ride', 'safe ride delivery', 'logistics', 'delivery platform', 'transportation', 'ride platform'],
      response: "Safe Ride Delivery is a logistics and transportation platform we built from scratch — a multi-sided marketplace connecting drivers, dispatchers, and clients with real-time tracking, route optimization, and automated billing.\n\nTech stack: React, Node.js, Google Maps API, Stripe. The platform handles live dispatch, driver onboarding, and client-facing booking flows.\n\nWant to know more about the technical architecture or outcomes?",
    },
    knowLiberia: {
      keywords: ['know liberia', 'liberia platform', 'liberia website', 'liberia project', 'liberia portal'],
      response: "Know Liberia is a digital platform built to support Liberia's international visibility — covering tourism, investment, government services, and civic information.\n\nBuilt mobile-first given local connectivity constraints. Designed to serve both local users and the Liberian diaspora internationally.\n\nThis project is part of our broader West Africa digital infrastructure work. More at webieapp.com/liberia.",
    },
    autismViolet: {
      keywords: ['autism violet', 'violet', 'autism violet project'],
      response: "Autism Violet is an ABA therapy brand we helped build from the ground up — brand identity, HIPAA-aware website, intake systems, and digital marketing for patient acquisition.\n\nThis is a representative example of our full-stack ABA business launch service, from brand positioning to the first inquiry in the door.",
    },
    doveAutism: {
      keywords: ['dove autism', 'dove health', 'dove', 'dove autism services'],
      response: "Dove Autism and Dove Health Services are two related healthcare clients we've worked with on branding, website development, and patient acquisition strategy.\n\nBoth projects involved HIPAA-aware architecture, accessibility compliance, and SEO-optimized content targeting families searching for ABA services.",
    },
    bloomvera: {
      keywords: ['bloomvera', 'bloomvera autism'],
      response: "Bloomvera Autism is one of our flagship ABA clients — a full-service engagement covering business formation support, brand identity, website, SEO, and ongoing digital marketing.\n\nThe website was built with a strong focus on parent-facing UX, trust signals, and conversion-optimized intake flows.",
    },
    safeHome: {
      keywords: ['safe home', 'safe home of maryland', 'maryland', 'home health', 'safe home maryland'],
      response: "Safe Home of Maryland is a home health agency we worked with on website development, branding, and digital marketing.\n\nThe project focused on building credibility for a regulated healthcare provider — clean design, clear service descriptions, and SEO targeting families searching for home care in Maryland.",
    },
    decoderHealth: {
      keywords: ['decoder health', 'decoder', 'health decoder'],
      response: "Decoder Health is a healthcare technology client we supported with platform development and product design — focused on simplifying health data interpretation for patients and providers.",
    },
    gentleHearts: {
      keywords: ['gentle hearts', 'gentle hearts hha', 'home health agency', 'gentle hearts home health'],
      response: "Gentle Hearts Home Health Agency is a client we helped with website development and digital presence — building a professional, trustworthy brand for a licensed home health provider.",
    },
    vitalTrust: {
      keywords: ['vital trust', 'vital trust health', 'vitaltrust'],
      response: "Vital Trust Health LLC is a healthcare client we worked with on branding and digital infrastructure — building out their web presence and patient communication systems.",
    },
    brightPath: {
      keywords: ['brightpath', 'bright path', 'brightpath autism'],
      response: "BrightPath Autism is an ABA therapy client we supported with brand development, website launch, and initial patient acquisition strategy — part of our turnkey ABA business launch service.",
    },
    alliance: {
      keywords: ['alliance behavioral', 'alliance behavioral therapy', 'alliance therapy', 'alliance'],
      response: "Alliance Behavioral Therapy is an ABA practice we worked with on website development, branding, and SEO — focused on building a strong local digital presence for families searching for behavioral health services.",
    },
  },

  liberia: {
    keywords: ['liberia', 'africa', 'west africa', 'government', 'liberian', 'monrovia', 'west african', 'liberia digital', 'liberia government', 'liberia business', 'liberia property', 'liberia investment', 'liberia logistics', 'digital transformation africa', 'digital africa'],
    response: "We've been doing digital infrastructure work in Liberia for several years — one of the few agencies with hands-on experience in that market.\n\nProjects include: government service portals, civic information platforms, business digitization programs, a logistics platform, and a property investment platform.\n\nAll work is built mobile-first given local connectivity realities. We also provide capacity building — training local teams to manage and grow platforms independently.\n\nMore at webieapp.com/liberia. What specifically are you exploring?",
  },

  hipaa: {
    keywords: ['hipaa', 'compliance', 'healthcare compliance', 'patient data', 'privacy', 'secure', 'health data', 'medical data', 'phi', 'protected health', 'hipaa compliant'],
    response: "HIPAA-aware development is standard practice for all our healthcare work — not an add-on.\n\nThat means: encrypted data transmission and storage, proper BAA (Business Associate Agreement) structures, access controls and audit logging, compliant hosting environments, and staff training on data handling best practices.\n\nWe don't just build websites for healthcare providers — we understand the regulatory environment they operate in.",
  },

  stack: {
    keywords: ['technology', 'tech stack', 'technologies', 'what do you use', 'programming', 'language', 'framework', 'react', 'node', 'python', 'database', 'hosting', 'aws', 'cloud', 'tools', 'build with'],
    response: "Our core stack:\n\nFrontend: React, Next.js, TypeScript\nBackend: Node.js, Python, REST and GraphQL APIs\nDatabase: PostgreSQL, MongoDB, Firebase\nCloud: AWS, Vercel, DigitalOcean\nPayments: Stripe\nDesign: Figma\nCMS: Sanity, Contentful (when clients need content control)\n\nWe're technology-pragmatic — we use what's right for the project, not what's fashionable. What kind of project are you planning?",
  },

  support: {
    keywords: ['support', 'maintenance', 'after launch', 'post launch', 'updates', 'ongoing', 'retainer', 'help after', 'manage', 'maintain', 'bug fix', 'changes'],
    response: "We offer post-launch support and maintenance retainers for all project types.\n\nThat includes: bug fixes, performance monitoring, feature updates, content changes, security patches, and hosting management.\n\nWe don't disappear after launch — most clients stay with us long-term across multiple projects and phases.\n\nWant to know more about retainer options?",
  },

  fallback: "I want to give you a useful answer — could you rephrase or give me a bit more context?\n\nI can help with questions about our services, past projects, the team, pricing approach, process, or how to get in touch.",
};

// ── Page-specific greetings ───────────────────────────────────────
const PAGE_GREETINGS = {
  '/':                  "Hi, welcome to WebieApp. I can help you explore our services, review past work, or answer questions about your specific project. What brings you here?",
  '/services':          "Hi. I can walk you through any of our services in detail — websites, SaaS platforms, SEO, design, marketing, or ABA consulting. What are you considering?",
  '/about':             "Hi. Happy to answer questions about our team, how we work, our background, or why clients choose us. What would you like to know?",
  '/portfolio':         "Hi. You're browsing our portfolio — 120+ projects across healthcare, SaaS, autism services, government, and more. Is there a particular type of project or client you're curious about?",
  '/contact':           "Hi. If you have questions before reaching out, I can help. Otherwise, the contact form or info@webieapp.com works well — we usually respond within one business day.",
  '/autism-consulting': "Hi. You're looking at our ABA and autism consulting services — this is one of our deepest specialties. We've helped BCBAs and healthcare entrepreneurs across the US launch and grow practices. What stage is your project at?",
  '/liberia':           "Hi. You're on our Liberia page. We've done significant digital infrastructure work across Liberia — government portals, business digitization, logistics, and more. What are you exploring?",
};

// ── Quick actions by page ─────────────────────────────────────────
const QUICK_ACTIONS_BY_PAGE = {
  '/': [
    { label: 'Website Development', icon: 'Globe',     prompt: 'Tell me about website development' },
    { label: 'SaaS Platforms',      icon: 'Zap',       prompt: 'Tell me about SaaS development' },
    { label: 'ABA Consulting',      icon: 'Heart',     prompt: 'Tell me about autism ABA consulting' },
    { label: 'Past Work',           icon: 'Briefcase', prompt: 'Show me your portfolio and past projects' },
  ],
  '/services': [
    { label: 'Website Development', icon: 'Globe',      prompt: 'Tell me about website development' },
    { label: 'SaaS Platforms',      icon: 'Zap',        prompt: 'Tell me about SaaS development' },
    { label: 'SEO Services',        icon: 'TrendingUp', prompt: 'Tell me about SEO services' },
    { label: 'ABA Consulting',      icon: 'Heart',      prompt: 'Tell me about autism ABA consulting' },
  ],
  '/portfolio': [
    { label: 'ABA & Healthcare',    icon: 'Heart',     prompt: 'Tell me about your ABA and healthcare projects' },
    { label: 'SaaS Projects',       icon: 'Zap',       prompt: 'Tell me about your SaaS projects' },
    { label: 'Liberia Projects',    icon: 'Map',       prompt: 'Tell me about your Liberia projects' },
    { label: 'Contact the Team',    icon: 'Mail',      prompt: 'How do I contact you?' },
  ],
  '/autism-consulting': [
    { label: 'Launch an ABA Clinic', icon: 'Heart',     prompt: 'How do you help launch an ABA clinic?' },
    { label: 'HIPAA Development',    icon: 'Info',      prompt: 'Tell me about HIPAA compliant development' },
    { label: 'ABA Marketing',        icon: 'TrendingUp', prompt: 'Tell me about marketing for ABA clinics' },
    { label: 'Book a Call',          icon: 'Mail',      prompt: 'How do I book a discovery call?' },
  ],
  '/liberia': [
    { label: 'Government Projects',  icon: 'Globe',     prompt: 'Tell me about your Liberia government projects' },
    { label: 'Business Digitization',icon: 'Briefcase', prompt: 'Tell me about business digitization in Liberia' },
    { label: 'Get in Touch',         icon: 'Mail',      prompt: 'How do I contact you?' },
    { label: 'Our Services',         icon: 'Layers',    prompt: 'What services do you offer?' },
  ],
  default: [
    { label: 'Our Services',     icon: 'Layers',    prompt: 'What services do you offer?' },
    { label: 'Past Work',        icon: 'Briefcase', prompt: 'Show me your portfolio and past projects' },
    { label: 'ABA Consulting',   icon: 'Heart',     prompt: 'Tell me about autism ABA consulting' },
    { label: 'Get in Touch',     icon: 'Mail',      prompt: 'How do I contact you?' },
  ],
};

// ── Smart intent matcher ──────────────────────────────────────────
function matchIntent(input, conversationHistory = []) {
  const raw  = input.toLowerCase().trim();
  // Normalize common contractions and abbreviations
  const text = raw
    .replace(/what's/g, 'what is')
    .replace(/you're/g, 'you are')
    .replace(/don't/g, 'do not')
    .replace(/i'm/g, 'i am')
    .replace(/can't/g, 'cannot')
    .replace(/it's/g, 'it is');

  // ── Exact greeting match first ────────────────────────────────
  if (KB.greeting.keywords.some(k => text === k || text === k + '!' || text === k + '.')) {
    return KB.greeting.response;
  }

  // ── Thanks ────────────────────────────────────────────────────
  if (KB.thanks.keywords.some(k => text.includes(k))) {
    return KB.thanks.response;
  }

  // ── Score all intents ─────────────────────────────────────────
  const candidates = [];

  // Services
  for (const [, entry] of Object.entries(KB.services)) {
    const score = scoreKeywords(text, entry.keywords);
    if (score > 0) candidates.push({ score, response: entry.response });
  }

  // Portfolio projects
  for (const [, entry] of Object.entries(KB.projects)) {
    const score = scoreKeywords(text, entry.keywords);
    if (score > 0) candidates.push({ score, response: entry.response });
  }

  // Top-level intents
  const topLevel = [
    KB.about, KB.registration, KB.trust, KB.contact,
    KB.pricing, KB.process, KB.portfolio, KB.liberia,
    KB.hipaa, KB.stack, KB.support,
  ];
  for (const entry of topLevel) {
    const score = scoreKeywords(text, entry.keywords);
    if (score > 0) candidates.push({ score, response: entry.response });
  }

  if (candidates.length === 0) {
    // ── Context-aware fallback: check last assistant message ─────
    const lastAssistant = [...conversationHistory].reverse().find(m => m.role === 'assistant');
    if (lastAssistant && text.length < 20) {
      // Short follow-up — try to continue context
      if (lastAssistant.content.includes('ABA') || lastAssistant.content.includes('autism')) {
        return KB.services.autism.response;
      }
      if (lastAssistant.content.includes('website') || lastAssistant.content.includes('web')) {
        return KB.services.web.response;
      }
      if (lastAssistant.content.includes('SaaS') || lastAssistant.content.includes('platform')) {
        return KB.services.saas.response;
      }
    }
    return KB.fallback;
  }

  // Return highest scoring response
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0].response;
}

// ── State management ──────────────────────────────────────────────
const initialState = {
  messages: [], quickActions: [],
  isOpen: false, isTyping: false,
  showBubble: false, showQuickActions: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_BUBBLE':  return { ...state, showBubble: true };
    case 'OPEN':         return { ...state, isOpen: true };
    case 'CLOSE':        return { ...state, isOpen: false };
    case 'SET_TYPING':   return { ...state, isTyping: action.payload };
    case 'ADD_MESSAGE':  return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_GREETING': return { ...state, messages: [{ role: 'assistant', content: action.payload, timestamp: new Date() }], quickActions: action.quickActions || [] };
    case 'HIDE_QA':      return { ...state, showQuickActions: false };
    default: return state;
  }
}

// ── Format message with inline links ─────────────────────────────
function formatMessage(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(webieapp\.com\/[\w-]+|info@webieapp\.com)/g);
    const rendered = parts.map((part, j) => {
      if (/^webieapp\.com\//.test(part)) {
        return (
          <a key={j} href={`https://${part}`} target="_blank" rel="noopener noreferrer"
            style={{ color: '#00C8A8', textDecoration: 'none', borderBottom: '1px solid rgba(0,200,168,0.3)', paddingBottom: '1px', fontSize: 'inherit' }}>
            {part}
          </a>
        );
      }
      if (/^info@webieapp\.com$/.test(part)) {
        return (
          <a key={j} href={`mailto:${part}`}
            style={{ color: '#00C8A8', textDecoration: 'none', borderBottom: '1px solid rgba(0,200,168,0.3)', paddingBottom: '1px', fontSize: 'inherit' }}>
            {part}
          </a>
        );
      }
      return part;
    });
    return <span key={i}>{rendered}{i < arr.length - 1 && <br />}</span>;
  });
}

// ── Typing indicator ──────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <AssistantAvatar size={28} />
      <div style={{
        display: 'flex', gap: 5, alignItems: 'center',
        padding: '10px 14px', borderRadius: '4px 16px 16px 16px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {[0, 0.18, 0.36].map((delay, i) => (
          <motion.span key={i}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#94A3B8', display: 'block' }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Assistant avatar ──────────────────────────────────────────────
function AssistantAvatar({ size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, rgba(0,200,168,0.2) 0%, rgba(8,145,178,0.2) 100%)',
      border: '1px solid rgba(0,200,168,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
      </svg>
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const time   = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 10 }}
    >
      {!isUser && <AssistantAvatar size={28} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '80%', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div style={{
          padding: '11px 15px',
          fontSize: 13.5, lineHeight: 1.68,
          fontFamily: 'Inter, sans-serif',
          borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
          background: isUser
            ? 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)'
            : 'rgba(255,255,255,0.06)',
          border: isUser ? 'none' : '1px solid rgba(255,255,255,0.09)',
          color: isUser ? '#fff' : '#E2E8F0',
          fontWeight: 400, letterSpacing: '0.01em',
          wordBreak: 'break-word',
        }}>
          {formatMessage(message.content)}
        </div>
        <span style={{ fontSize: 10, color: '#475569', letterSpacing: '0.02em' }}>{time}</span>
      </div>
    </motion.div>
  );
}

// ── Quick action card ─────────────────────────────────────────────
function QACard({ action, onClick, index }) {
  const IconComp = Icon[action.icon] || Icon.Info;
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(action.prompt)}
      style={{
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '9px 13px', borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        fontSize: 12.5, fontWeight: 450,
        color: '#CBD5E0', textAlign: 'left',
        transition: 'border-color 0.2s, background 0.2s, color 0.2s',
        width: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,200,168,0.3)';
        e.currentTarget.style.background  = 'rgba(0,200,168,0.06)';
        e.currentTarget.style.color       = '#E2E8F0';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
        e.currentTarget.style.background  = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.color       = '#CBD5E0';
      }}
    >
      <span style={{ color: '#00C8A8', display: 'flex', flexShrink: 0 }}><IconComp /></span>
      <span style={{ flex: 1 }}>{action.label}</span>
      <span style={{ color: '#475569', display: 'flex' }}><Icon.ArrowRight /></span>
    </motion.button>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function AIAssistant() {
  const location = useLocation();
  const { isDark } = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const hasInit        = useRef(false);
  const isMobile       = typeof window !== 'undefined' && window.innerWidth < 640;

  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: 'SHOW_BUBBLE' }), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!state.isOpen || hasInit.current) return;
    hasInit.current = true;
    const greeting = PAGE_GREETINGS[location.pathname] || PAGE_GREETINGS['/'];
    const qas      = QUICK_ACTIONS_BY_PAGE[location.pathname] || QUICK_ACTIONS_BY_PAGE.default;
    dispatch({ type: 'SET_GREETING', payload: greeting, quickActions: qas });
  }, [state.isOpen, location.pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isTyping]);

  useEffect(() => {
    if (state.isOpen) setTimeout(() => inputRef.current?.focus(), 400);
  }, [state.isOpen]);

  const addMessage = useCallback((role, content) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { role, content, timestamp: new Date() } });
  }, []);

  const handleSend = useCallback(async (textOverride) => {
    const text = (textOverride || inputValue).trim();
    if (!text) return;
    setInputValue('');
    dispatch({ type: 'HIDE_QA' });
    addMessage('user', text);

    dispatch({ type: 'SET_TYPING', payload: true });
    const response = matchIntent(text, state.messages);
    const delay    = 500 + Math.min(response.length * 1.1, 900);
    await new Promise(r => setTimeout(r, delay));
    dispatch({ type: 'SET_TYPING', payload: false });
    addMessage('assistant', response);
  }, [inputValue, addMessage, state.messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const canSend = inputValue.trim() && !state.isTyping;

  return (
    <>
      {/* ── Floating trigger ─────────────────────────────── */}
      <AnimatePresence>
        {state.showBubble && !state.isOpen && (
          <motion.div
            key="trigger"
            initial={{ scale: 0, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 10, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            style={{
              position: 'fixed', bottom: 28, right: 28, zIndex: 9000,
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
            }}
          >
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '7px 13px', borderRadius: '10px 10px 2px 10px',
                background: 'rgba(13,22,34,0.92)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                pointerEvents: 'none',
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8', margin: 0, letterSpacing: '0.015em', whiteSpace: 'nowrap', fontWeight: 400 }}>
                Need help?
              </p>
            </motion.div>

            {/* Button */}
            <motion.button
              onClick={() => dispatch({ type: 'OPEN' })}
              aria-label="Open assistant"
              animate={{ y: [0, -5, 0], scale: [1, 1.015, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.5, ease: [0.45, 0, 0.55, 1] }}
              whileHover={{ scale: 1.07, y: -2, transition: { duration: 0.22, ease: 'easeOut' } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              style={{
                width: 52, height: 52, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)',
                boxShadow: '0 8px 24px rgba(0,200,168,0.28), 0 2px 8px rgba(0,0,0,0.18)',
                border: 'none', cursor: 'pointer', position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,200,168,0.38), 0 2px 8px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,200,168,0.28), 0 2px 8px rgba(0,0,0,0.18)'; }}
            >
              <span style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.Chat />
              </span>
              <span style={{ position: 'absolute', top: 3, right: 3, width: 9, height: 9, borderRadius: '50%', background: '#4ADE80', border: '2px solid #091420' }}>
                <motion.span
                  style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1.5px solid rgba(74,222,128,0.45)' }}
                  animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
                />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ───────────────────────────────────── */}
      <AnimatePresence>
        {state.isOpen && (
          <>
            {isMobile && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: 'fixed', inset: 0, zIndex: 8999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                onClick={() => dispatch({ type: 'CLOSE' })}
              />
            )}

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              role="dialog"
              aria-label="WebieApp Assistant"
              aria-modal
              style={{
                position: 'fixed', zIndex: 9000,
                bottom: isMobile ? 0 : 28,
                right:  isMobile ? 0 : 28,
                left:   isMobile ? 0 : 'auto',
                top:    isMobile ? 0 : 'auto',
                width:  isMobile ? '100%' : 400,
                height: isMobile ? '100%' : 620,
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                background: 'linear-gradient(160deg, #0D1B2A 0%, #0A1520 60%, #080D12 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: isMobile ? 0 : 18,
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,200,168,0.06)',
              }}
            >
              {/* ── Header ─────────────────────────────── */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,200,168,0.18) 0%, rgba(8,145,178,0.18) 100%)',
                      border: '1px solid rgba(0,200,168,0.22)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#00C8A8" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4"/>
                        <path d="M20 21a8 8 0 1 0-16 0"/>
                      </svg>
                    </div>
                    <span style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 9, height: 9, borderRadius: '50%',
                      background: '#4ADE80', border: '2px solid #0A1520',
                      boxShadow: '0 0 5px rgba(74,222,128,0.5)',
                    }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13.5, color: '#F1F5F9', margin: 0, letterSpacing: '0.01em' }}>
                      WebieApp Assistant
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#4ADE80', margin: 0, letterSpacing: '0.02em', marginTop: 1 }}>
                      Online&nbsp;&nbsp;·&nbsp;&nbsp;Usually replies instantly
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => dispatch({ type: 'CLOSE' })}
                  aria-label="Close"
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer', color: '#64748B',
                    transition: 'color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  <Icon.Close />
                </button>
              </div>

              {/* ── Messages ───────────────────────────── */}
              <div
                role="log" aria-live="polite"
                style={{
                  flex: 1, overflowY: 'auto',
                  padding: '20px 16px',
                  display: 'flex', flexDirection: 'column', gap: 16,
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.08) transparent',
                }}
              >
                {state.messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}

                {state.showQuickActions && state.messages.length === 1 && state.quickActions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 4 }}
                    role="group" aria-label="Suggested topics"
                  >
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#475569', margin: '0 0 2px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Common questions
                    </p>
                    {state.quickActions.map((qa, i) => (
                      <QACard key={i} action={qa} index={i} onClick={handleSend} />
                    ))}
                  </motion.div>
                )}

                {state.isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Input ──────────────────────────────── */}
              <div style={{
                flexShrink: 0,
                padding: '12px 14px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'border-color 0.2s',
                  }}
                  onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(0,200,168,0.35)'}
                  onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about services, projects, or your requirements…"
                    aria-label="Message"
                    disabled={state.isTyping}
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      fontFamily: 'Inter, sans-serif', fontSize: 13.5,
                      color: '#E2E8F0', caretColor: '#00C8A8',
                    }}
                  />
                  <motion.button
                    onClick={() => handleSend()}
                    disabled={!canSend}
                    whileTap={canSend ? { scale: 0.92 } : {}}
                    aria-label="Send"
                    style={{
                      width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: canSend
                        ? 'linear-gradient(135deg, #00C8A8 0%, #0891b2 100%)'
                        : 'rgba(255,255,255,0.06)',
                      border: 'none',
                      cursor: canSend ? 'pointer' : 'default',
                      color: canSend ? '#fff' : '#334155',
                      transition: 'background 0.2s',
                    }}
                  >
                    <Icon.Send />
                  </motion.button>
                </div>

                {/* Footer branding */}
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: '#334155', textAlign: 'center', margin: '8px 0 0', letterSpacing: '0.02em' }}>
                  WebieApp · webieapp.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}