'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  { n: '01', label: 'Guest brings phone close' },
  { n: '02', label: 'NFC activates instantly' },
  { n: '03', label: 'Full menu, ~1 second' },
]

export default function TapMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="px-6 relative overflow-hidden"
      style={{
        paddingTop: 96,
        paddingBottom: 96,
        background: '#ffffff',
      }}
    >
      {/* Subtle pink glow — matches the billing white sections */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: '#ff2ba3' }}>
          The Moment
        </p>

        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6" style={{ color: '#1a1a1a' }}>
          Guest taps. Menu appears.{' '}
          <em
            className="not-italic"
            style={{
              background: 'linear-gradient(135deg, #ff80c8 0%, #ff2ba3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              borderBottom: '2px solid rgba(255,43,163,0.4)',
            }}
          >
            Jaws drop.
          </em>
        </h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex-1 text-center"
              style={{
                padding: '20px 24px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 16,
              }}
            >
              <div
                className="font-mono text-2xl font-medium mb-2"
                style={{ color: 'rgba(255,43,163,0.45)', fontVariantNumeric: 'tabular-nums' }}
              >
                {s.n}
              </div>
              <p className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-sm leading-relaxed mb-6 max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
          A beautiful coaster on the table. Your logo, your finish. They bring their
          phone close — tap — and the full menu blooms open in under a second.{' '}
          <strong style={{ color: '#1a1a1a' }}>No app. No scanning. No QR codes.</strong>
        </p>

        <blockquote
          className="px-6 py-5 text-left max-w-lg mx-auto"
          style={{
            background: 'rgba(255,43,163,0.04)',
            border: '1px solid rgba(255,43,163,0.12)',
            borderLeft: '3px solid rgba(255,43,163,0.55)',
            borderRadius: 16,
          }}
        >
          <p className="font-display italic text-base leading-relaxed" style={{ color: '#1a1a1a' }}>
            &ldquo;Bro, did you see that?&rdquo;
          </p>
          <p className="text-xs mt-1.5" style={{ color: '#6b7280' }}>
            — that&apos;s the word of mouth you cannot buy.
          </p>
        </blockquote>

      </div>
    </section>
  )
}
