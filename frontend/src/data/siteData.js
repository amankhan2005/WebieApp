// ═══════════════════════════════════════════════════════════
// WEBIEAPP SOLUTIONS LLC — SITE CONTENT DATA
// Single source of truth for all website content
// ═══════════════════════════════════════════════════════════

// ── Navigation ──────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',              path: '/' },
  { label: 'About',             path: '/about-us' },
  { label: 'Services',          path: '/our-services' },
  { label: 'Portfolio',         path: '/portfolio' },
  { label: 'Autism Consulting', path: '/autism-consulting' },
  { label: 'Liberia',           path: '/liberia' },
 ];

// ── Company Info ─────────────────────────────────────────────────
export const COMPANY = {
  name:         'WebieApp Solutions LLC',
  shortName:    'WebieApp',
  tagline:      'Premium Digital Solutions. Enterprise Execution.',
  description:  'A US-registered technology and digital consultancy delivering bespoke web products, SaaS platforms, and specialized Autism & ABA business consulting to clients across the globe.',
  registration: 'Registered in Kentucky, USA',
  email:        'info@webieapp.com',
  phone:        '',
  offices: {
    usa: {
      label:    'USA Registered Office',
      line1:    '212 N. 2nd St. STE 100',
      line2:    'Richmond, KY 40475',
      country:  'United States',
      flag:     '🇺🇸',
    },
    india: {
      label:    'India Operations Office',
      line1:    'Vibhuti Khand',
      line2:    'Lucknow, India',
      country:  'India',
      flag:     '🇮🇳',
    },
  },
  social: {
    linkedin:  'https://www.linkedin.com/company/webieapp-solutions-pvt-ltd',
    // twitter:   '#',
    instagram: 'https://www.instagram.com/webieapp_solutions',
    facebook:  'https://www.facebook.com/webieapp',
  },
};

