import type { Config } from 'tailwindcss'

// ── Brand — Naira design system (#ff2ba3) ──────────────────────────
const BRAND = {
  accent:      '#ff2ba3',
  accentLight: '#ff80c8',
  accentDark:  '#e6258f',
}

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}
const accentRgb = rgb(BRAND.accent)

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Dark world ──
        'naira-black':    '#0a0a0a',
        'naira-raised':   '#141414',
        'naira-elevated': '#1a1a1a',
        'naira-surface':  '#141414',
        'naira-card':     '#1a1a1a',

        // ── Primary accent ──
        'naira-gold':       BRAND.accent,
        'naira-gold-light': BRAND.accentLight,
        'naira-gold-dark':  BRAND.accentDark,
        'naira-pink':       BRAND.accent,

        // ── Light world ──
        'naira-warm':   '#ffffff',
        'naira-warm-2': '#f5f5f5',

        // ── Text ──
        'naira-text':       '#ffffff',
        'naira-text-muted': 'rgba(255,255,255,0.7)',
        'naira-ink':        '#1a1a1a',

        // ── Supporting ──
        'naira-border': 'rgba(255,255,255,0.08)',
        'naira-muted':  '#9ca3af',
      },

      fontFamily: {
        display: ['var(--font-inter)',     'system-ui', 'sans-serif'],
        sans:    ['var(--font-inter)',     'system-ui', 'sans-serif'],
        serif:   ['var(--font-playfair)',  'Georgia', 'serif'],
        mono:    ['var(--font-mono)',      'ui-monospace', 'monospace'],
      },

      borderRadius: {
        panel:   '20px',
        card:    '16px',
        control: '12px',
        chip:    '8px',
      },

      boxShadow: {
        e1:    `0 2px 8px rgba(${accentRgb},0.06), 0 4px 16px rgba(${accentRgb},0.04)`,
        e2:    `0 8px 24px rgba(${accentRgb},0.10), 0 16px 48px rgba(${accentRgb},0.06)`,
        glow:  `0 0 40px rgba(${accentRgb},0.15)`,
        focus: `0 0 0 3px rgba(${accentRgb},0.30)`,
      },

      animation: {
        'nfc-ring':   'nfcRing 2s ease-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },

      keyframes: {
        nfcRing: {
          '0%':   { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: `0 0 20px rgba(${accentRgb},0.3)` },
          '50%':      { boxShadow: `0 0 40px rgba(${accentRgb},0.6)` },
        },
      },

      backgroundImage: {
        'hero-gradient': `radial-gradient(ellipse 55% 35% at 50% -5%, rgba(${accentRgb},0.05) 0%, transparent 60%)`,
        'gold-gradient': `linear-gradient(135deg, #ffffff 0%, ${BRAND.accentLight} 55%, ${BRAND.accent} 100%)`,
        'card-gradient': `linear-gradient(135deg, rgba(${accentRgb},0.08) 0%, transparent 100%)`,
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)',
      },
    },
  },
  plugins: [],
}
export default config
