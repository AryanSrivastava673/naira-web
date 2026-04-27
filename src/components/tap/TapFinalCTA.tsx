'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TapFinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 px-6 bg-naira-black relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      {/* Top border line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-light), var(--accent), transparent)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-8">
            Get Started
          </span>

          <h2
            className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your guests deserve{' '}
            <span className="text-gold-gradient">better than a sticker</span>
          </h2>

          <p className="text-naira-text-muted text-xl leading-relaxed mb-10">
            Join restaurants across India making the switch. We&apos;ll send you a
            free sample coaster to try on your own table — no commitment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-10 py-4 rounded-full text-sm font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%)',
                color: '#F0E9DE',
                boxShadow: '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 6px 32px rgba(var(--accent-rgb),0.3)',
              }}
            >
              Claim my free sample
            </a>
            <a
              href="#contact"
              className="px-10 py-4 rounded-full border border-naira-border text-sm font-semibold text-naira-text-muted hover:text-naira-text hover:border-naira-gold/40 transition-colors"
            >
              Book a demo call
            </a>
          </div>

          <p className="text-naira-muted text-xs mt-8">
            Built in Pune. Live across India. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