// ── Services ──────────────────────────────────────────────────────
export const SERVICES = [
  {
    id:          'website-development',
    slug:        'website-development',
    icon:        'Globe',
    title:       'Website Development',
    short:       'Bespoke websites engineered for performance, conversion, and brand authority.',
    description: 'We architect and develop fully custom websites — no templates, no shortcuts. Every site is built with clean, maintainable code, optimized for Core Web Vitals, structured for SEO, and designed to convert visitors into clients.',
    idealFor:    'Businesses, clinics, startups, and enterprises needing a credible, high-performance online presence.',
    benefits: [
      'Custom design — zero templates, ever',
      'Core Web Vitals 90+ performance',
      'Mobile-first, pixel-perfect responsive',
      'SEO-ready architecture from day one',
      'CMS integration (headless or traditional)',
      'Ongoing maintenance available',
    ],
    process: ['Discovery & strategy', 'Wireframes & design', 'Development & QA', 'Launch & optimization'],
    color:   '#00C8A8',
    featured: true,
  },
  {
    id:          'saas-development',
    slug:        'saas-development',
    icon:        'Zap',
    title:       'SaaS Development',
    short:       'Full-stack SaaS platforms engineered to scale from MVP to enterprise.',
    description: 'From idea to production, we design and develop complete SaaS products — multi-tenant architecture, Stripe billing integration, role-based access control, admin dashboards, and API-first design built to scale.',
    idealFor:    'Founders and enterprises looking to launch or scale a software product.',
    benefits: [
      'Multi-tenant architecture',
      'Stripe billing & subscription management',
      'Role-based access control',
      'API-first design patterns',
      'Admin dashboard included',
      'Cloud-native AWS/GCP deployment',
    ],
    process: ['Product architecture', 'UI/UX design', 'Iterative development', 'Beta & launch'],
    color:   '#7C3AED',
    featured: true,
  },
  {
    id:          'seo',
    slug:        'seo',
    icon:        'TrendingUp',
    title:       'Search Engine Optimization',
    short:       'Data-driven SEO strategies that produce sustainable organic growth.',
    description: 'We implement comprehensive SEO programs — technical audits, keyword strategy, on-page optimization, content creation, and authority building — all measured by rankings, traffic, and revenue impact.',
    idealFor:    'Businesses wanting more organic traffic, qualified leads, and lower customer acquisition costs.',
    benefits: [
      'Technical SEO audit & remediation',
      'Keyword strategy & competitor analysis',
      'On-page & content optimization',
      'Authority link building',
      'Schema markup & structured data',
      'Monthly performance reporting',
    ],
    process: ['Audit & analysis', 'Strategy planning', 'Implementation', 'Monitoring & reporting'],
    color:   '#059669',
    featured: true,
  },
  {
    id:          'digital-marketing',
    slug:        'digital-marketing',
    icon:        'Target',
    title:       'Digital Marketing',
    short:       'Performance marketing campaigns that deliver measurable, auditable ROI.',
    description: 'Integrated digital marketing — Google Ads, Meta Ads, email campaigns, and conversion optimization — all tied to clear KPIs with transparent monthly reporting and continuous optimization.',
    idealFor:    'Businesses wanting to accelerate growth through paid and owned digital channels.',
    benefits: [
      'Google & Meta Ads management',
      'Email marketing & automation',
      'Conversion rate optimization',
      'A/B testing & experimentation',
      'Full-funnel analytics & attribution',
      'Monthly strategy reviews',
    ],
    process: ['Audit & goal setting', 'Campaign build', 'Launch & optimize', 'Scale & report'],
    color:   '#DC2626',
    featured: false,
  },
  {
    id:          'social-media',
    slug:        'social-media-management',
    icon:        'Share2',
    title:       'Social Media Management',
    short:       'Strategic social presence that builds authority and drives qualified engagement.',
    description: 'End-to-end social media management — content strategy, professional content creation, scheduling, community management, and growth analytics across LinkedIn, Instagram, Facebook, and X.',
    idealFor:    'Businesses wanting consistent, high-quality social presence without the in-house overhead.',
    benefits: [
      'Platform-specific content strategy',
      'Professional content creation',
      'Consistent scheduling & publishing',
      'Community engagement management',
      'Growth analytics & reporting',
      'Influencer partnership coordination',
    ],
    process: ['Audit & strategy', 'Content system', 'Execution', 'Analyze & refine'],
    color:   '#0EA5E9',
    featured: false,
  },
  {
    id:          'ui-ux-design',
    slug:        'ui-ux-design',
    icon:        'Layers',
    title:       'UI/UX Design',
    short:       'Human-centered design systems that convert visitors into loyal customers.',
    description: 'We design digital experiences grounded in user research, behavioral psychology, and brand strategy. Every interface is beautiful, intuitive, accessible, and engineered to perform — not just impress.',
    idealFor:    'Companies needing product design, app redesigns, or brand-aligned design systems.',
    benefits: [
      'User research & persona development',
      'Wireframing & rapid prototyping',
      'High-fidelity Figma design systems',
      'Interactive prototypes for testing',
      'Accessibility (WCAG 2.1 AA) compliance',
      'Developer-ready design handoff',
    ],
    process: ['Research & discovery', 'Wireframes', 'Visual design', 'Prototype & test'],
    color:   '#F59E0B',
    featured: true,
  },
  {
    id:          'autism-consulting',
    slug:        'autism-aba-consulting',
    icon:        'Heart',
    title:       'Autism & ABA Consulting',
    short:       'Complete business consulting for ABA clinic entrepreneurs across the USA.',
    description: 'A comprehensive consulting program for professionals launching Autism and ABA therapy clinics in the United States — covering business formation, digital infrastructure, branding, marketing, and ongoing growth.',
    idealFor:    'BCBAs, healthcare entrepreneurs, and business owners wanting to launch or scale ABA/Autism clinics in the USA.',
    benefits: [
      'Business formation & operational guidance',
      'Clinic website (HIPAA-aware)',
      'Brand identity & visual design',
      'Digital marketing & patient acquisition',
      'Practice management system guidance',
      'Ongoing monthly advisory support',
    ],
    process: ['Discovery call', 'Business planning', 'Build & launch', 'Grow & scale'],
    color:   '#00C8A8',
    featured: true,
    isSpecialty: true,
  },
];

