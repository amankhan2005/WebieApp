// ═══════════════════════════════════════════════════════════
// WEBIEAPP SOLUTIONS LLC — SITE CONTENT DATA
// Single source of truth for all website content
// ═══════════════════════════════════════════════════════════

// ── Navigation ──────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',              path: '/' },
  { label: 'About',             path: '/about' },
  { label: 'Services',          path: '/services' },
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
  email:        'webieapp@gmail.com',
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
