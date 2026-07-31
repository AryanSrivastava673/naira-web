'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CreditCard, Train, KeyRound, Bluetooth } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const examples = [
  {
    icon: CreditCard,
    title: 'Tap to pay at cafes',
    desc: 'Google Pay, Apple Pay, contactless cards. All NFC.',
  },
  {
    icon: Train,
    title: 'Metro and transit',
    desc: 'Delhi, Mumbai, Bengaluru gates all open with a tap.',
  },
  {
    icon: KeyRound,
    title: 'Hotel key cards',
    desc: 'Tap the door, it opens. Same technology.',
  },
  {
    icon: Bluetooth,
    title: 'Device pairing',
    desc: 'Earbuds, smart tags, contact sharing. One tap.',
  },
]

export default function NfcEveryday() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6" style={{ background: '#0c0c0c' }}>
      <div ref={ref} className="max-w-[1200px] mx-auto">

        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-3" style={{ color: PINK }}>
            Sounds techy? It isn&apos;t.
          </p>
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}
          >
            Your guests already tap{' '}
            <span style={{ color: PINK }}>every single day</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            NFC has been in their pocket for a decade. Tapping a Naira coaster is muscle memory, not a new trick.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {examples.map((ex, i) => (
            <motion.div
              key={ex.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `rgba(${PINK_RGB},0.10)` }}
              >
                <ex.icon size={18} style={{ color: PINK }} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5">{ex.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{ex.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-white/40 text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          The gesture is already familiar.{' '}
          <span className="text-white/65">Your menu just borrows it.</span>
        </motion.p>
      </div>
    </section>
  )
}