// ── Projects / Portfolio ──────────────────────────────────────────
export const PROJECTS = [
  {
    id:          1,
    title:       'Spectrum ABA Clinic Platform',
    categories:  ['Autism & ABA', 'Healthcare'],
    description: 'Complete digital ecosystem for a multi-location ABA therapy clinic — patient booking, intake forms, therapist portal, and a HIPAA-aware marketing site.',
    tech:        ['React', 'Node.js', 'MongoDB', 'Stripe', 'Twilio'],
    results:     '3× patient inquiries within 60 days of launch',
    featured:    true,
    year:        '2024',
  },
  {
    id:          2,
    title:       'HealthBridge Practice Management SaaS',
    categories:  ['Healthcare', 'SaaS'],
    description: 'Multi-tenant practice management SaaS for therapy providers — real-time scheduling, billing, insurance verification, and compliance reporting.',
    tech:        ['Next.js', 'PostgreSQL', 'AWS', 'Stripe', 'HIPAA'],
    results:     '200+ clinics onboarded in first year',
    featured:    true,
    year:        '2024',
  },
  {
    id:          3,
    title:       'BrightPath ABA Brand & Website',
    categories:  ['Autism & ABA', 'Web Development'],
    description: 'Complete brand identity and website for a new ABA clinic launch in Atlanta — logo, design system, and conversion-optimized marketing site.',
    tech:        ['React', 'Framer Motion', 'Contentful', 'Vercel'],
    results:     'Fully operational within 90 days of engagement',
    featured:    false,
    year:        '2024',
  },
  {
    id:          4,
    title:       'D2C E-Commerce Growth Platform',
    categories:  ['Web Development', 'Marketing'],
    description: 'High-performance custom storefront for a US D2C brand — AI-powered product recommendations, real-time inventory, and integrated loyalty program.',
    tech:        ['React', 'Node.js', 'Redis', 'Cloudinary', 'Stripe'],
    results:     '42% revenue increase in Q1 post-launch',
    featured:    false,
    year:        '2023',
  },
  {
    id:          5,
    title:       'Autism Resource Mobile App',
    categories:  ['Autism & ABA', 'Mobile Apps'],
    description: 'Parent-facing mobile app for tracking ABA therapy progress, session notes, behavior graphs, and real-time communication with therapists.',
    tech:        ['React Native', 'Firebase', 'Node.js', 'Expo'],
    results:     '4.8★ App Store rating · 5,000+ downloads',
    featured:    true,
    year:        '2024',
  },
  {
    id:          6,
    title:       'Liberia Digital Gov Services Portal',
    categories:  ['Web Development', 'SaaS'],
    description: 'Government citizen services portal enabling digital registration, document processing, and inter-agency workflows for Liberian public institutions.',
    tech:        ['React', 'Node.js', 'MongoDB', 'AWS', 'Redis'],
    results:     '50,000+ citizens served in first 6 months',
    featured:    false,
    year:        '2023',
  },
  {
    id:          7,
    title:       'FinTech SEO & Content Campaign',
    categories:  ['Marketing'],
    description: 'Full-funnel SEO and content marketing program for a US fintech startup — technical SEO, keyword strategy, and 18 months of content production.',
    tech:        ['Next.js', 'Contentful', 'GA4', 'Ahrefs'],
    results:     '380% organic traffic growth over 12 months',
    featured:    false,
    year:        '2023',
  },
  {
    id:          8,
    title:       'Healthcare SaaS UI/UX Redesign',
    categories:  ['Healthcare', 'SaaS'],
    description: 'Complete UI/UX overhaul of a healthcare SaaS dashboard — research, information architecture, Figma design system, and developer handoff.',
    tech:        ['Figma', 'React', 'Storybook', 'Zeroheight'],
    results:     '68% reduction in onboarding drop-off',
    featured:    false,
    year:        '2024',
  },
];

