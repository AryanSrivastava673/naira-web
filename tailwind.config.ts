import type { Config } from 'tailwindcss'

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
        'naira-black':   '#0C1118',  // primary page background
        'naira-surface': '#151018',  // alternate section / sidebar bg
        'naira-card':    '#1E1520',  // card backgrounds

        // ── Primary accent — Brand magenta #C13584
        'naira-gold':       '#C13584',  // primary accent (brand magenta)
        'naira-gold-light': '#E8A0C9',  // light pink
        'naira-gold-dark':  '#9B2A6A',  // deeper magenta for hover states

        // ── Warm palette tones — appear on paper / highlight elements
        'naira-warm':   '#F5EFE6',  // warm beige
        'naira-warm-2': '#E8DFCA',  // warm sand

        // ── Text — warm cream instead of clinical white
        'naira-text':       '#F0E9DE',  // primary text (warm cream)
        'naira-text-muted': '#C4A0B5',  // secondary text (muted pink-gray)

        // ── Supporting
        'naira-border': '#2E1E2A',   // dark magenta border
        'naira-muted':  '#7A5068',   // tertiary / placeholder text
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(193,53,132,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(193,53,132,0.6)' },
        },
      },

      backgroundImage: {
        // Magenta radial glow behind the hero headline
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(193,53,132,0.13) 0%, transparent 68%)',
        // Display-text gradient: warm cream → light pink → magenta
        'gold-gradient': 'linear-gradient(135deg, #F0E9DE 0%, #E8A0C9 55%, #C13584 100%)',
        // Card hover tint
        'card-gradient': 'linear-gradient(135deg, rgba(193,53,132,0.08) 0%, transparent 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0C1118 0%, #111111 100%)',
      },
    },
  },
  plugins: [],
}
export default config
