'use client'

import { motion } from 'framer-motion'

export default function TapHero() {
  return (
    <section
      id="hero"
      className="relative px-6 py-24 pb-4 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Ambient pink glow — same treatment as the billing hero */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,43,163,0.10) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,43,163,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col relative z-10">

        {/* Copy — fills the first viewport so only the heading shows; card sits below */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          {/* Eyebrow pill — mobile only */}
          <span
            className="md:hidden inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] font-medium tracking-[0.12em] uppercase mb-5"
            style={{
              background: 'rgba(255,43,163,0.12)',
              color: '#ff80c8',
              border: '1px solid rgba(255,43,163,0.25)',
            }}
          >
            Naira Tap
          </span>

          <h1
            className="font-sans mb-8"
            style={{ fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', marginTop: '-2px' }}
          >
            <span
              className="block"
              style={{ color: '#ff2ba3', fontSize: 'clamp(4.5rem, 11.5vw, 9.5rem)' }}
            >
              Naira
            </span>
            <span
              className="block"
              style={{ color: '#ffffff', fontSize: 'clamp(4.5rem, 11.5vw, 9.5rem)' }}
            >
              Tap<span style={{ color: '#ff2ba3' }}>.</span>
            </span>
          </h1>

          <p
            className="font-sans mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginTop: '1.25rem',
              lineHeight: 1.2,
            }}
          >
            Earn More From <span style={{ color: '#ff2ba3' }}>Your Menus.</span>
          </p>

          <p className="text-naira-text-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Smart pairings, auto-combos, and bestseller nudges — right when your
            guest is deciding. The only contactless dining solution that turns
            every table into a silent upsell machine.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#features"
              className="relative overflow-hidden flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold group"
              style={{
                background:
                  'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 60%, var(--accent-light) 100%)',
                color: 'var(--text)',
                boxShadow:
                  '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.25)',
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                }}
              />
              <span className="relative">See how it works</span>
              <svg className="relative w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="#features"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-naira-text transition-all duration-200 hover:text-naira-gold"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Scroll to explore
            </a>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