// ── Portfolio Filter Categories ───────────────────────────────────
export const PROJECT_CATEGORIES = [
  'All',
  'Autism & ABA',
  'Healthcare',
  'SaaS',
  'Web Development',
  'Mobile Apps',
  'Marketing',
];

// ── Statistics ────────────────────────────────────────────────────
export const STATS = [
  { value: 120, suffix: '+', label: 'Projects Delivered',  sublabel: 'Across all categories'  },
  { value: 85,  suffix: '+', label: 'Happy Clients',       sublabel: 'Across 12+ countries'   },
  { value: 7,   suffix: '+', label: 'Years of Excellence', sublabel: 'Since founding'          },
  { value: 12,  suffix: '+', label: 'Countries Served',    sublabel: 'Global reach'            },
];

// ── Testimonials ──────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id:       1,
    name:     'Dr. Sarah Mitchell',
    role:     'Founder',
    company:  'Spectrum ABA Clinic',
    location: 'Austin, TX',
    rating:   5,
    avatar:   'SM',
    text:     'WebieApp understood both the business complexities and the deep sensitivity of serving autism families. From day one, they delivered with precision and genuine care. Our clinic launched with a digital presence that truly reflects the quality of our care.',
    service:  'Autism & ABA Consulting',
  },
  {
    id:       2,
    name:     'James Okonkwo',
    role:     'CTO',
    company:  'HealthBridge Technologies',
    location: 'New York, NY',
    rating:   5,
    avatar:   'JO',
    text:     'The SaaS architecture they built is genuinely world-class. Scalable, clean, and ahead of schedule. I\'ve worked with agencies on three continents — WebieApp is in a different tier entirely. They think like engineers, not vendors.',
    service:  'SaaS Development',
  },
  {
    id:       3,
    name:     'Amara Johnson',
    role:     'CEO',
    company:  'TechForward Inc.',
    location: 'London, UK',
    rating:   5,
    avatar:   'AJ',
    text:     'Premium quality, proactive communication, and results that exceeded every KPI we set. We\'ve made WebieApp our long-term technology partner — they\'re the only agency I\'d recommend without hesitation.',
    service:  'Web Development & SEO',
  },
];

// ── Process Steps ─────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: '01',
    title:  'Discovery',
    desc:   'Deep-dive into your business goals, users, competitors, and technical requirements.',
    icon:   'Search',
  },
  {
    number: '02',
    title:  'Strategy',
    desc:   'Architecture planning, technology selection, and design direction aligned to your goals.',
    icon:   'Map',
  },
  {
    number: '03',
    title:  'Design',
    desc:   'Bespoke UI/UX crafted to your brand — high-fidelity, interactive prototypes before a single line of code.',
    icon:   'Pen',
  },
  {
    number: '04',
    title:  'Build',
    desc:   'Clean, scalable engineering with rigorous QA, code reviews, and milestone reviews throughout.',
    icon:   'Code2',
  },
  {
    number: '05',
    title:  'Launch',
    desc:   'Staged deployment with performance audits, SEO verification, and zero-downtime go-live.',
    icon:   'Rocket',
  },
  {
    number: '06',
    title:  'Grow',
    desc:   'Post-launch partnership — analytics, optimization, and support as your business scales.',
    icon:   'BarChart2',
  },
];

