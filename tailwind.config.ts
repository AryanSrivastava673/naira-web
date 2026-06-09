import type { Config } from 'tailwindcss'

// ── Brand accent (single source of truth) ──────────────────────────
const BRAND = {
  accent:      '#ff1fa0',  // primary magenta
  accentLight: '#ff8fd3',  // light pink
  accentDark:  '#d42890',  // deeper magenta for hover states
  text:        '#FAF6F0',  // warm cream (primary text)
}

// helper: hex → r,g,b string for use in rgba()
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
        // ── Dark base (deep warm black with magenta undertone)
        'naira-black':   '#100D1C',
        'naira-surface': '#1B1528',
        'naira-card':    '#241C34',

        // ── Primary accent
        'naira-gold':       BRAND.accent,
        'naira-gold-light': BRAND.accentLight,
        'naira-gold-dark':  BRAND.accentDark,

        // ── Warm palette tones
        'naira-warm':   '#F5EFE6',
        'naira-warm-2': '#E8DFCA',

        // ── Text
        'naira-text':       BRAND.text,
        'naira-text-muted': '#D4AECA',

        // ── Supporting
        'naira-border': '#3D2845',
        'naira-muted':  '#B890A8',
      },

      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)',     'system-ui', 'sans-serif'],
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
        'hero-gradient': `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.13) 0%, transparent 68%)`,
        'gold-gradient': `linear-gradient(135deg, ${BRAND.text} 0%, ${BRAND.accentLight} 55%, ${BRAND.accent} 100%)`,
        'card-gradient': `linear-gradient(135deg, rgba(${accentRgb},0.08) 0%, transparent 100%)`,
        'dark-gradient': 'linear-gradient(180deg, #0C1118 0%, #111111 100%)',
      },
    },
  },
  plugins: [],
}
export default config
