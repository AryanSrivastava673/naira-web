'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_HOVER = '#e6258f'
const PINK_RGB = '255,43,163'

export default function BillingFinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }} ref={ref}>
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.15) 0%, transparent 70%)` }}
      />

      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${PINK}, transparent)`,
        }}
      />

      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="constellation-cta" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.3" fill={`rgba(${PINK_RGB},0.14)`} />
            <circle cx="100" cy="80" r="1" fill={`rgba(${PINK_RGB},0.10)`} />
            <circle cx="60" cy="110" r="1.5" fill={`rgba(${PINK_RGB},0.12)`} />
            <line x1="30" y1="30" x2="100" y2="80" stroke={`rgba(${PINK_RGB},0.05)`} strokeWidth="0.5" />
            <line x1="100" y1="80" x2="60" y2="110" stroke={`rgba(${PINK_RGB},0.05)`} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#constellation-cta)" />
      </svg>

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="font-mono inline-block px-3 py-1 text-[12px] font-medium tracking-[0.12em] uppercase mb-8"
            style={{ background: `rgba(${PINK_RGB},0.12)`, color: PINK, borderRadius: 8 }}
          >
            Get Started
          </span>

          <h2 className="font-sans text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-5 text-white">
            Free setup.{' '}
            <span style={{ color: PINK }}>Zero risk.</span>
          </h2>

          <p className="font-display italic text-xl md:text-2xl font-medium mb-6 text-white/80">
            Stop guessing. Start growing.
          </p>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The best point of sale system for bar, restaurant, cafe, and cafeteria — set up free. We configure your dashboard, train your staff, and deliver your first restaurant analytics report in 30 days. No contracts, no lock-in.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 text-sm font-semibold transition-all"
              style={{
                background: PINK,
                color: '#ffffff',
                borderRadius: 12,
                boxShadow: `0 0 40px rgba(${PINK_RGB},0.25)`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = PINK_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.background = PINK)}
            >
              Book a free demo
            </a>
            <a
              href="#features"
              className="px-8 py-4 text-sm font-semibold text-white/80 hover:text-white transition-colors"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
              }}
            >
              Explore features
            </a>
          </div>

          <p className="font-mono text-white/55 text-[12px] tracking-[0.06em] mt-8">
            No payment details needed. Cancel anytime. Built in Pune, live across India.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