// ── Industries ────────────────────────────────────────────────────
export const INDUSTRIES = [
  { icon: '🏥', name: 'Healthcare & ABA',  desc: 'HIPAA-aware digital solutions' },
  { icon: '⚡', name: 'SaaS & Technology', desc: 'Scalable product engineering'  },
  { icon: '🛒', name: 'E-Commerce',        desc: 'Revenue-focused storefronts'   },
  { icon: '🏦', name: 'Finance & Fintech', desc: 'Secure, compliant platforms'   },
  { icon: '🎓', name: 'Education',         desc: 'EdTech & learning platforms'   },
  { icon: '🏛️', name: 'Government',        desc: 'GovTech digital transformation'},
  { icon: '🏠', name: 'Real Estate',       desc: 'Property tech solutions'       },
  { icon: '🚀', name: 'Startups',          desc: 'MVP to scale-up'               },
];

// ── Autism Consulting FAQs ────────────────────────────────────────
export const AUTISM_FAQS = [
  {
    q: 'Do I need to already have my BCBA certification?',
    a: 'We work with both certified BCBAs and business entrepreneurs partnering with BCBAs. We handle the entire business and digital side — you focus on the clinical mission.',
  },
  {
    q: 'Which states do you serve?',
    a: 'We serve ABA clinic clients across all 50 US states. Our consulting is fully remote and digital, enabling us to work with clients anywhere in the country.',
  },
  {
    q: 'How long does the clinic launch process take?',
    a: 'Typically 60–120 days from initial consultation to launch, depending on the scope and complexity of your clinic. We\'ll give you a precise timeline after our discovery call.',
  },
  {
    q: 'Do you build the clinic website?',
    a: 'Yes — a professional, HIPAA-aware clinic website is a core component of our comprehensive consulting program. It includes booking, intake forms, and patient communication systems.',
  },
  {
    q: 'What does your pricing look like?',
    a: 'Our programs are scoped individually based on your clinic\'s needs, stage, and market. We offer transparent project pricing with no hidden fees. Book a free call to discuss your specific situation.',
  },
  {
    q: 'Do you help with insurance credentialing guidance?',
    a: 'We provide guidance on the business and operational aspects. For clinical compliance and credentialing specifics, we work alongside your compliance advisors to ensure your digital systems align with requirements.',
  },
  {
    q: 'Do you support both clinic-based and home-based ABA models?',
    a: 'Absolutely. Whether you\'re opening a center-based clinic, running a home-based (in-home) practice, or blending both, we tailor your business model, scheduling systems, mileage/payroll setup, and website messaging to fit the delivery model you choose.',
  },
  {
    q: 'Can you set up the page and campaigns to run Google & Meta ads?',
    a: 'Yes. We build conversion-focused landing pages with lead-capture forms, proper tracking (GA4 and Meta Pixel), and ad-ready copy — then help structure Google Ads and Meta campaigns so you can turn ad spend into booked discovery calls.',
  },
  {
    q: 'Do you handle billing, payroll, and credentialing setup too?',
    a: 'We help stand up the systems and workflows behind them — revenue-cycle tooling, timesheet and mileage tracking, payroll setup, and credentialing trackers (NPI, CAQH, payer enrollment) — and coordinate with your billing and compliance specialists where clinical sign-off is required.',
  },
];

// ── Why Choose Us ─────────────────────────────────────────────────
export const WHY_CHOOSE_US = [
  {
    icon:  'Shield',
    title: 'US-Registered Agency',
    desc:  'Legally incorporated in Kentucky, USA — the confidence of working with a legitimate American company with full contractual accountability.',
  },
  {
    icon:  'Fingerprint',
    title: 'Zero Templates. Ever.',
    desc:  'Every solution is custom-engineered from scratch. We never use page builders, generic themes, or template shortcuts.',
  },
  {
    icon:  'Heart',
    title: 'Healthcare-Aware',
    desc:  'Deep experience in healthcare and Autism sector requirements — HIPAA-aware development, patient-trust design, and sensitive communication.',
  },
  {
    icon:  'Globe',
    title: 'Global Reach, Local Standards',
    desc:  'US-based quality standards with delivery capability across 12+ countries — combining the best of both worlds.',
  },
  {
    icon:  'BarChart2',
    title: 'Results-Driven',
    desc:  'We measure success by your business outcomes — leads generated, revenue grown, clinics launched — not just deliverables shipped.',
  },
  {
    icon:  'Users',
    title: 'Long-Term Partners',
    desc:  'We build lasting partnerships, not one-time projects. Most clients work with us for years — because we earn it, every engagement.',
  },
];

