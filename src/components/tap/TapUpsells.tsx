'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const BULLETS = [
  '"Goes great with" pairings — curated add-ons that feel natural, not pushy.',
  'Bestseller + Popular tags — social proof at the dish level.',
  'Combo suggestions — pre-built deals that lift order value automatically.',
]

export default function TapUpsells() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          '#0a0a0a',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="order-2 lg:order-1 relative"
        >
          {/* Pink ambient glow behind */}
          <div
            aria-hidden
            className="absolute -inset-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,43,163,0.18) 0%, transparent 65%)',
              filter: 'blur(20px)',
              zIndex: 0,
            }}
          />

          {/* Offset accent panel — gives the image something to sit on, not float against the surface */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: 'translate(14px, 16px) rotate(-1.4deg)',
              background:
                'linear-gradient(135deg, rgba(255,43,163,0.10) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,43,163,0.18)',
              borderRadius: 20,
              zIndex: 1,
            }}
          />

          {/* Image frame — inset highlight + pink-tinted elevation */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative overflow-hidden"
            style={{
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 0 0 1px rgba(255,43,163,0.10), 0 8px 24px rgba(255,43,163,0.18), 0 24px 64px rgba(255,43,163,0.10), 0 40px 80px rgba(0,0,0,0.5)',
              zIndex: 2,
            }}
          >
            <Image
              src="/tap/pairing-upsell.jpg"
              alt="Butter Chicken item detail with Goes great with panel and Revenue Impact card"
              width={640}
              height={480}
              className="w-full block object-cover"
            />
            {/* Inset top highlight (iOS 26 glass feel) */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
                borderRadius: 20,
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3">
            Deep dive 01 · Revenue at the moment of decision
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text mb-4 leading-tight">
            Every dish card is a silent salesperson.
          </h2>

          <p className="text-naira-text-muted text-sm leading-relaxed mb-5">
            When a guest opens the menu, they see photos, pairings, and combo nudges at
            the exact moment they&apos;re deciding. A paper menu or a static QR PDF can&apos;t do this.
          </p>

          <ul className="space-y-4">
            {BULLETS.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 text-sm text-naira-text-muted leading-relaxed"
              >
                <span
                  className="mt-1.5 w-5 h-5 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(255,43,163,0.12)', border: '1px solid rgba(255,43,163,0.25)' }}
                >
                  <span style={{ color: '#ff2ba3', fontSize: '8px' }}>✓</span>
                </span>
                {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  )
}
