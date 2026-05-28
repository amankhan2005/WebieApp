/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand teal — used sparingly as accent
        brand: {
          50:      '#f0fdfb',
          100:     '#ccfbf5',
          200:     '#99f6ea',
          300:     '#5eead4',
          400:     '#2dd4bf',
          DEFAULT: '#00C8A8',
          600:     '#009E85',
          700:     '#007A68',
          800:     '#00574A',
          900:     '#003D35',
        },
        // Premium neutral palette — the soul of the light theme
        ink: {
          950: '#0A0C0E',   // Almost black — hero text
          900: '#111318',   // Primary headings
          800: '#1C2025',   // Secondary headings
          700: '#2E3540',   // Body text
          600: '#4A5568',   // Secondary body
          500: '#6B7A8D',   // Muted text
          400: '#8C9BAD',   // Placeholder
          300: '#B0BBC9',   // Disabled
          200: '#CBD5E0',   // Borders
          100: '#E2E8F0',   // Dividers
          50:  '#F1F5F9',   // Subtle bg
        },
        // Surface whites — depth through layering
        surface: {
          white:  '#FFFFFF',
          soft:   '#FAFBFC',
          warm:   '#F8F9FB',
          pale:   '#F3F5F8',
          muted:  '#EDF0F4',
          subtle: '#E4E8EE',
        },
        // Teal tints for accent areas
        teal: {
          tint:   'rgba(0,200,168,0.06)',
          light:  'rgba(0,200,168,0.10)',
          medium: 'rgba(0,200,168,0.18)',
          border: 'rgba(0,200,168,0.20)',
          glow:   'rgba(0,200,168,0.12)',
        },
      },

      fontFamily: {
        sora:  ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },

      fontSize: {
        // Display scale — hero headlines
        'd1': ['clamp(3rem,7vw,5.5rem)',  { lineHeight:'1.05', letterSpacing:'-0.03em', fontWeight:'700' }],
        'd2': ['clamp(2.5rem,5vw,4rem)',  { lineHeight:'1.08', letterSpacing:'-0.025em', fontWeight:'700' }],
        'd3': ['clamp(2rem,4vw,3rem)',    { lineHeight:'1.1',  letterSpacing:'-0.02em',  fontWeight:'700' }],
        // Section headings
        'h1': ['clamp(1.75rem,3.5vw,2.5rem)', { lineHeight:'1.2', letterSpacing:'-0.018em' }],
        'h2': ['clamp(1.375rem,2.5vw,1.875rem)',{ lineHeight:'1.25',letterSpacing:'-0.012em' }],
        'h3': ['1.25rem',  { lineHeight:'1.35', letterSpacing:'-0.008em' }],
        'h4': ['1.0625rem',{ lineHeight:'1.4',  letterSpacing:'-0.004em' }],
        // Body
        'lg': ['1.125rem', { lineHeight:'1.75' }],
        'md': ['1rem',     { lineHeight:'1.7'  }],
        'sm': ['0.9375rem',{ lineHeight:'1.65' }],
        'xs': ['0.875rem', { lineHeight:'1.6'  }],
        'xxs':['0.8125rem',{ lineHeight:'1.55' }],
        // UI
        'label': ['0.75rem', { lineHeight:'1.4', letterSpacing:'0.08em' }],
        'cap':   ['0.6875rem',{ lineHeight:'1.4', letterSpacing:'0.06em' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      boxShadow: {
        // Premium layered shadows — the key to expensive feel
        'xs':    '0 1px 3px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.03)',
        'sm':    '0 2px 8px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)',
        'md':    '0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.05)',
        'lg':    '0 8px 32px rgba(15,23,42,0.10), 0 3px 10px rgba(15,23,42,0.06)',
        'xl':    '0 16px 48px rgba(15,23,42,0.12), 0 6px 16px rgba(15,23,42,0.07)',
        '2xl':   '0 24px 64px rgba(15,23,42,0.14), 0 8px 24px rgba(15,23,42,0.08)',
        // Brand teal glow — for CTAs and highlights
        'brand':    '0 0 0 3px rgba(0,200,168,0.15), 0 4px 16px rgba(0,200,168,0.12)',
        'brand-sm': '0 2px 12px rgba(0,200,168,0.15)',
        'brand-lg': '0 8px 32px rgba(0,200,168,0.20)',
        // Card hover
        'card':     '0 2px 8px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)',
        'card-hover':'0 12px 40px rgba(15,23,42,0.12), 0 4px 12px rgba(15,23,42,0.07)',
        // Inner shadow for inputs
        'inner-sm': 'inset 0 1px 3px rgba(15,23,42,0.06)',
        // White card pop
        'white':    '0 0 0 1px rgba(15,23,42,0.06), 0 8px 32px rgba(15,23,42,0.09)',
        'white-hover':'0 0 0 1px rgba(0,200,168,0.15), 0 16px 48px rgba(15,23,42,0.12)',
      },

      backgroundImage: {
        // Premium hero — very subtle warm white
        'hero-light': 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFB 50%, #F3F7F5 100%)',
        // Section alternates
        'section-warm': 'linear-gradient(180deg, #FAFBFC 0%, #F6F8FA 100%)',
        'section-teal': 'linear-gradient(135deg, rgba(0,200,168,0.04) 0%, rgba(0,200,168,0.02) 100%)',
        // CTA section
        'cta-premium': 'linear-gradient(135deg, #0A0C0E 0%, #111820 50%, #0A0F0D 100%)',
        // Brand gradient text
        'brand-grad': 'linear-gradient(135deg, #009E85 0%, #00C8A8 50%, #2dd4bf 100%)',
        // Subtle grid pattern
        'grid-light': 'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
        // Noise overlay for depth
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      },

      backgroundSize: {
        'grid': '48px 48px',
      },

      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-teal': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,200,168,0.3)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(0,200,168,0)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'draw': {
          '0%':   { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },

      animation: {
        'fade-up':       'fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':       'fade-in 0.45s ease both',
        'marquee':       'marquee 28s linear infinite',
        'marquee-slow':  'marquee 40s linear infinite',
        'pulse-teal':    'pulse-teal 2.5s ease-in-out infinite',
        'float-gentle':  'float-gentle 5s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