// ── Trust Signals ─────────────────────────────────────────────────
export const TRUST_SIGNALS = [
  'US-Registered LLC',
  'Registered · Kentucky, USA',
  'HIPAA-Aware Development',
  'ISO-Aware Practices',
  '12+ Countries Served',
  '7+ Years of Excellence',
  '120+ Projects Delivered',
  'Zero Template Designs',
];

// ── Contact Services Dropdown ─────────────────────────────────────
export const CONTACT_SERVICES = [
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

// ══════════════════════════════════════════════════════════════════
//  ABA CONSULTING — LANDING PAGE DATA
//  Derived from the internal "ABA Company Launch Blueprint" and
//  rewritten for public-facing marketing use.
// ══════════════════════════════════════════════════════════════════

// ── 10-Phase Launch Roadmap (from blueprint phases 1–10) ──────────
export const ABA_ROADMAP = [
  {
    phase: '01',
    title: 'Business Formation',
    desc:  'Entity structure, state & service-model selection, LLC registration, EIN, registered agent, operating agreement, business banking and financial planning.',
    items: ['LLC & EIN', 'Registered Agent', 'Operating Agreement', 'Business Banking'],
  },
  {
    phase: '02',
    title: 'Branding & Digital Presence',
    desc:  'Logo and brand guidelines, domain, a HIPAA-aware website, professional email, business phone & fax, Google Business Profile and social channels — with analytics and Meta Pixel wired in.',
    items: ['Logo & Brand Kit', 'Website', 'Google Business', 'Social + Analytics'],
  },
  {
    phase: '03',
    title: 'Technology Infrastructure',
    desc:  'Clinical software (Motivity / CentralReach), HR & payroll, CRM, secure cloud storage, project management, team communication, AI automation, plus security and backup.',
    items: ['Clinical Software', 'CRM', 'Cloud & Backup', 'AI Automation'],
  },
  {
    phase: '04',
    title: 'Legal & Compliance',
    desc:  'HIPAA and OSHA readiness, employee handbook, privacy policy and terms, and the liability, professional, cyber and workers-comp coverage a compliant practice needs.',
    items: ['HIPAA / OSHA', 'Policies & Handbook', 'Insurance Coverage'],
  },
  {
    phase: '05',
    title: 'Documentation',
    desc:  'Complete employment package (offers, agreements, NDA, HIPAA, I-9/W-4, background checks) and parent package (intake, consents, insurance, handbook) — as fillable PDF forms.',
    items: ['Employment Forms', 'Parent Intake Pack', 'Fillable PDFs'],
  },
  {
    phase: '06',
    title: 'Clinical Operations',
    desc:  'Assessment templates, treatment plans, SOAP and supervision notes, parent-training documentation, progress reports, discharge summaries, clinical SOPs and QA audits.',
    items: ['Treatment Plans', 'SOAP Notes', 'Clinical SOPs', 'QA Audits'],
  },
  {
    phase: '07',
    title: 'Hiring & Credentialing',
    desc:  'Recruit your clinical director, BCBAs, BCaBAs, RBTs and support staff — plus NPI, CAQH and payer enrollment (BCBS, Aetna, Cigna, Optum, Medicaid) with renewal tracking.',
    items: ['Recruit BCBA / RBT', 'NPI & CAQH', 'Payer Enrollment', 'Renewal Tracking'],
  },
  {
    phase: '08',
    title: 'Marketing & Client Acquisition',
    desc:  'Google Ads, Meta campaigns, SEO, social and email marketing, plus physician outreach and school partnerships — feeding a clean lead → verification → authorization → therapy pipeline.',
    items: ['Google & Meta Ads', 'SEO & Social', 'Physician Outreach', 'Lead Pipeline'],
  },
  {
    phase: '09',
    title: 'Billing & Payroll',
    desc:  'A full revenue cycle — session, documentation, claim submission, ERA, payment — with payroll covering timesheets, mileage, bonuses, taxes, quarterly filing and reporting.',
    items: ['Revenue Cycle', 'Claims & ERA', 'Payroll & Taxes', 'Reporting'],
  },
  {
    phase: '10',
    title: 'Scale',
    desc:  'Open additional locations, expand into new states, win school contracts, add telehealth, deepen AI automation, and run KPI dashboards with monthly business reviews.',
    items: ['New Locations', 'New States', 'Telehealth', 'KPI Dashboards'],
  },
];

// ── Service Portfolio (from blueprint "Service Portfolio") ────────
export const ABA_SERVICE_PORTFOLIO = [
  { icon: 'Building',   title: 'Business Formation' },
  { icon: 'Palette',    title: 'Branding & Design' },
  { icon: 'Globe',      title: 'Website Development' },
  { icon: 'Settings',   title: 'Custom Software' },
  { icon: 'Users',      title: 'ABA CRM' },
  { icon: 'FileText',   title: 'Billing Solutions' },
  { icon: 'Shield',     title: 'Credentialing' },
  { icon: 'Megaphone',  title: 'Digital Marketing' },
  { icon: 'TrendingUp', title: 'HR & Payroll' },
  { icon: 'Settings',   title: 'AI Solutions' },
  { icon: 'Clock',      title: 'Maintenance & Support' },
];

// ── Launch Checklist (from blueprint "Launch Checklist") ──────────
export const ABA_LAUNCH_CHECKLIST = [
  'LLC & EIN', 'Logo & Brand', 'Business Phone & Fax', 'HIPAA-Aware Website',
  'Clinical Software', 'Social Media', 'Professional Email', 'Google Business Profile',
  'Company Documentation', 'Liability Insurance', 'Hire BCBA', 'BCBA Bonus Program',
  'Employment Forms', 'Parent Intake Forms', 'Insurance Credentialing', 'Meta & Google Campaigns',
  'Hire RBTs / Therapists', 'Software Training', 'Billing Setup', 'Payroll & Taxes',
  'Quality Assurance', 'Scale-Up Plan',
];

// ── Landing-page stat band ────────────────────────────────────────
export const ABA_STATS = [
  { value: 'All 50', label: 'US States Served' },
  { value: '60–120', label: 'Day Launch Timeline' },
  { value: '10',     label: 'Phase Launch Program' },
  { value: '100%',   label: 'HIPAA-Aware Systems' },
];

// ── Testimonials (representative ABA client outcomes) ─────────────
export const ABA_TESTIMONIALS = [
  {
    quote: 'WebieApp handled everything on the business and digital side so we could focus purely on our clients. We went from an idea to an open, credentialed practice without getting lost in the paperwork.',
    name:  'Clinical Director',
    role:  'Center-Based ABA Practice',
  },
  {
    quote: 'The website and lead form started bringing in real inquiries within weeks of our ads going live. Their setup made it easy to turn ad clicks into booked discovery calls.',
    name:  'Founder & BCBA',
    role:  'Home-Based ABA Provider',
  },
  {
    quote: 'Having one partner coordinate branding, credentialing systems, billing and payroll saved us months. The roadmap gave us a clear, calm path to launch.',
    name:  'Owner',
    role:  'Multi-State ABA Group',
  },
];

// ── US States (for the optional lead-form dropdown) ───────────────
export const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming','Washington D.C.',
];
