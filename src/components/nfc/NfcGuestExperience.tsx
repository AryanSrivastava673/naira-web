'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const steps = [
  {
    n: '01',
    title: 'Guest taps the coaster',
    desc: 'Phone comes close to the coaster on the table. The same motion as paying at any counter.',
  },
  {
    n: '02',
    title: 'Menu opens instantly',
    desc: 'The link appears and the live menu opens in their browser. No app store, no download, no signup.',
  },
  {
    n: '03',
    title: 'They browse and order',
    desc: 'Photos, prices and specials — always current, straight from your Naira dashboard.',
  },
]

export default function NfcGuestExperience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
      <div ref={ref} className="max-w-[1200px] mx-auto">

        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-3" style={{ color: PINK }}>
            The guest experience
          </p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-0.02em' }}
          >
            Three seconds,{' '}
            <span style={{ color: PINK }}>start to finish</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative p-7 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="font-mono font-black mb-5"
                style={{ fontSize: '3.5rem', color: `rgba(${PINK_RGB},0.15)`, lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                {s.n}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 leading-snug">{s.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>

              {/* Connector line (not on last) */}
              {i < 2 && (
                <div
                  className="hidden md:block absolute top-12 -right-3 w-6 h-px"
                  style={{ background: `rgba(${PINK_RGB},0.25)` }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
