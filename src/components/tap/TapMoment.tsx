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
        paddingTop: 56,
        paddingBottom: 56,
        background:
          'radial-gradient(ellipse 70% 60% at 15% 40%, rgba(255,43,163,0.07) 0%, transparent 65%), #0C1118',
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10 text-center">

        <p className="text-[10px] font-medium tracking-widest uppercase mb-3" style={{ color: '#ff2ba3' }}>
          The Moment
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-naira-text mb-6">
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
              className="flex-1 rounded-xl text-center"
              style={{
                padding: '20px 24px',
                background: 'rgba(30,21,32,0.55)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="text-2xl font-medium font-display mb-2"
                style={{ color: 'rgba(255,43,163,0.35)' }}
              >
                {s.n}
              </div>
              <p className="text-naira-text font-semibold text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-naira-text-muted text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
          A beautiful coaster on the table. Your logo, your finish. They bring their
          phone close — tap — and the full menu blooms open in under a second.{' '}
          <strong className="text-naira-text">No app. No scanning. No QR codes.</strong>
        </p>

        <blockquote
          className="rounded-xl px-6 py-5 text-left max-w-lg mx-auto"
          style={{
            background: 'rgba(255,43,163,0.05)',
            border: '1px solid rgba(255,43,163,0.12)',
            borderLeft: '3px solid rgba(255,43,163,0.55)',
          }}
        >
          <p className="text-naira-text font-display italic text-base leading-relaxed">
            &ldquo;Bro, did you see that?&rdquo;
          </p>
          <p className="text-naira-muted text-xs mt-1.5">
            — that&apos;s the word of mouth you cannot buy.
          </p>
        </blockquote>

      </div>
    </section>
  )
}
