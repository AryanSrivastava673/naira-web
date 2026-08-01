'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Send us your menu',
    body: 'WhatsApp, email, PDF, photo of a napkin. Any format works.',
  },
  {
    n: '02',
    title: 'We design, brand & configure',
    body: 'Digital menu with branding, photos, translations, smart upsell pairings. You approve before it goes live.',
  },
  {
    n: '03',
    title: 'Coasters arrive. Guests tap.',
    body: 'Place a coaster on each table. Old QR codes go in the bin.',
  },
]

export default function TapSteps() {
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
      <div className="max-w-5xl mx-auto relative z-10">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3 text-center">
          How it works
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text text-center mb-12">
          Your upgrade happens in a week.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(30,21,32,0.55)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="text-4xl font-bold font-sans tracking-[-0.02em] mb-4"
                style={{ color: 'rgba(255,43,163,0.3)' }}
              >
                {s.n}
              </div>
              <p className="font-semibold text-naira-text mb-2">{s.title}</p>
              <p className="text-sm text-naira-muted leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-center text-naira-text-muted text-sm"
        >
          Live in under 48 hours from your first message
        </motion.p>

      </div>
    </section>
  )
}
