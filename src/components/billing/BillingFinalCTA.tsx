'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const B = '#10B981'
const B_LIGHT = '#34D399'
const B_DARK = '#059669'
const B_RGB = '16,185,129'

export default function BillingFinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 px-6 bg-naira-black relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B} 0%, transparent 70%)` }}
      />

      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${B}, ${B_LIGHT}, ${B}, transparent)`,
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full border text-xs font-medium tracking-widest uppercase mb-8"
            style={{ borderColor: `rgba(${B_RGB},0.3)`, color: B_LIGHT }}
          >
            Get Started
          </span>

          <h2
            className="font-display text-5xl md:text-6xl font-medium tracking-tighter leading-tight mb-4 text-naira-text"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Free setup.{' '}
            <span style={{ color: B_LIGHT }}>Zero risk.</span>
          </h2>

          <p
            className="text-xl font-medium mb-6"
            style={{ color: B_LIGHT }}
          >
            Stop guessing. Start growing.
          </p>

          <p className="text-naira-text-muted text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The best POS for your restaurant — set up free. We configure your dashboard, train your staff,
            and deliver your first analytics report in 30 days. No contracts, no lock-in.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-10 py-4 rounded-full text-sm font-semibold transition-all"
              style={{
                background: `linear-gradient(135deg, ${B_DARK} 0%, ${B} 100%)`,
                color: '#F0E9DE',
                boxShadow: `0 0 0 1px rgba(${B_RGB},0.35), 0 6px 32px rgba(${B_RGB},0.3)`,
              }}
            >
              Book a free demo
            </a>
            <a
              href="#features"
              className="px-10 py-4 rounded-full border border-naira-border text-sm font-semibold text-naira-text-muted hover:text-naira-text transition-colors"
            >
              Explore features
            </a>
          </div>

          <p className="text-naira-muted text-xs mt-8">
            No payment details needed. Cancel anytime. Built in Pune, live across India.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
