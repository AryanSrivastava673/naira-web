'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

export default function NfcCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ background: '#0c0c0c' }}>
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.10) 0%, transparent 70%)` }}
      />

      <div ref={ref} className="max-w-[760px] mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-4" style={{ color: PINK }}>
            Ready when you are
          </p>
          <h2
            className="text-white font-black mb-5"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Every phone in your dining room is{' '}
            <span style={{ color: PINK }}>already ready</span>
          </h2>
          <p className="text-white/55 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            The hardware has been in your guests&apos; pockets for years. All that&apos;s missing is the coaster on the table.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all"
              style={{ background: PINK, color: '#fff', boxShadow: `0 0 28px rgba(${PINK_RGB},0.30)` }}
            >
              Let&apos;s Talk
            </Link>
            <Link
              href="/tap"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              See Naira Tap
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
