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
        // ── Dark base (Navy-black — richer than pure black, has a warm blue depth)
        'naira-black':   '#0C1118',  // primary page background
        'naira-surface': '#121B28',  // alternate section / sidebar bg
        'naira-card':    '#172035',  // card backgrounds

        // ── Primary accent — Palette 2 steel blue #6D94C5
        'naira-gold':       '#6D94C5',  // kept the semantic name; now steel blue
        'naira-gold-light': '#CBDCEB',  // powder blue (palette 2 lightest)
        'naira-gold-dark':  '#4A78B5',  // deeper blue for hover states

        // ── Warm palette tones — appear on paper / highlight elements
        'naira-warm':   '#F5EFE6',  // warm beige (palette 2 lightest)
        'naira-warm-2': '#E8DFCA',  // warm sand (palette 2 second)

        // ── Text — warm cream instead of clinical white
        'naira-text':       '#F0E9DE',  // primary text (warm cream, palette-derived)
        'naira-text-muted': '#A8BECC',  // secondary text (powder-blue-gray)

        // ── Supporting
        'naira-border': '#1E2E44',   // dark navy border
        'naira-muted':  '#5A7090',   // tertiary / placeholder text
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(109,148,197,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(109,148,197,0.6)' },
        },
      },

      backgroundImage: {
        // Steel-blue radial glow behind the hero headline
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(109,148,197,0.13) 0%, transparent 68%)',
        // Display-text gradient: warm cream → powder blue → steel blue
        'gold-gradient': 'linear-gradient(135deg, #F0E9DE 0%, #CBDCEB 55%, #6D94C5 100%)',
        // Card hover tint
        'card-gradient': 'linear-gradient(135deg, rgba(109,148,197,0.08) 0%, transparent 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0C1118 0%, #111111 100%)',
      },
    },
  },
  plugins: [],
}
export default config
